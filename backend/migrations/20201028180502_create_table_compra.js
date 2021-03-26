
exports.up = function(knex) {
    return knex.schema.createTable('compra', table=>{
        table.increments('id').primary()
        table.timestamp('data')
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
