
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('produto_venda').del()
    .then(function () {
      // Inserts seed entries
      return knex('produto_venda').insert([
        {
          quantidade: 5,
          produtoId: 1,
          tamanhoId: 2,
          vendaId: 1
        },
        {
          quantidade: 10,
          produtoId: 2,
          tamanhoId: 1,
          vendaId: 2
        },
        {
          quantidade: 1,
          produtoId: 3,
          tamanhoId: 3,
          vendaId: 3
        },
      ]);
    });
};
