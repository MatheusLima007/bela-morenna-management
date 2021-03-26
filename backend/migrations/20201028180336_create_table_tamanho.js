
exports.up = function(knex) {
    return knex.schema.createTable('tamanho', table=>{
        table.increments('id').primary()
        table.string('descricao', 4).notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tamanho')
};
