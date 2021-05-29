
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tipo_pagamento').del()
    .then(function () {
      // Inserts seed entries
      return knex('tipo_pagamento').insert([
        {descricao: 'BOLETO'},
        {descricao: 'DINHEIRO'},
        {descricao: 'CARTÃO'}
      ]);
    });
};
