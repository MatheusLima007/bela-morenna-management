module.exports=app=>{
    const { existsOrError, notExistsOrError, menorQue, verificaEstado } = app.api.validation

    const save = async (req, res)=>{
        const enderecoBody = { ...req.body }
       
        const endereco = {
            id: enderecoBody.id,
            cep: parseInt(enderecoBody.cep),
            bairro: enderecoBody.bairro.toUpperCase(),
            rua: enderecoBody.rua.toUpperCase(),
            numero: parseInt(enderecoBody.numero),
            cidade: enderecoBody.cidade.toUpperCase(),
            estado: enderecoBody.estado.toUpperCase()
        }

        if(req.params.id) endereco.id = req.params.id

        try {
            existsOrError(endereco.cep, 'CEP não informado!')
            existsOrError(endereco.bairro, 'Bairro não informado!')
            existsOrError(endereco.rua, 'Rua não informada!')
            existsOrError(endereco.numero, 'Número não informado!')
            existsOrError(endereco.cidade, 'Cidade não informada!')
            existsOrError(endereco.estado, 'Estado não informado!')
            verificaEstado(endereco.estado, 2, 'Estado não encontrado, digite apenas a sigla UF do estado!')
            // const enderecoFromDB = await app.db('endereco')
            //     .where({ cep: endereco.cep }).first()

            // notExistsOrError(enderecoFromDB, 'Tamanho já cadastrado!')

        } catch (msg) {
            return res.status(400).send(msg)
        }

        if(endereco.id){
            app.db('endereco')
                .update(endereco)
                .where({ id: endereco.id })
                .then(_ => res.status(200).json(endereco))
                .catch(err=>res.status(500).send(err))
        }else{
            app.db('endereco')
                .insert(endereco)
                .then(_ => res.status(201).json(endereco))
                .catch(err=>res.status(500).send(err))
        }
    }

    const limit = 10

    const get = async (req, res)=>{
        const page = req.query.page || 1

        const result = await app.db('endereco').count('id').first()
        const count = parseInt(result.count)

        app.db('endereco')
            .select('id', 'cep', 'bairro', 'rua', 'numero', 'cidade', 'estado')
            .limit(limit).offset(page * limit - limit)
            .orderBy('id')
            .then(endereco=>res.json({ data: endereco, count, limit }))
            .catch(err=>res.status(500).send(err))

        // app.db({e: 'endereco', c: 'cidade'})
        //     .select('e.id', 'e.cep', 'e.bairro', 'e.rua', 'e.numero', 'c.cidade', 'c.estado')
        //     .whereRaw('?? = ??', ['c.id', 'e.cidadeId'])
        //     .orderBy('e.id', 'desc')
    }

    const remove = async (req, res)=>{
        try{
            const enderecoCliente = await app.db('cliente')
                .where({ enderecoId: req.params.id })
            notExistsOrError(enderecoCliente, 'Cliente ja foi cadastrado com esse endereco.')

            const enderecoUsuario = await app.db('usuario')
                .where({ enderecoId: req.params.id })
            notExistsOrError(enderecoUsuario, 'Usuario ja foi cadastrado com esse endereco.')

            const enderecoFornecedor = await app.db('fornecedor')
                .where({ enderecoId: req.params.id })
            notExistsOrError(enderecoFornecedor, 'Fornecedor ja foi cadastrado com esse endereco.')

            const rowsDeleted = await app.db('endereco')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Endereço não foi encontrado.')
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