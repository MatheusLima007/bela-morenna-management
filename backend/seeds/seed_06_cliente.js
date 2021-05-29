
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cliente').del()
    .then(function () {
      // Inserts seed entries
      return knex('cliente').insert([
        {
          nome: "Matheus Lima da Silva",
          telefone: "44997653840",
          cpf: "07409615930",
          email: "matheu9832gmail.com",
          enderecoId: 1
        },
        {
          nome: "Joao Jose Jorge",
          telefone: "44997653840",
          cpf: "07409615930",
          email: "matheu9832gmail.com",
          enderecoId: 2
        },
        {
          nome: "cu de grilo",
          telefone: "44997653840",
          cpf: "07409615930",
          email: "matheu9832gmail.com",
          enderecoId: 3
        },
      ]);
    });
};
