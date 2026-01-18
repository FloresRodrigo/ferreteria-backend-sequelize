const express = require('express');
const authCtrl = require('../controllers/auth.controller');

const router = express.Router();

//Ruta para el registro
router.post('/register', authCtrl.register);
//Ruta para el login
router.get('/login', authCtrl.login);

module.exports = router;