const express = require('express');
const articuloCtrl = require('../controllers/articulo.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const uploadMiddleware = require('../middlewares/upload.middleware');

const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, uploadMiddleware.single('imagen'), articuloCtrl.createArticulo);
router.get('/', authMiddleware, articuloCtrl.getArticulos);

module.exports = router;