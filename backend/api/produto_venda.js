module.exports = (app) => {
  const { existsOrError, notExistsOrError } = app.api.validation;

  const save = async (req, res) => {
    const produtoVendaBody = { ...req.body };
    //TIRAR TAMANHO MIGRATION
    const produtoVenda = {
      id: produtoVendaBody.id,
      quantidade: produtoVendaBody.quantidade,
      produtoId: produtoVendaBody.produtoId,
      tamanhoId: produtoVendaBody.tamanhoId,
      vendaId: produtoVendaBody.vendaId,
    };

    if (req.params.id) produtoVenda.id = req.params.id;

    try {
      existsOrError(produtoVenda.quantidade, "Quantidade não informada!");
      existsOrError(produtoVenda.produtoId, "Produto não informado!");
      existsOrError(produtoVenda.tamanhoId, "Tamanho não informado!");
      existsOrError(produtoVenda.vendaId, "Venda não informada!");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (produtoVenda.id) {
      app
        .db("produto_venda")
        .update(produtoVenda)
        .where({ id: produtoVenda.id })
        .then((_) => res.status(200).json(produtoVenda))
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("produto_venda")
        .insert(produtoVenda)
        .returning("*")
        .then((data) => res.status(201).json(data[0]))
        .catch((err) => res.status(500).send(err));
    }
  };

  const limit = 10;

  const get = async (req, res) => {
    const { order, mode } = req.query;
    const page = req.query.page || 1;

    const result = await app.db("produto_venda").count("id").first();
    const count = parseInt(result.count);

    app
      .db({
        pv: "produto_venda",
        p: "produto",
        t: "tamanho",
        v: "venda",
        c: "cliente",
        u: "usuario",
        pg: "pagamento",
      })
      .select(
        "pv.id",
        "pv.quantidade",
        "pv.data",
        "p.id as produtoId",
        "p.descricao as produtoDescricao",
        "t.id as tamanhoId",
        "t.descricao  as tamanhoDescricao",
        "v.id as vendaId",
        "v.data",
        "c.id as clienteId",
        "c.nome as nomeCliente",
        "u.id as usuarioId",
        "u.nome as nomeUsuario",
        "pg.id as pagamentoId",
        "pg.precoTotal",
        "pg.parcela",
        "pg.tipoPagamentoId"
      )
      .whereRaw("?? = ??", ["pv.produtoId", "p.id"])
      .whereRaw("?? = ??", ["pv.tamanhoId", "t.id"])
      .whereRaw("?? = ??", ["pv.vendaId", "v.id"])
      .whereRaw("?? = ??", ["v.clienteId", "c.id"])
      .whereRaw("?? = ??", ["v.usuarioId", "u.id"])
      .whereRaw("?? = ??", ["v.pagamentoId", "pg.id"])
      .limit(limit)
      .offset(page * limit - limit)
      .orderBy(order ? order : "id", mode ? mode : "desc")
      .then((produtoVenda) => res.json({ data: produtoVenda, count, limit }))
      .catch((err) => res.status(500).send(err));
  };

  const getById = async (req, res) => {
    const { id } = req.params;
    app
      .db("produto_venda AS pv")
      .first()
      .where("pv.id", id)
      .join("produto  AS p", "p.id", "=", "pv.produtoId")
      .join("tamanho  AS t", "t.id", "=", "pv.tamanhoId")
      .join("venda    AS v", "v.id", "=", "pv.vendaId")
      .join("cliente  AS c", "c.id", "=", "v.clienteId")
      .join("usuario  AS u", "u.id", "=", "v.usuarioId")
      .join("pagamento AS pg", "pg.id", "=", "v.pagamentoId")
      .select(
        "pv.id",
        "pv.quantidade",
        "pv.data",
        "p.descricao as produtoDescricao",
        "t.descricao  as tamanhoDescricao",
        "v.data",
        "c.nome as nomeCliente",
        "u.nome as nomeUsuario",
        "pg.precoTotal"
      )
      .then((produtoVenda) => {
        try {
          existsOrError(produtoVenda, "Nenhum venda de produto encontrado!");
          res.status(200).json(produtoVenda);
        } catch (msg) {
          return res.status(400).send(msg);
        }
      })
      .catch((err) => res.status(500).send(err));
  };

  const remove = async (req, res) => {
    try {
      // const compraProdutoVenda = await app.db('produto_compra')
      //     .where({ compraId: req.params.id })
      // notExistsOrError(compraProdutoVenda, 'Compra ja foi cadastrada com esse Cliente.')

      const rowsDeleted = await app
        .db("produto_venda")
        .where({ id: req.params.id })
        .del();

      try {
        existsOrError(rowsDeleted, "Venda do produto não foi encontrada.");
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
