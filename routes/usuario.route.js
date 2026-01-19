const express = require('express');
const usuarioCtrl = require('../controllers/usuario.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');

const router = express.Router();

router.get('/', authMiddleware, adminMiddleware, usuarioCtrl.getUsuarios);

module.exports = router;