
exports.up = function(knex) {
    return knex.schema.createTable('produto_venda', table=>{
        table.increments('id').primary()
        table.integer('quantidade').notNull()
        table.datetime('data').defaultTo(knex.fn.now()).notNull()
        table.date('deletedAt')
        table.date('updatedAt')
        table.integer('produtoId').unsigned().references('id')
            .inTable('produto').notNull().onUpdate('CASCADE').onDelete('CASCADE')
        table.integer('tamanhoId').unsigned().references('id')
            .inTable('tamanho').notNull().onUpdate('CASCADE').onDelete('CASCADE')
        table.integer('vendaId').unsigned().references('id')
            .inTable('venda').notNull().onUpdate('CASCADE').onDelete('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('produto_venda')
};
