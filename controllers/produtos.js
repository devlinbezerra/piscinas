const Produtos = require('./../models/produtosModel');

exports.criarProduto = async (req, res) => {
  try {
    const produto = await Produtos.create(req.body);

    res.status(201).json({
      status: 'Success',
      data: { produto }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.calcularCusto = async (req, res) => {
  let aplicacoes;
  let custo;

  if (req.params.plano === 'avulso') {
    aplicacoes = 1;
  } else if (req.params.plano === 'mensal') {
    aplicacoes = 4;
  } else if (req.params.plano === 'trimestral') {
    aplicacoes = 12;
  } else if (req.params.plano === 'semestral') {
    aplicacoes = 24;
  } else if (req.params.plano === 'anual') {
    aplicacoes = 48;
  }

  //Custo do Sulfato
  const sulfato = await Produtos.findOne({ nome: /Sulfato/ });
  const qtdeSulfato =
    aplicacoes *
    sulfato.proporcao.produto *
    (req.params.litros / sulfato.proporcao.litros);
  const custoSulfato = sulfato.valorUnitario * qtdeSulfato;
  //Custo do Cloro
  const cloro = await Produtos.findOne({ nome: /Cloro/ });
  const qtdeCloro =
    aplicacoes *
    cloro.proporcao.produto *
    (req.params.litros / cloro.proporcao.litros);
  const custoCloro = cloro.valorUnitario * qtdeCloro;

  //Custo da Barrilha
  const barrilha = await Produtos.findOne({ nome: /Barrilha/ });
  const qtdeBarrilha =
    aplicacoes *
    barrilha.proporcao.produto *
    (req.params.litros / barrilha.proporcao.litros);
  const custoBarrilha = barrilha.valorUnitario * qtdeBarrilha;

  //Custo do Combustível
  const combustivel = await Produtos.findOne({ nome: /Etanol/ });
  const custoCombustivel = (combustivel.valorUnitario / 8) * req.params.km;

  res.status(200).json({
    Sulfato: {
      quantidade: qtdeSulfato.toFixed(0),
      valor: custoSulfato.toFixed(2)
    },
    Cloro: {
      quantidade: qtdeCloro.toFixed(0),
      valor: custoCloro.toFixed(2)
    },
    Barrilha: {
      quantidade: qtdeBarrilha.toFixed(0),
      valor: custoBarrilha.toFixed(2)
    },
    Combustivel: custoCombustivel.toFixed(2),
    custoTotal: (
      custoSulfato +
      custoCloro +
      custoBarrilha +
      custoCombustivel
    ).toFixed(2)
  });
};

exports.teste = async (req, res) => {
  const teste = await Produtos.findOne({ nome: /Sulfato/ });
  return res.status(200).json({ teste });
};
