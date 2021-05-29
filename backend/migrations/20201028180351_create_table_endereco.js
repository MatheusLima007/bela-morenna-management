
exports.up = function(knex) {
    return knex.schema.createTable('endereco', table=>{
        table.increments('id').primary()
        table.integer('cep').notNull()
        table.string('bairro').notNull()
        table.string('rua').notNull()
        table.string('numero').notNull()
        table.string('complemento')
        table.string('cidade', 70).notNull()
        table.string('estado', 2).notNull()
        table.date('deletedAt')
        table.date('updatedAt')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('endereco')
};
