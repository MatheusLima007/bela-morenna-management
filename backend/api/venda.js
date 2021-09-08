module.exports = (app) => {
  const { existsOrError, notExistsOrError } = app.api.validation;

  const save = async (req, res) => {
    const vendaBody = { ...req.body };

    const venda = {
      id: vendaBody.id,
      data: vendaBody.data,
      clienteId: vendaBody.clienteId,
      usuarioId: vendaBody.usuarioId,
      pagamentoId: vendaBody.pagamentoId,
    };

    if (req.params.id) venda.id = req.params.id;

    try {
      existsOrError(venda.clienteId, "Cliente não informado!");
      existsOrError(venda.usuarioId, "Usuario não informado!");
      existsOrError(venda.pagamentoId, "Pagamento não informado!");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (venda.id) {
      app
        .db("venda")
        .update(venda)
        .where({ id: venda.id })
        .then(() => returnData())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("venda")
        .insert(venda)
        .then(() => returnData())
        .catch((err) => res.status(500).send(err));
    }

    const returnData = async () => {
      const enderecoFromDB = await app
        .db("venda")
        .where({
          clienteId: venda.clienteId,
          usuarioId: venda.usuarioId,
          pagamentoId: venda.pagamentoId,
        })
        .orderBy("id", "desc")
        .first();
      res.status(200).json(enderecoFromDB);
    };
  };

  const limit = 10;

  const get = async (req, res) => {
    const page = req.query.page || 1;

    const result = await app.db("venda").count("id").first();
    const count = parseInt(result.count);

    app
      .db({
        v: "venda",
        c: "cliente",
        u: "usuario",
        p: "pagamento",
        t: "tipo_pagamento",
      })
      .select(
        "v.id",
        "v.data",
        "c.nome as clienteNome",
        "u.nome as usuarioNome",
        "p.precoTotal",
        "t.descricao"
      )
      .whereRaw("?? = ??", ["v.clienteId", "c.id"])
      .whereRaw("?? = ??", ["v.usuarioId", "u.id"])
      .whereRaw("?? = ??", ["v.pagamentoId", "p.id"])
      .whereRaw("?? = ??", ["p.tipoPagamentoId", "t.id"])
      // .limit(limit)
      // .offset(page * limit - limit)
      .orderBy("id", "desc")
      .then((data) => res.json(data))
      .catch((err) => res.status(500).send(err));
  };

  const getById = async (req, res) => {
    const { id } = req.params;
    app
      .db("venda AS v")
      //.first()
      .where("v.id", id)
      .leftJoin("cliente AS c", "c.id", "=", "v.clienteId")
      .leftJoin("usuario AS u", "u.id", "=", "v.usuarioId")
      .leftJoin("pagamento AS pag", "pag.id", "=", "v.pagamentoId")
      .leftJoin("tipo_pagamento AS tp", "tp.id", "=", "pag.tipoPagamentoId")
      .leftJoin("produto_venda AS pv", "v.id", "pv.vendaId")
      .leftJoin("produto AS p", "pv.produtoId", "p.id")
      .leftJoin("tamanho AS t", "p.tamanhoId", "t.id")
      .select(
        "v.id",
        "v.data",
        "c.nome as clienteNome",
        "u.nome as usuarioNome",
        "pag.precoTotal",
        "tp.descricao as tipoPagamento",
        "pv.quantidade",
        "p.descricao as produto",
        "p.marca",
        "t.descricao as tamanho"
      )
      .then((venda) => {
        try {
          existsOrError(venda, "Nenhum venda encontrado!");
          res.status(200).json(venda);
        } catch (msg) {
          return res.status(400).send(msg);
        }
      })
      .catch((err) => res.status(500).send(err));
  };

  const remove = async (req, res) => {
    try {
      const vendaProdutoVenda = await app
        .db("produto_venda")
        .where({ vendaId: req.params.id });
      notExistsOrError(
        vendaProdutoVenda,
        "Venda ja foi cadastrada com esse Cliente."
      );

      const rowsDeleted = await app
        .db("venda")
        .where({ id: req.params.id })
        .del();

      try {
        existsOrError(rowsDeleted, "Venda não foi encontrada.");
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
