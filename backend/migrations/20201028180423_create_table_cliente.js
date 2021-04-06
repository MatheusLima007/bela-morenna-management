
exports.up = function(knex) {
    return knex.schema.createTable('cliente', table=>{
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('telefone').notNull()
        table.string('cpf')
        table.string('email')
        table.integer('enderecoId').references('id')
            .inTable('endereco').notNull()
        table.date('deletedAt')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('cliente')
};
