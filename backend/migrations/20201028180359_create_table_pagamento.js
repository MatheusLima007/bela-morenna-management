
exports.up = function(knex) {
    return knex.schema.createTable('pagamento', table=>{
        table.increments('id').primary()
        table.float('precoTotal' , 10, 2).notNull()
        table.integer('parcela').notNull()
        table.date('deletedAt')
        table.date('updatedAt')
        table.integer('tipoPagamentoId').references('id')
            .inTable('tipo_pagamento').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('pagamento')
};
