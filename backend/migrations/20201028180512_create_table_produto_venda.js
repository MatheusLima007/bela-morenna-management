
exports.up = function(knex) {
    return knex.schema.createTable('produto_venda', table=>{
        table.increments('id').primary()
        table.integer('quantidade').notNull()
        table.datetime('data').defaultTo(knex.fn.now()).notNull()
        table.date('deletedAt')
        table.date('updatedAt')
        table.integer('produtoId').references('id')
            .inTable('produto').notNull()
        table.integer('tamanhoId').references('id')
            .inTable('tamanho').notNull()
        table.integer('vendaId').references('id')
            .inTable('venda').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('produto_venda')
};
