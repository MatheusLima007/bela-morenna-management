module.exports=app=>{
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res)=>{
        const vendaBody = { ...req.body }
       
        const venda = {
            id: vendaBody.id,
            data: vendaBody.data,
            clienteId: vendaBody.clienteId,
            usuarioId: vendaBody.usuarioId,
            pagamentoId: vendaBody.pagamentoId
        }

        if(req.params.id) venda.id = req.params.id

        try {
            existsOrError(venda.clienteId, 'Cliente não informado!')
            existsOrError(venda.usuarioId, 'Usuario não informado!')
            existsOrError(venda.pagamentoId, 'Pagamento não informado!')

        } catch (msg) {
            return res.status(400).send(msg)
        }

        if(venda.id){
            app.db('venda')
                .update(venda)
                .where({ id: venda.id })
                .then(_ => res.status(200).json(venda))
                .catch(err=>res.status(500).send(err))
        }else{
            app.db('venda')
                .insert(venda)
                .then(_ => res.status(201).json(venda))
                .catch(err=>res.status(500).send(err))
        }
    }

    const limit = 10

    const get = async (req, res)=>{
        const page = req.query.page || 1

        const result = await app.db('venda').count('id').first()
        const count = parseInt(result.count)

        app.db('venda')
            .select('id', 'data', 'clienteId', 'usuarioId', 'pagamentoId')
            .limit(limit).offset(page * limit - limit)
            .orderBy('id')
            .then(venda=>res.json({ data: venda, count, limit }))
            .catch(err=>res.status(500).send(err))
    }

    const remove = async (req, res)=>{
        try{
            const vendaProdutoVenda = await app.db('produto_venda')
                .where({ vendaId: req.params.id })
            notExistsOrError(vendaProdutoVenda, 'Venda ja foi cadastrada com esse Cliente.')

            const rowsDeleted = await app.db('venda')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Venda não foi encontrada.')
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