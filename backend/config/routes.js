const admin = require('./admin')

module.exports=app=>{
    app.post('/signup', app.api.usuario.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    /*
    *   # ROTAS - TAMANHOS
    */
    app.route('/tamanhos')
        // .all(app.config.passport.authenticate())
        .post(app.api.tamanho.save)
        .get(app.api.tamanho.get)

    app.route('/tamanhos/:id')
        // .all(app.config.passport.authenticate())
        .put(admin(app.api.tamanho.save))
        .delete(admin(app.api.tamanho.remove))

    /*
    *   # ROTAS - TIPOPAGAMENTOS
    */
    app.route('/tipo_pagamentos')
        // .all(app.config.passport.authenticate())
        .post(app.api.tipo_pagamento.save)
        .get(app.api.tipo_pagamento.get)

    app.route('/tipo_pagamentos/:id')
        // .all(app.config.passport.authenticate())
        .put(admin(app.api.tipo_pagamento.save))
        .delete(admin(app.api.tipo_pagamento.remove))

    /*
    *   # ROTAS - ENDERECOS
    */
    app.route('/enderecos')
        // .all(app.config.passport.authenticate())
        .post(app.api.endereco.save)
        .get(app.api.endereco.get)

    app.route('/enderecos/:id')
        // .all(app.config.passport.authenticate())
        .put(admin(app.api.endereco.save))
        .get(app.api.endereco.getById)
        .delete(admin(app.api.endereco.remove))

    /*
    *   # ROTAS - PAGAMENTOS
    */
    app.route('/pagamentos')
        // .all(app.config.passport.authenticate())
        .post(app.api.pagamento.save)
        .get(app.api.pagamento.get)

    app.route('/pagamentos/:id')
        // .all(app.config.passport.authenticate())
        .put(admin(app.api.pagamento.save))
        .delete(admin(app.api.pagamento.remove))

    /*
    *   # ROTAS - PRODUTOS
    */
    app.route('/produtos')
        // .all(app.config.passport.authenticate())
        .post(app.api.produto.save)
        .get(app.api.produto.get)

    app.route('/produtos/:id')
        // .all(app.config.passport.authenticate())
        .put(admin(app.api.produto.save))
        .get(app.api.produto.getById)
        .delete(admin(app.api.produto.remove))

    /*
    *   # ROTAS - CLIENTES
    */
    app.route('/clientes')
        // .all(app.config.passport.authenticate())
        .post(app.api.cliente.save)
        .get(app.api.cliente.get)

    app.route('/clientes/:id')
        // .all(app.config.passport.authenticate())
        .put(admin(app.api.cliente.save))
        .get(app.api.cliente.getById)
        .delete(admin(app.api.cliente.remove))

    /*
    *   # ROTAS - USUARIOS
    */
    app.route('/usuarios')
        // .all(app.config.passport.authenticate())
        .post(app.api.usuario.save)
        .get(app.api.usuario.get)

    app.route('/usuarios/:id')
        // .all(app.config.passport.authenticate())
        .put(admin(app.api.usuario.save))
        .get(app.api.usuario.getById)
        .delete(admin(app.api.usuario.remove))

    /*
    *   # ROTAS - FORNECEDORES
    */
    app.route('/fornecedores')
        // .all(app.config.passport.authenticate())
        .post(app.api.fornecedor.save)
        .get(app.api.fornecedor.get)

    app.route('/fornecedores/:id')
        // .all(app.config.passport.authenticate())
        .put(admin(app.api.fornecedor.save))
        .get(app.api.fornecedor.getById)
        .delete(admin(app.api.fornecedor.remove))

    /*
    *   # ROTAS - VENDAS
    */
    app.route('/vendas')
        // .all(app.config.passport.authenticate())
        .post(app.api.venda.save)
        .get(app.api.venda.get)

    app.route('/vendas/:id')
        // .all(app.config.passport.authenticate())
        .put(admin(app.api.venda.save))
        .get(app.api.venda.getById)
        .delete(admin(app.api.venda.remove))

    /*
    *   # ROTAS - COMPRAS
    */
    app.route('/compras')
        // .all(app.config.passport.authenticate())
        .post(app.api.compra.save)
        .get(app.api.compra.get)

    app.route('/compras/:id')
        // .all(app.config.passport.authenticate())
        .put(admin(app.api.compra.save))
        .get(app.api.compra.getById)
        .delete(admin(app.api.compra.remove))

    /*
    *   # ROTAS - PRODUTOVENDAS
    */
    app.route('/produto-vendas')
        // .all(app.config.passport.authenticate())
        .post(app.api.produto_venda.save)
        .get(app.api.produto_venda.get)

    app.route('/produto-vendas/:id')
        // .all(app.config.passport.authenticate())
        .put(admin(app.api.produto_venda.save))
        .get(app.api.produto_venda.getById)
        .delete(admin(app.api.produto_venda.remove))

    /*
    *   # ROTAS - PRODUTOCOMPRA
    */
    app.route('/produto-compras')
        // .all(app.config.passport.authenticate())
        .post(app.api.produto_compra.save)
        .get(app.api.produto_compra.get)

    app.route('/produto-compras/:id')
        // .all(app.config.passport.authenticate())
        .put(admin(app.api.produto_compra.save))
        .get(app.api.produto_compra.getById)
        .delete(admin(app.api.produto_compra.remove))
    
}