module.exports=app=>{
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res)=>{
        const produtoCompraBody = { ...req.body }
       //TIRAR TAMANHO MIGRATION
        const produtoCompra = {
            id: produtoCompraBody.id,
            quantidade: produtoCompraBody.quantidade,
            produtoId: produtoCompraBody.produtoId,
            tamanhoId: produtoCompraBody.tamanhoId,
            compraId: produtoCompraBody.compraId
        }

        if(req.params.id) produtoCompra.id = req.params.id

        try {
            existsOrError(produtoCompra.quantidade, 'Quantidade não informada!')
            existsOrError(produtoCompra.produtoId, 'Produto não informado!')
            existsOrError(produtoCompra.tamanhoId, 'Tamanho não informado!')
            existsOrError(produtoCompra.compraId, 'Venda não informada!')

        } catch (msg) {
            return res.status(400).send(msg)
        }

        if(produtoCompra.id){
            app.db('produto_compra')
                .update(produtoCompra)
                .where({ id: produtoCompra.id })
                .then(_ => res.status(200).json(produtoCompra))
                .catch(err=>res.status(500).send(err))
        }else{
            app.db('produto_compra')
                .insert(produtoCompra)
                .then(_ => res.status(201).json(produtoCompra))
                .catch(err=>res.status(500).send(err))
        }
    }

    const limit = 10

    const get = async (req, res)=>{
        const page = req.query.page || 1

        const result = await app.db('produto_compra').count('id').first()
        const count = parseInt(result.count)

        app.db('produto_compra')
            .select('id', 'quantidade', 'produtoId', 'tamanhoId', 'compraId')
            .limit(limit).offset(page * limit - limit)
            .orderBy('id')
            .then(produtoCompra=>res.json({ data: produtoCompra, count, limit }))
            .catch(err=>res.status(500).send(err))
    }

    const remove = async (req, res)=>{
        try{
            // const compraProdutoVenda = await app.db('produto_compra')
            //     .where({ compraId: req.params.id })
            // notExistsOrError(compraProdutoVenda, 'Compra ja foi cadastrada com esse Cliente.')

            const rowsDeleted = await app.db('produto_compra')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Compra do produto não foi encontrada.')
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