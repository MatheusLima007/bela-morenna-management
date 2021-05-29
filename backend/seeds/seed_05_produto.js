
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('produto').del()
    .then(function () {
      // Inserts seed entries
      return knex('produto').insert([
        {
          id: 1, 
          descricao: "calça",
          quantidade: 3,
          marca: "jacare",
          tamanhoId: 1
        },
        {
          id: 2, 
          descricao: "camisa",
          quantidade: 2,
          marca: "lacoste",
          tamanhoId: 3
        },
        {
          id: 3, 
          descricao: "tenis",
          quantidade: 1,
          marca: "crocodilo",
          tamanhoId: 2
        },
      ]);
    });
};
