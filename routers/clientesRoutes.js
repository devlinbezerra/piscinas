const express = require('express');
const router = express.Router();
const clientes = require('./../controllers/clientes');

router.route('/').post(clientes.inserirCliente);

module.exports = router;
