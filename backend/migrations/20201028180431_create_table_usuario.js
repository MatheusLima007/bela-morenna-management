
exports.up = function(knex) {
    return knex.schema.createTable('usuario', table=>{
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('telefone').notNull()
        table.string('cpf').notNull()
        table.string('email').notNull()
        table.string('senha').notNull()
        table.boolean('admin').notNull().defaultTo(false)
        table.integer('enderecoId').references('id')
            .inTable('endereco').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuario')
};
