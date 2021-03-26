module.exports=app=>{
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res)=>{
        const tipoPagamentoBody = { ...req.body }
        const descricao = tipoPagamentoBody.descricao.toUpperCase()
        const tipoPagamento = {
            id: tipoPagamentoBody.id,
            descricao: descricao
        }

        if(req.params.id) tipoPagamento.id = req.params.id

        try {
            existsOrError(tipoPagamento.descricao, 'tipo de pagamento não informado!')

            const tipoPagamentoFromDB = await app.db('tipo_pagamento')
                .where({ descricao: tipoPagamento.descricao }).first()

            notExistsOrError(tipoPagamentoFromDB, 'tipo de pagamento já cadastrado!')

        } catch (msg) {
            return res.status(400).send(msg)
        }

        if(tipoPagamento.id){
            app.db('tipo_pagamento')
                .update(tipoPagamento)
                .where({ id: tipoPagamento.id })
                .then(_ => res.status(200).json(tipoPagamento))
                .catch(err=>res.status(500).send(err))
        }else{
            app.db('tipo_pagamento')
                .insert(tipoPagamento)
                .then(_ => res.status(201).json(tipoPagamento))
                .catch(err=>res.status(500).send(err))
        }
    }

    const limit = 10

    const get = async (req, res)=>{
        const page = req.query.page || 1

        const result = await app.db('tipo_pagamento').count('id').first()
        const count = parseInt(result.count)

        app.db('tipo_pagamento')
            .select('id', 'descricao')
            .limit(limit).offset(page * limit - limit)
            .orderBy('id')
            .then(tipoPagamento=>res.json({ data: tipoPagamento, count, limit }))
            .catch(err=>res.status(500).send(err))
    }

    const remove = async (req, res)=>{
        try{
            const tipoPagamento = await app.db('pagamento')
                .where({ tipoPagamentoId: req.params.id })
            notExistsOrError(tipoPagamento, 'Produtos ja foram cadastrados com esse tipo de pagamento.')

            const rowsDeleted = await app.db('tipo_pagamento')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Tipo de pagamento não foi encontrado.')
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