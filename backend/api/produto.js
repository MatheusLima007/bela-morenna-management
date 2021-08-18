module.exports = (app) => {
  const { existsOrError, notExistsOrError } = app.api.validation;

  const save = async (req, res) => {
    const produtoBody = { ...req.body };

    const produto = {
      id: produtoBody.id,
      descricao: produtoBody.descricao.toUpperCase(),
      quantidade: produtoBody.quantidade,
      marca: produtoBody.marca.toUpperCase(),
      tamanhoId: produtoBody.tamanhoId,
    };

    if (req.params.id) produto.id = req.params.id;

    try {
      existsOrError(produto.descricao, "Descrição não informada!");
      existsOrError(produto.quantidade, "Quantidade não informada!");
      existsOrError(produto.marca, "Marca de Pagamento não informada!");
      existsOrError(produto.tamanhoId, "Tamanho do Produto não informado!");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (produto.id) {
      app
        .db("produto")
        .update(produto)
        .where({ id: produto.id })
        .then((_) => res.status(200).json(produto))
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("produto")
        .insert(produto)
        .then((_) => res.status(201).json(produto))
        .catch((err) => res.status(500).send(err));
    }
  };

  const limit = 10;

  const get = async (req, res) => {
    const { order, mode } = req.query;
    const page = req.query.page || 1;

    const result = await app.db("produto").count("id").first();
    const count = parseInt(result.count);

    app
      .db({ p: "produto", t: "tamanho" })
      .select(
        "p.id",
        "p.descricao",
        "p.quantidade",
        "p.marca",
        "p.tamanhoId",
        "t.descricao as descricaoTamanho"
      )
      .whereRaw("?? = ??", ["t.id", "p.tamanhoId"])
      // .limit(limit)
      // .offset(page * limit - limit)
      .orderBy(order ? order : "id", mode ? mode : "desc")
      .then((produto) => res.json({ data: produto, count, limit }))
      .catch((err) => res.status(500).send(err));
  };

  const getById = async (req, res) => {
    const { id } = req.params;
    app
      .db("produto AS p")
      .first()
      .where("p.id", id)
      .join("tamanho AS t", "t.id", "=", "p.tamanhoId")
      .select("p.id", "p.descricao", "p.quantidade", "p.marca", "t.descricao")
      .then((produto) => {
        try {
          existsOrError(produto, "Nenhum produto encontrado!");
          res.status(200).json(produto);
        } catch (msg) {
          return res.status(400).send(msg);
        }
      })
      .catch((err) => res.status(500).send(err));
  };

  const remove = async (req, res) => {
    try {
      const produtoProdutoVenda = await app
        .db("produto_venda")
        .where({ produtoId: req.params.id });
      notExistsOrError(
        produtoProdutoVenda,
        "Venda ja foi cadastrada com esse Produto."
      );

      const produtoProdutoCompra = await app
        .db("produto_compra")
        .where({ produtoId: req.params.id });
      notExistsOrError(
        produtoProdutoCompra,
        "Compra ja foi cadastrada com esse Produto."
      );

      const rowsDeleted = await app
        .db("produto")
        .where({ id: req.params.id })
        .del();

      try {
        existsOrError(rowsDeleted, "Produto não foi encontrado.");
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
