
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('compra').del()
    .then(function () {
      // Inserts seed entries
      return knex('compra').insert([
        {
          data: "2021-05-29 14:26:30.991363+00",
          fornecedorId: 1,
          usuarioId: 2,
          pagamentoId: 3
        },
        {
          data: "2021-05-29 14:26:30.991363+00",
          fornecedorId: 2,
          usuarioId: 1,
          pagamentoId: 2
        },
        {
          data: "2021-05-29",
          fornecedorId: 3,
          usuarioId: 3,
          pagamentoId: 1
        },
      ]);
    });
};
