module.exports=app=>{
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res)=>{
        const compraBody = { ...req.body }
       
        const compra = {
            id: compraBody.id,
            data: compraBody.data,
            fornecedorId: compraBody.fornecedorId,
            usuarioId: compraBody.usuarioId,
            pagamentoId: compraBody.pagamentoId
        }

        if(req.params.id) compra.id = req.params.id

        try {
            existsOrError(compra.fornecedorId, 'Fornecedor não informado!')
            existsOrError(compra.usuarioId, 'Usuario não informado!')
            existsOrError(compra.pagamentoId, 'Pagamento não informado!')

        } catch (msg) {
            return res.status(400).send(msg)
        }

        if(compra.id){
            app.db('compra')
                .update(compra)
                .where({ id: compra.id })
                .then(_ => res.status(200).json(compra))
                .catch(err=>res.status(500).send(err))
        }else{
            app.db('compra')
                .insert(compra)
                .then(_ => res.status(201).json(compra))
                .catch(err=>res.status(500).send(err))
        }
    }

    const limit = 10

    const get = async (req, res)=>{
        const page = req.query.page || 1

        const result = await app.db('compra').count('id').first()
        const count = parseInt(result.count)

        app.db({c: 'compra', f: 'fornecedor', u: 'usuario', p: 'pagamento', t: 'tipo_pagamento'})
            .select('c.id', 'c.data', 'f.nome as fornecedorNome', 'u.nome as usuarioNome', 'p.precoTotal', 't.descricao')
            .whereRaw('?? = ??', ['c.fornecedorId', 'f.id'])
            .whereRaw('?? = ??', ['c.usuarioId', 'u.id'])
            .whereRaw('?? = ??', ['c.pagamentoId', 'p.id'])
            .whereRaw('?? = ??', ['p.tipoPagamentoId', 't.id'])
            .limit(limit).offset(page * limit - limit)
            .orderBy('id')
            .then(compra=>res.json({ data: compra, count, limit }))
            .catch(err=>res.status(500).send(err))
    }

    const getById = async (req, res)=>{
        const { id } = req.params
        app.db('compra AS c')
            .first() 
            .where('c.id', id)
            .join('fornecedor AS f', 'f.id', '=', 'c.fornecedorId')
            .join('usuario AS u', 'u.id', '=', 'c.usuarioId')
            .join('pagamento AS p', 'p.id', '=', 'c.pagamentoId')
            .join('tipo_pagamento AS t', 't.id', '=', 'p.tipoPagamentoId')
            .select('c.id', 'c.data', 'f.nome as fornecedorNome', 'u.nome as usuarioNome', 'p.precoTotal', 't.descricao')
            .then(compra => {
                try {
                    existsOrError(compra, 'Nenhum compra encontrado!')
                    res.status(200).json(compra)
                } catch (msg) {
                    return res.status(400).send(msg)
                }
            })
            .catch(err=>res.status(500).send(err))
    }

    const remove = async (req, res)=>{
        try{
            const compraProdutoVenda = await app.db('produto_compra')
                .where({ compraId: req.params.id })
            notExistsOrError(compraProdutoVenda, 'Compra ja foi cadastrada com esse Cliente.')

            const rowsDeleted = await app.db('compra')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Compra não foi encontrada.')
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch(msg){
            res.status(500).send(msg)
        }
    }

    return{ save, get, remove, getById }
}