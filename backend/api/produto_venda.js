module.exports=app=>{
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res)=>{
        const produtoVendaBody = { ...req.body }
       //TIRAR TAMANHO MIGRATION
        const produtoVenda = {
            id: produtoVendaBody.id,
            quantidade: produtoVendaBody.quantidade,
            produtoId: produtoVendaBody.produtoId,
            tamanhoId: produtoVendaBody.tamanhoId,
            vendaId: produtoVendaBody.vendaId
        }

        if(req.params.id) produtoVenda.id = req.params.id

        try {
            existsOrError(produtoVenda.quantidade, 'Quantidade não informada!')
            existsOrError(produtoVenda.produtoId, 'Produto não informado!')
            existsOrError(produtoVenda.tamanhoId, 'Tamanho não informado!')
            existsOrError(produtoVenda.vendaId, 'Venda não informada!')

        } catch (msg) {
            return res.status(400).send(msg)
        }

        if(produtoVenda.id){
            app.db('produto_venda')
                .update(produtoVenda)
                .where({ id: produtoVenda.id })
                .then(_ => res.status(200).json(produtoVenda))
                .catch(err=>res.status(500).send(err))
        }else{
            app.db('produto_venda')
                .insert(produtoVenda)
                .then(_ => res.status(201).json(produtoVenda))
                .catch(err=>res.status(500).send(err))
        }
    }

    const limit = 10

    const get = async (req, res)=>{
        const page = req.query.page || 1

        const result = await app.db('produto_venda').count('id').first()
        const count = parseInt(result.count)

        app.db('produto_venda')
            .select('id', 'quantidade', 'produtoId', 'tamanhoId', 'vendaId')
            .limit(limit).offset(page * limit - limit)
            .orderBy('id')
            .then(produtoVenda=>res.json({ data: produtoVenda, count, limit }))
            .catch(err=>res.status(500).send(err))
    }

    const remove = async (req, res)=>{
        try{
            // const compraProdutoVenda = await app.db('produto_compra')
            //     .where({ compraId: req.params.id })
            // notExistsOrError(compraProdutoVenda, 'Compra ja foi cadastrada com esse Cliente.')

            const rowsDeleted = await app.db('produto_venda')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Venda do produto não foi encontrada.')
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch(msg){
            res.status(500).send(msg)
        }
    }

    return{ save, get, remove }
}