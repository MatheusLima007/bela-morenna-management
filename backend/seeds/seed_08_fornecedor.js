
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('fornecedor').del()
    .then(function () {
      // Inserts seed entries
      return knex('fornecedor').insert([
        {	
          nome: "Matheus Lima",
          telefone: "44997653840",
          cnpj: "07409615940",
          email: "matheu9832gmail.com",
          enderecoId: 3
        },
        {	
          nome: "Matheus Silva",
          telefone: "44997653840",
          cnpj: "07409615940",
          email: "matheu9832gmail.com",
          enderecoId: 1
        },
        {	
          nome: "Matheus Lima da Silva",
          telefone: "44997653840",
          cnpj: "07409615940",
          email: "matheu9832gmail.com",
          enderecoId: 2
        },
      ]);
    });
};
