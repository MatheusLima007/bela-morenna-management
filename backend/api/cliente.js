module.exports = (app) => {
  const { existsOrError, notExistsOrError } = app.api.validation;

  const save = async (req, res) => {
    const clienteBody = { ...req.body };

    const cliente = {
      id: clienteBody.id,
      nome: clienteBody.nome.toUpperCase(),
      telefone: clienteBody.telefone,
      cpf: clienteBody.cpf,
      email: clienteBody.email,
      enderecoId: clienteBody.enderecoId,
    };

    if (req.params.id) cliente.id = req.params.id;

    try {
      existsOrError(cliente.nome, "Nome não informado!");
      existsOrError(cliente.telefone, "Telefone não informado!");
      existsOrError(cliente.cpf, "CPF não informado!");
      existsOrError(cliente.email, "E-mail não informado!");
      existsOrError(cliente.enderecoId, "Endereço do CLiente não informado!");

      //   const clienteFromDB = await app
      //     .db("cliente")
      //     .where({ cpf: cliente.cpf })
      //     .first();

      //   notExistsOrError(clienteFromDB, "Cliente já cadastrado!");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (cliente.id) {
      app
        .db("cliente")
        .update(cliente)
        .where({ id: cliente.id })
        .then((_) => res.status(200).json(cliente))
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("cliente")
        .insert(cliente)
        .then((_) => res.status(201).json(cliente))
        .catch((err) => res.status(500).send(err));
    }
  };

  const limit = 10;

  const get = async (req, res) => {
    const page = req.query.page || 1;

    const result = await app.db("cliente").count("id").first();
    const count = parseInt(result.count);

    app
      .db({ c: "cliente", e: "endereco" })
      .select(
        "c.id",
        "c.nome",
        "c.telefone",
        "c.cpf",
        "c.email",
        "e.id as enderecoId",
        "e.cep",
        "e.bairro",
        "e.rua",
        "e.numero",
        "e.cidade",
        "e.estado"
      )
      .whereRaw("?? = ??", ["e.id", "c.enderecoId"])
      .limit(limit)
      .offset(page * limit - limit)
      .orderBy("id")
      .then((cliente) => res.json({ data: cliente, count, limit }))
      .catch((err) => res.status(500).send(err));
  };

  const getById = async (req, res) => {
    const { id } = req.params;
    app
      .db("cliente AS c")
      .first()
      .where("c.id", id)
      .join("endereco AS e", "e.id", "=", "c.enderecoId")
      .select(
        "c.id",
        "c.nome",
        "c.telefone",
        "c.cpf",
        "c.email",
        "e.id as enderecoId",
        "e.cep",
        "e.bairro",
        "e.rua",
        "e.numero",
        "e.cidade",
        "e.estado"
      )
      .then((cliente) => {
        try {
          existsOrError(cliente, "Nenhum cliente encontrado!");
          res.status(200).json(cliente);
        } catch (msg) {
          return res.status(400).send(msg);
        }
      })
      .catch((err) => res.status(500).send(err));
  };

  const remove = async (req, res) => {
    try {
      const clienteVenda = await app
        .db("venda")
        .where({ clienteId: req.params.id });
      notExistsOrError(
        clienteVenda,
        "Venda ja foi cadastrada com esse Cliente."
      );

      const rowsDeleted = await app
        .db("cliente")
        .where({ id: req.params.id })
        .del();

      try {
        existsOrError(rowsDeleted, "Cliente não foi encontrado.");
      } catch (msg) {
        return res.status(400).send(msg);
      }

      res.status(204).send();
    } catch (msg) {
      res.status(500).send(msg);
    }
  };

  return { save, get, remove, getById };
};
