const express = require('express');
const mercadopagoCtrl = require('../controllers/mercadopago.controller');

const router = express.Router();

//Ruta para recibir el webhook de mercado pago
router.post('/', mercadopagoCtrl.pago);

module.exports = router;