
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('venda').del()
    .then(function () {
      // Inserts seed entries
      return knex('venda').insert([
        {	
          clienteId: 1,
          usuarioId: 1,
          pagamentoId: 3
        },
        {	
          clienteId: 2,
          usuarioId: 3,
          pagamentoId: 1
        },
        {	
          clienteId: 3,
          usuarioId: 2,
          pagamentoId: 2
        },
      ]);
    });
};
