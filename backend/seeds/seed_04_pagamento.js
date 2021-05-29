
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pagamento').del()
    .then(function () {
      // Inserts seed entries
      return knex('pagamento').insert([
        {
          precoTotal: 4500,
          parcela: 5,
          tipoPagamentoId: 1
        }, 
        {
          precoTotal: 150.65,
          parcela: 3,
          tipoPagamentoId: 2
        },
        {
          precoTotal: 15000.5,
          parcela: 2,
          tipoPagamentoId: 3
        },
      ]);
    });
};
