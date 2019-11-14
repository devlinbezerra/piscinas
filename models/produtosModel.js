const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'É necessário informar o nome do produto']
  },
  qtde: {
    type: Number,
    required: [true, 'É necessário informar a quantidade do produto']
  },
  unidade: {
    type: String,
    required: [true, 'É necessário informar a unidade de medida']
  },
  funcao: String,
  frequencia: String,
  proporcao: {
    litros: Number,
    produto: Number
  },
  valor: {
    type: Number
  },
  valorUnitario: {
    type: Number,
    required: [true, 'É necessário infomar o valor para cada medida do produto']
  }
});

const Produtos = mongoose.model('Produtos', produtoSchema);

module.exports = Produtos;
