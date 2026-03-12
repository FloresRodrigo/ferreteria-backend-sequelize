const { Usuario, Ticket, DetalleTicket } = require('../models');

class StatsService {
    //METODO PARA OBTENER ESTADISTICAS
    async getStats() {
        //Obtener cantidades de usuarios, tickets pagados, y articulos vendidos
        const [usuarios, tickets, vendidos] = await Promise.all([
            Usuario.count(),
            Ticket.count({
                where: { estado: 'PAGADO' }
            }),
            DetalleTicket.sum('cantidad', {
                include: [{
                    model: Ticket,
                    where: { estado: 'PAGADO' },
                    attributes: []
                }]
            })
        ]);
        return {
            usuarios,
            tickets,
            vendidos: vendidos || 0
        };
    };

};//STATSSERVICE

module.exports = new StatsService();