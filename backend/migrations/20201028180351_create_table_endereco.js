
exports.up = function(knex) {
    return knex.schema.createTable('endereco', table=>{
        table.increments('id').primary()
        table.integer('cep').notNull()
        table.string('bairro')
        table.string('rua')
        table.integer('numero')
        table.string('cidade', 70)
        table.string('estado', 2)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('endereco')
};
