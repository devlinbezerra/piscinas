const Clientes = require('./../models/clientesModel');

exports.inserirCliente = async (req, res) => {
  try {
    const cliente = await Clientes.create(req.body);

    res.status(201).json({
      status: 'Success',
      data: { cliente }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
