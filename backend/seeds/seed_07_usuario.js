const bcrypt = require('bcrypt-nodejs')

const encryptPassword = password => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

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
          email: "teste1@gmail.com",
          senha: encryptPassword('teste123'),
          admin: true,
          enderecoId: 2
        },
        {	
          nome: "Conta teste 2",
          telefone: "44997653840",
          cpf: "0740961584",
          email: "teste12@gmail.com",
          senha: encryptPassword('teste123'),
          admin: false,
          enderecoId: 3
        },
        {	
          nome: "Conta teste 3",
          telefone: "44997653840",
          cpf: "0740961584",
          email: "teste123@gmail.com",
          senha: encryptPassword('teste123'),
          admin: true,
          enderecoId: 1
        },
      ]);
    });
};
