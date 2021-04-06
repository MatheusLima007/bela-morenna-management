const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req,res) => {
        const usuarioBody = { ...req.body }
        if(req.params.id) usuario.id = req.params.id
        
        const usuario = {
            id: usuarioBody.id,
            nome: usuarioBody.nome.toUpperCase(),
            telefone: usuarioBody.telefone,
            cpf: usuarioBody.cpf,
            email: usuarioBody.email,
            senha: usuarioBody.senha,
            confirmaSenha: usuarioBody.confirmaSenha,
            admin: usuarioBody.admin,
            enderecoId: usuarioBody.enderecoId,
        }

        if(!req.originalUrl.startsWith('/usuarios')) usuario.admin = false
        //if(!req.user || !req.user.admin) usuario.admin = false

        try{
            existsOrError(usuario.nome, 'Nome não informado')
            existsOrError(usuario.telefone, 'Telefone não informado')
            existsOrError(usuario.cpf, 'CPF não informado')
            existsOrError(usuario.email, 'E-mail não informado')
            existsOrError(usuario.senha, 'Senha não informado')
            existsOrError(usuario.enderecoId, 'Endereço não informado')
            existsOrError(usuario.confirmaSenha, 'Confirmação de Senha inválida')
            equalsOrError(
                usuario.senha, 
                usuario.confirmaSenha, 
                'Senhas não conferem'
            )
            
            const usuarioFromDB = await app.db('usuario')
                .where({ email: usuario.email }).first()
            
            if(!usuario.id){
                notExistsOrError(usuarioFromDB, 'Usuário já cadastrado')
            }
        } catch(msg){
            return res.status(400).send(msg)
        }

        usuario.senha = encryptPassword(usuario.senha)
        delete usuario.confirmaSenha

        if(usuario.id){
            app.db('usuario')
                .update(usuario)
                .where({ id: usuario.id })
                .then(_ => res.status(200).json(usuario))
                .catch(err=>res.status(500).send(err))
        }else{
            app.db('usuario')
                .insert(usuario)
                .then(_ => res.status(201).json(usuario))
                .catch(err=>res.status(500).send(err))
        }
    }

    const limit = 10

    const get = async (req, res)=>{
        const page = req.query.page || 1

        const result = await app.db('usuario').count('id').first()
        const count = parseInt(result.count)

        app.db({c: 'usuario', e: 'endereco'})
            .select('c.id', 'c.nome', 'c.telefone', 'c.cpf', 'c.email', 'c.admin', 'e.cep', 'e.bairro', 'e.rua', 'e.numero', 'e.cidade', 'e.estado')
            .whereRaw('?? = ??', ['e.id', 'c.enderecoId'])
            .limit(limit).offset(page * limit - limit)
            .orderBy('id')
            .then(usuario=>res.json({ data: usuario, count, limit }))
            .catch(err=>res.status(500).send(err))
    }

    const getById = async (req, res)=>{
        const {id} = req.params
        app.db('usuario AS c')
            .first() 
            .where('c.id', id)
            .join('endereco AS e', 'e.id', '=', 'c.enderecoId')
            .select('c.id', 'c.nome', 'c.telefone', 'c.cpf', 'c.email', 'e.cep', 'e.bairro', 'e.rua', 'e.numero', 'e.cidade', 'e.estado')
            .then(usuario => {
                try {
                    existsOrError(usuario, 'Nenhum usuario encontrado!')
                    res.status(200).json(usuario)
                } catch (msg) {
                    return res.status(400).send(msg)
                }
            })
            .catch(err => res.status(500).send(err))
    }

    const remove = async(req, res)=>{
        try{
            const usuarioVenda = await app.db('venda')
                .where({ usuarioId: req.params.id })
            notExistsOrError(usuarioVenda, 'Venda ja foi cadastrada com esse Usuario.')

            const usuarioCompra = await app.db('compra')
                .where({ usuarioId: req.params.id })
            notExistsOrError(usuarioCompra, 'Compra ja foi cadastrada com esse Usuario.')

            const rowsDeleted = await app.db('usuario')
                .where({ id: req.params.id }).del()

            // const rowsUpdated = await app.db('usuario')
            //     .update({deletedAt: new Date()})
            //     .where({ id: req.params.id })

            existsOrError(rowsDeleted, 'Usuário não foi encontrado.')

            res.status(204).send()
        }catch(msg){
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}