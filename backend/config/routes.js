const admin = require('./admin')

module.exports=app=>{
    app.post('/signup', app.api.usuario.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/tamanhos')
        // .all(app.config.passport.authenticate())
        .post(app.api.tamanho.save)
        .get(app.api.tamanho.get)

    app.route('/tamanhos/:id')
        // .all(app.config.passport.authenticate())
        .put(admin(app.api.tamanho.save))
        .delete(admin(app.api.tamanho.remove))

    app.route('/tipo_pagamentos')
        // .all(app.config.passport.authenticate())
        .post(app.api.tipo_pagamento.save)
        .get(app.api.tipo_pagamento.get)

    app.route('/tipo_pagamentos/:id')
        // .all(app.config.passport.authenticate())
        .put(admin(app.api.tipo_pagamento.save))
        .delete(admin(app.api.tipo_pagamento.remove))

    app.route('/enderecos')
        // .all(app.config.passport.authenticate())
        .post(app.api.endereco.save)
        .get(app.api.endereco.get)

    app.route('/enderecos/:id')
        // .all(app.config.passport.authenticate())
        .put(admin(app.api.endereco.save))
        .delete(admin(app.api.endereco.remove))

    app.route('/pagamentos')
        // .all(app.config.passport.authenticate())
        .post(app.api.pagamento.save)
        .get(app.api.pagamento.get)

    app.route('/pagamentos/:id')
        // .all(app.config.passport.authenticate())
        .put(admin(app.api.pagamento.save))
        .delete(admin(app.api.pagamento.remove))

    app.route('/produtos')
        // .all(app.config.passport.authenticate())
        .post(app.api.produto.save)
        .get(app.api.produto.get)

    app.route('/produtos/:id')
        // .all(app.config.passport.authenticate())
        .put(admin(app.api.produto.save))
        .delete(admin(app.api.produto.remove))

    app.route('/clientes')
        // .all(app.config.passport.authenticate())
        .post(app.api.cliente.save)
        .get(app.api.cliente.get)

    app.route('/clientes/:id')
        // .all(app.config.passport.authenticate())
        .put(admin(app.api.cliente.save))
        .delete(admin(app.api.cliente.remove))

    app.route('/usuarios')
        // .all(app.config.passport.authenticate())
        .post(app.api.usuario.save)
        .get(app.api.usuario.get)

    app.route('/usuarios/:id')
        // .all(app.config.passport.authenticate())
        .put(admin(app.api.usuario.save))
        .get(app.api.usuario.getById)
        .delete(admin(app.api.usuario.remove))

    app.route('/fornecedores')
        // .all(app.config.passport.authenticate())
        .post(app.api.fornecedor.save)
        .get(app.api.fornecedor.get)

    app.route('/fornecedores/:id')
        // .all(app.config.passport.authenticate())
        .put(admin(app.api.fornecedor.save))
        .delete(admin(app.api.fornecedor.remove))

    app.route('/vendas')
        // .all(app.config.passport.authenticate())
        .post(app.api.venda.save)
        .get(app.api.venda.get)

    app.route('/vendas/:id')
        // .all(app.config.passport.authenticate())
        .put(admin(app.api.venda.save))
        .delete(admin(app.api.venda.remove))

    app.route('/compras')
        // .all(app.config.passport.authenticate())
        .post(app.api.compra.save)
        .get(app.api.compra.get)

    app.route('/compras/:id')
        // .all(app.config.passport.authenticate())
        .put(admin(app.api.compra.save))
        .delete(admin(app.api.compra.remove))

    app.route('/produto-vendas')
        // .all(app.config.passport.authenticate())
        .post(app.api.produto_venda.save)
        .get(app.api.produto_venda.get)

    app.route('/produto-vendas/:id')
        // .all(app.config.passport.authenticate())
        .put(admin(app.api.produto_venda.save))
        .delete(admin(app.api.produto_venda.remove))

    app.route('/produto-compras')
        // .all(app.config.passport.authenticate())
        .post(app.api.produto_compra.save)
        .get(app.api.produto_compra.get)

    app.route('/produto-compras/:id')
        // .all(app.config.passport.authenticate())
        .put(admin(app.api.produto_compra.save))
        .delete(admin(app.api.produto_compra.remove))
    

    // app.route('/users')
        // .all(app.config.passport.authenticate())
    //     .post(admin(app.api.user.save))
    //     .get(admin(app.api.user.get))

    // app.route('/users/:id')
        // .all(app.config.passport.authenticate())
    //     .put(admin(app.api.user.save))
    //     .get(admin(app.api.user.getById))
    //     .delete(admin(app.api.user.remove))

    // app.route('/categories')
    //     .all(app.config.passport.authenticate())
    //     .get(admin(app.api.category.get))
    //     .post(admin(app.api.category.save))

    // app.route('/categories/tree')
    //     .all(app.config.passport.authenticate())
    //     .get(app.api.category.getTree)        

    // app.route('/categories/:id')
    //     .all(app.config.passport.authenticate())
    //     .get(app.api.category.getById)
    //     .put(admin(app.api.category.save))
    //     .delete(admin(app.api.category.remove))

    // app.route('/articles')
    //     .all(app.config.passport.authenticate())
    //     .get(admin(app.api.article.get))
    //     .post(admin(app.api.article.save))

    // app.route('/articles/:id')
    //     .all(app.config.passport.authenticate())
    //     .get(app.api.article.getById)
    //     .put(admin(app.api.article.save))
    //     .delete(admin(app.api.article.remove))

    // app.route('/categories/:id/articles')
    //     .all(app.config.passport.authenticate())
    //     .get(app.api.article.getByCategory)

    // app.route('/stats')
    //     .all(app.config.passport.authenticate())
    //     .get(app.api.stat.get)
}