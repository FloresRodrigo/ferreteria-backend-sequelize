const express = require('express');
const statsCtrl = require('../controllers/stats.controller');

const router = express.Router();

//Ruta para obtener estadisticas (usuarios, tickets, articulos)
router.get('/', statsCtrl.getStats);

module.exports = router;