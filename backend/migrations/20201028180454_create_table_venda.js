
exports.up = function(knex) {
    return knex.schema.createTable('venda', table=>{
        table.increments('id').primary()
        table.timestamp('data', [{ useTz: false }, { precision: 6 }]).defaultTo(knex.fn.now());
        table.integer('clienteId').references('id')
            .inTable('cliente').notNull()
        table.integer('usuarioId').references('id')
            .inTable('usuario').notNull()
        table.integer('pagamentoId').references('id')
            .inTable('pagamento').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('venda')
};
