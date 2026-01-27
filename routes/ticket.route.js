const express = require('express');
const ticketCtrl = require('../controllers/ticket.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');

const router = express.Router();

//RUTAS PARA USUARIOS
//Obtener tickets del usuario logeado
router.get('/my-tickets', authMiddleware, ticketCtrl.getMyTickets);
//Obtener un ticket del usuario logeado
router.get('/my-tickets/:id', authMiddleware, ticketCtrl.getMyTicket);
//Crear un ticket
router.post('/', authMiddleware, ticketCtrl.createTicket);
//Cancelar un ticket
router.put('/cancelar/:id', authMiddleware, ticketCtrl.cancelarTicket);

//RUTAS PARA ADMIN
//Obtener todos los tickets
router.get('/', authMiddleware, adminMiddleware, ticketCtrl.getTickets);
//Obtener cualquier ticket
router.get('/:id', authMiddleware, adminMiddleware, ticketCtrl.getTicket);

module.exports = router;