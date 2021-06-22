
exports.up = function(knex) {
    return knex.schema.createTable('compra', table=>{
        table.increments('id').primary()
        table.datetime('data').defaultTo(knex.fn.now()).notNull()
        table.date('deletedAt')
        table.date('updatedAt')
        table.integer('fornecedorId').unsigned().references('id')
            .inTable('fornecedor').notNull().onUpdate('CASCADE').onDelete('CASCADE')
        table.integer('usuarioId').unsigned().references('id')
            .inTable('usuario').notNull().onUpdate('CASCADE').onDelete('CASCADE')
        table.integer('pagamentoId').unsigned().references('id')
            .inTable('pagamento').notNull().onUpdate('CASCADE').onDelete('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('compra')
};
