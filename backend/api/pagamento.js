module.exports = (app) => {
  const { existsOrError, notExistsOrError } = app.api.validation;

  const save = async (req, res) => {
    const pagamento = { ...req.body };

    // const pagamento = {
    //     id: pagamentoBody.id,
    //     precoTotal: pagamentoBody.precoTotal,
    //     parcela: pagamentoBody.parcela,
    //     tipoPagamentoId: pagamentoBody.tipoPagamentoId,
    // }

    if (req.params.id) pagamento.id = req.params.id;

    try {
      existsOrError(pagamento.precoTotal, "Preço Total não informado!");
      existsOrError(pagamento.parcela, "Parcela não informada!");
      existsOrError(
        pagamento.tipoPagamentoId,
        "Tipo de Pagamento não informado!"
      );
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (pagamento.id) {
      app
        .db("pagamento")
        .update(pagamento)
        .where({ id: pagamento.id })
        .then(() => returnData())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("pagamento")
        .insert(pagamento)
        .then(() => returnData())
        .catch((err) => res.status(500).send(err));
    }

    const returnData = async () => {
      const enderecoFromDB = await app
        .db("pagamento")
        .where({
          precoTotal: pagamento.precoTotal,
          parcela: pagamento.parcela,
          tipoPagamentoId: pagamento.tipoPagamentoId,
        })
        .orderBy("id", "desc")
        .first();
      res.status(200).json(enderecoFromDB);
    };
  };

  const limit = 10;

  const get = async (req, res) => {
    const page = req.query.page || 1;

    const result = await app.db("pagamento").count("id").first();
    const count = parseInt(result.count);

    app
      .db({ p: "pagamento", t: "tipo_pagamento" })
      .select(
        "p.id",
        "p.precoTotal",
        "p.parcela",
        "t.id as tipoPagamentoId",
        "t.descricao"
      )
      .whereRaw("?? = ??", ["p.tipoPagamentoId", "t.id"])
      .limit(limit)
      .offset(page * limit - limit)
      .orderBy("id")
      .then((pagamento) => res.json({ data: pagamento, count, limit }))
      .catch((err) => res.status(500).send(err));
  };

  const remove = async (req, res) => {
    try {
      const pagamentoVenda = await app
        .db("venda")
        .where({ pagamentoId: req.params.id });
      notExistsOrError(
        pagamentoVenda,
        "Venda ja foi cadastrada com esse pagamento."
      );

      const pagamentoCompra = await app
        .db("compra")
        .where({ pagamentoId: req.params.id });
      notExistsOrError(
        pagamentoCompra,
        "Compra ja foi cadastrada com esse pagamento."
      );

      const rowsDeleted = await app
        .db("pagamento")
        .where({ id: req.params.id })
        .del();

      try {
        existsOrError(rowsDeleted, "Pagamento não foi encontrado.");
      } catch (msg) {
        return res.status(400).send(msg);
      }

      res.status(204).send();
    } catch (msg) {
      res.status(500).send(msg);
    }
  };

  return { save, get, remove };
};
