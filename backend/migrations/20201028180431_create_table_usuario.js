
exports.up = function(knex) {
    return knex.schema.createTable('usuario', table=>{
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('telefone').notNull()
        table.string('cpf').notNull()
        table.string('email').notNull()
        table.string('senha').notNull()
        table.boolean('admin').notNull().defaultTo(false)
        table.date('deletedAt')
        table.date('updatedAt')
        table.integer('enderecoId').unsigned().references('id')
            .inTable('endereco').notNull().onUpdate('CASCADE').onDelete('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuario')
};
