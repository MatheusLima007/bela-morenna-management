module.exports = app => {
    const { existsOrError, notExistsOrError, lessThan } = app.api.validation

    const save = async (req, res) => {
        const tamanhoBody = { ...req.body }
       
        const descricao = tamanhoBody.descricao.toUpperCase()

        const tamanho = {
            id: tamanhoBody.id,
            descricao: descricao,
        }

        if(req.params.id) tamanho.id = req.params.id

        try {
            existsOrError(tamanho.descricao, 'Tamanho não informado!')
            lessThan(tamanho.descricao, 4, 'Tamanho excedeu o numero esperado!')

            const tamanhoFromDB = await app.db('tamanho')
                .where({ descricao: tamanho.descricao }).first()

            notExistsOrError(tamanhoFromDB, 'Tamanho já cadastrado!')

        } catch (msg) {
            return res.status(400).send(msg)
        }

        if(tamanho.id) {
            app.db('tamanho')
                .update(tamanho)
                .where({ id: tamanho.id })
                .then(_ => res.status(200).json(tamanho))
                .catch(err=>res.status(500).send(err))
        } else {
            app.db('tamanho')
                .insert(tamanho)
                .then(_ => res.status(201).json(tamanho))
                .catch(err=>res.status(500).send(err))
        }
    }

    const limit = 10

    const get = async (req, res) => {
        //const page = req.query.page || 1

        const result = await app.db('tamanho').count('id').first()
        const count = parseInt(result.count)

        app.db('tamanho')
            .select('id', 'descricao')
            //.limit(limit).offset(page * limit - limit)
            .orderBy('id', 'desc')
            .then(tamanho=>res.json({ data: tamanho, count, limit }))
            .catch(err=>res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try{
            const tamanho = await app.db('produto')
                .where({ tamanhoId: req.params.id })
            notExistsOrError(tamanho, 'Produtos ja foram cadastrados com esse tamanho.')

            const rowsDeleted = await app.db('tamanho')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Tamanho não foi encontrado.')
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