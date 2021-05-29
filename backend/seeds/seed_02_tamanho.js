
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tamanho').del()
    .then(function () {
      // Inserts seed entries
      return knex('tamanho').insert([
        {descricao: 'G'},
        {descricao: 'M'},
        {descricao: 'P'}
      ]);
    });
};
