
exports.up = function(knex) {
    return knex.schema.createTable('compra', table=>{
        table.increments('id').primary()
        table.datetime('data').defaultTo(knex.fn.now()).notNull()
        table.date('deletedAt')
        table.date('updatedAt')
        table.integer('fornecedorId').references('id')
            .inTable('fornecedor').notNull()
        table.integer('usuarioId').references('id')
            .inTable('usuario').notNull()
        table.integer('pagamentoId').references('id')
            .inTable('pagamento').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('compra')
};
