
exports.up = function(knex) {
    return knex.schema.createTable('tipo_pagamento', table=>{
        table.increments('id').primary()
        table.string('descricao', 45).notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tipo_pagamento')
};
