
exports.up = function(knex) {
    return knex.schema.createTable('produto', table=>{
        table.increments('id').primary()
        table.string('descricao').notNull()
        table.integer('quantidade').notNull()
        table.string('marca')
        table.date('deletedAt')
        table.date('updatedAt')
        table.integer('tamanhoId').unsigned().references('id')
            .inTable('tamanho').notNull().onUpdate('CASCADE').onDelete('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('produto')
};
