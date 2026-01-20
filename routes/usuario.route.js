const express = require('express');
const usuarioCtrl = require('../controllers/usuario.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');

const router = express.Router();

//RUTAS PARA USUARIOS
//Obtener perfil logeado
router.get('/perfil', authMiddleware, usuarioCtrl.getMyProfile);
//Actualizar perfil logeado
router.put('/perfil', authMiddleware, usuarioCtrl.updateMyProfile);
//Cambiar contraseña logeada
router.put('/perfil/password', authMiddleware, usuarioCtrl.changeMyPassword);

//RUTAS PARA ADMIN
//Obtener todos los usuarios
router.get('/', authMiddleware, adminMiddleware, usuarioCtrl.getUsuarios);
//Obtener un usuario
router.get('/:id', authMiddleware, adminMiddleware, usuarioCtrl.getUsuario);
//Actualizar un usuario
router.put('/:id', authMiddleware, adminMiddleware, usuarioCtrl.updateUsuario);
//Borrar logicamente un usuario
router.delete('/:id', authMiddleware, adminMiddleware, usuarioCtrl.deleteUsuario);

module.exports = router;