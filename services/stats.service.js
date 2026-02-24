const Usuario = require('../models/usuario');
const Ticket = require('../models/ticket');

class StatsService {
    //METODO PARA OBTENER ESTADISTICAS
    async getStats() {
        //Obtener cantidades de usuarios y tickets pagados
        const usuarios = await Usuario.countDocuments();
        const tickets = await Ticket.countDocuments({ estado: 'PAGADO' });
        //Obtener cantidad total de articulos en tickets pagados
        const articulosVendidos = await Ticket.aggregate([
            { $match: { estado: 'PAGADO' } },
            { $unwind: '$detalles_ticket' },
            { $group: { _id:null, total: { $sum: '$detalles_ticket.cantidad' } } }
        ]);
        return {
            usuarios,
            tickets,
            vendidos: articulosVendidos[0]?.total || 0
        };
    };

};//STATSSERVICE

module.exports = new StatsService();