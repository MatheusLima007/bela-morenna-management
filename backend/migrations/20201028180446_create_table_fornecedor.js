
exports.up = function(knex) {
    return knex.schema.createTable('fornecedor', table=>{
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('telefone').notNull()
        table.string('cnpj')
        table.string('email')
        table.date('deletedAt')
        table.date('updatedAt')
        table.integer('enderecoId').unsigned().references('id')
            .inTable('endereco').notNull().onUpdate('CASCADE').onDelete('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('fornecedor')
};
