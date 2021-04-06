module.exports=app=>{
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res)=>{
        const fornecedorBody = { ...req.body }
       
        const fornecedor = {
            id: fornecedorBody.id,
            nome: fornecedorBody.nome.toUpperCase(),
            telefone: fornecedorBody.telefone,
            cpf: fornecedorBody.cpf,
            email: fornecedorBody.email,
            enderecoId: fornecedorBody.enderecoId
        }

        if(req.params.id) fornecedor.id = req.params.id

        try {
            existsOrError(fornecedor.nome, 'Nome não informado!')
            existsOrError(fornecedor.telefone, 'Telefone não informado!')
            existsOrError(fornecedor.cpf, 'CPF não informado!')
            existsOrError(fornecedor.email, 'E-mail não informado!')
            existsOrError(fornecedor.enderecoId, 'Endereço do fornecedor não informado!')

            const fornecedorFromDB = await app.db('fornecedor')
                .where({ nome: fornecedor.nome }).first()

            notExistsOrError(fornecedorFromDB, 'Fornecedor já cadastrado!')

        } catch (msg) {
            return res.status(400).send(msg)
        }

        if(fornecedor.id){
            app.db('fornecedor')
                .update(fornecedor)
                .where({ id: fornecedor.id })
                .then(_ => res.status(200).json(fornecedor))
                .catch(err=>res.status(500).send(err))
        }else{
            app.db('fornecedor')
                .insert(fornecedor)
                .then(_ => res.status(201).json(fornecedor))
                .catch(err=>res.status(500).send(err))
        }
    }

    const limit = 10

    const get = async (req, res)=>{
        const page = req.query.page || 1

        const result = await app.db('fornecedor').count('id').first()
        const count = parseInt(result.count)

        app.db({f: 'fornecedor', e: 'endereco'})
            .select('f.id', 'f.nome', 'f.telefone', 'f.cpf', 'f.email', 'e.cep', 'e.bairro', 'e.rua', 'e.numero', 'e.cidade', 'e.estado')
            .whereRaw('?? = ??', ['f.enderecoId', 'e.id'])
            .limit(limit).offset(page * limit - limit)
            .orderBy('id')
            .then(fornecedor=>res.json({ data: fornecedor, count, limit }))
            .catch(err=>res.status(500).send(err))
    }

    const getById = async (req, res)=>{
        const { id } = req.params
        app.db('fornecedor AS f')
            .first() 
            .where('f.id', id)
            .join('endereco AS e', 'e.id', '=', 'f.enderecoId')
            .select('f.id', 'f.nome', 'f.telefone', 'f.cpf', 'f.email', 'e.cep', 'e.bairro', 'e.rua', 'e.numero', 'e.cidade', 'e.estado')
            .then(fornecedor => {
                try {
                    existsOrError(fornecedor, 'Nenhum fornecedor encontrado!')
                    res.status(200).json(fornecedor)
                } catch (msg) {
                    return res.status(400).send(msg)
                }
            })
            .catch(err=>res.status(500).send(err))
    }

    const remove = async (req, res)=>{
        try{
            const fornecedorCompra = await app.db('compra')
                .where({ fornecedorId: req.params.id })
            notExistsOrError(fornecedorCompra, 'Compra ja foi cadastrada com esse Fornecedor.')

            const rowsDeleted = await app.db('fornecedor')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Fornecedor não foi encontrado.')
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