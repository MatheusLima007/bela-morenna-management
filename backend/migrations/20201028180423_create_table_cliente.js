
exports.up = function(knex) {
    return knex.schema.createTable('cliente', table=>{
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('telefone').notNull()
        table.string('cpf').notNull()
        table.string('email')
        table.date('deletedAt')
        table.date('updatedAt')
        table.integer('enderecoId').references('id')
            .inTable('endereco').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('cliente')
};
