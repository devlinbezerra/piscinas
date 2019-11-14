const express = require('express');
const router = express.Router();
const produtos = require('./../controllers/produtos');

router.route('/:litros/:plano/:km').get(produtos.calcularCusto);

router
  .route('/')
  .post(produtos.criarProduto)
  .get(produtos.teste);

module.exports = router;
