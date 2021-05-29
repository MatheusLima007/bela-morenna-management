
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('produto_compra').del()
    .then(function () {
      // Inserts seed entries
      return knex('produto_compra').insert([
        {	
          quantidade: 10,
          produtoId: 3,
          tamanhoId: 3,
          compraId: 1
        },
        {	
          quantidade: 30,
          produtoId: 2,
          tamanhoId: 1,
          compraId: 2
        },
        {	
          quantidade: 25,
          produtoId: 1,
          tamanhoId: 2,
          compraId: 3
        },
      ]);
    });
};
