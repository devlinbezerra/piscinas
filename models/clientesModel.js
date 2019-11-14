const mongoose = require('mongoose');
const validator = require('validator');

const clientesSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Informe o seu E-mail'],
    validate: [validator.isEmail, 'É necessário informar um e-mail válido']
  },
  password: {
    type: String,
    required: [true, 'Informe uma senha']
  },
  nome: {
    type: String,
    required: [true, 'Informe o nome completo']
  },
  telefone: {
    prefixo: {
      type: Number,
      required: [true, 'Informe o prefixo de sua região']
    },
    numero: {
      type: String,
      required: [
        true,
        'Informe um número telefone de preferência com conta Whatsapp'
      ]
    }
  },
  endereco: {
    rua: String,
    numero: String,
    complemento: String,
    bairro: String,
    cep: String,
    cidade: String,
    estado: String,
    latitude: String,
    longitude: String
  },
  sexo: String,
  dataNascimento: Date,
  piscina: {
    litros: {
      type: Number,
      required: [true, 'Informe a capacidade em litros de sua piscina.']
    },
    tipo: {
      type: String,
      required: [true, 'Informe se sua piscina é de alvenaria, fibra ou vinil.']
    },
    filtroArea: {
      type: Boolean,
      required: [
        true,
        'Por favor informe se sua piscina tem filtro de area ou não.'
      ]
    }
  },
  manutencoes: Object
});

const Clientes = mongoose.model('Clientes', clientesSchema);

module.exports = Clientes;
