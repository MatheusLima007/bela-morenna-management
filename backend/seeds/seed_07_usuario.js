
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('usuario').del()
    .then(function () {
      // Inserts seed entries
      return knex('usuario').insert([
        {	
          nome: "Conta teste",
          telefone: "44997653840",
          cpf: "0740961584",
          email: "teste123@gmail.com",
          senha: "teste123",
          admin: true,
          enderecoId: 2
        },
        {	
          nome: "Conta teste 2",
          telefone: "44997653840",
          cpf: "0740961584",
          email: "teste123@gmail.com",
          senha: "teste123",
          admin: false,
          enderecoId: 3
        },
        {	
          nome: "Conta teste 3",
          telefone: "44997653840",
          cpf: "0740961584",
          email: "teste123@gmail.com",
          senha: "teste123",
          admin: true,
          enderecoId: 1
        },
      ]);
    });
};
