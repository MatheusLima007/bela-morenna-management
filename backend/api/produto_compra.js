module.exports = (app) => {
  const { existsOrError, notExistsOrError } = app.api.validation;

  const save = async (req, res) => {
    const produtoCompraBody = { ...req.body };
    //TIRAR TAMANHO MIGRATION
    const produtoCompra = {
      id: produtoCompraBody.id,
      quantidade: produtoCompraBody.quantidade,
      produtoId: produtoCompraBody.produtoId,
      tamanhoId: produtoCompraBody.tamanhoId,
      compraId: produtoCompraBody.compraId,
    };

    if (req.params.id) produtoCompra.id = req.params.id;

    try {
      existsOrError(produtoCompra.quantidade, "Quantidade não informada!");
      existsOrError(produtoCompra.produtoId, "Produto não informado!");
      existsOrError(produtoCompra.tamanhoId, "Tamanho não informado!");
      existsOrError(produtoCompra.compraId, "Venda não informada!");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (produtoCompra.id) {
      app
        .db("produto_compra")
        .update(produtoCompra)
        .where({ id: produtoCompra.id })
        .then((_) => res.status(200).json(produtoCompra))
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("produto_compra")
        .insert(produtoCompra)
        .then((_) => res.status(201).json(produtoCompra))
        .catch((err) => res.status(500).send(err));
    }
  };

  const limit = 10;

  const get = async (req, res) => {
    const { order, mode } = req.query;
    const page = req.query.page || 1;

    const result = await app.db("produto_compra").count("id").first();
    const count = parseInt(result.count);

    app
      .db({
        pc: "produto_compra",
        p: "produto",
        t: "tamanho",
        c: "compra",
        f: "fornecedor",
        u: "usuario",
        pg: "pagamento",
      })
      .select(
        "pc.id",
        "pc.quantidade",
        "p.id as produtoId",
        "p.descricao as produtoDescricao",
        "t.id as tamanhoId",
        "t.descricao  as tamanhoDescricao",
        "c.id as compraId",
        "c.data",
        "f.id as fornecedorId",
        "f.nome as nomeFornecedor",
        "u.id as usuarioId",
        "u.nome as nomeUsuario",
        "pg.id as pagamentoId",
        "pg.precoTotal",
        "pg.parcela",
        "pg.tipoPagamentoId"
      )
      .whereRaw("?? = ??", ["pc.produtoId", "p.id"])
      .whereRaw("?? = ??", ["pc.tamanhoId", "t.id"])
      .whereRaw("?? = ??", ["pc.compraId", "c.id"])
      .whereRaw("?? = ??", ["c.fornecedorId", "f.id"])
      .whereRaw("?? = ??", ["c.usuarioId", "u.id"])
      .whereRaw("?? = ??", ["c.pagamentoId", "pg.id"])
      .limit(limit)
      .offset(page * limit - limit)
      .orderBy(order ? order : "id", mode ? mode : "desc")
      .then((produtoCompra) => res.json({ data: produtoCompra, count, limit }))
      .catch((err) => res.status(500).send(err));
  };

  const getById = async (req, res) => {
    const { id } = req.params;
    app
      .db("produto_compra AS pc")
      .first()
      .where("pc.id", id)
      .join("produto      AS p", "p.id", "=", "pc.produtoId")
      .join("tamanho      AS t", "t.id", "=", "pc.tamanhoId")
      .join("compra       AS c", "c.id", "=", "pc.compraId")
      .join("fornecedor   AS f", "f.id", "=", "c.fornecedorId")
      .join("usuario      AS u", "u.id", "=", "c.usuarioId")
      .join("pagamento    AS pg", "pg.id", "=", "c.pagamentoId")
      .select(
        "pc.id",
        "pc.quantidade",
        "p.descricao as produtoDescricao",
        "t.descricao  as tamanhoDescricao",
        "c.data",
        "f.nome as nomeFornecedor",
        "u.nome as nomeUsuario",
        "pg.precoTotal"
      )
      .then((produtoCompra) => {
        try {
          existsOrError(produtoCompra, "Nenhum compra de produto encontrado!");
          res.status(200).json(produtoCompra);
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
        .db("produto_compra")
        .where({ id: req.params.id })
        .del();

      try {
        existsOrError(rowsDeleted, "Compra do produto não foi encontrada.");
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
