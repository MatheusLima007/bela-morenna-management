
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('endereco').del()
    .then(function () {
      // Inserts seed entries
      return knex('endereco').insert([
        {
          cep: 87504190,
          bairro: "Zona V",
          rua: "Domingues Gonçalves de Paula",
          numero: 1012,
          cidade: "Umuarama",
          estado: "PR"
        },
        {
          cep: 87504190,
          bairro: "Zona V",
          rua: "Domingues Gonçalves de Paula",
          numero: 4510,
          cidade: "Pinhão",
          estado: "PR"
        },
        {
          cep: 87504190,
          bairro: "Zona V",
          rua: "Domingues Gonçalves de Paula",
          numero: 140,
          cidade: "Piracicaba",
          estado: "SP"
        },
      ]);
    });
};
