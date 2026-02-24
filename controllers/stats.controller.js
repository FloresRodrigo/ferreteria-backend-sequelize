const statsService = require('../services/stats.service');
const { success, failed } = require('../helpers/response.helper');

const statsCtrl = {};

//METODO PARA OBTENER ESTADISTICAS
statsCtrl.getStats = async (req, res) => {
    try {
        const stats = await statsService.getStats();
        return success(res, 'Estadisticas obtenidas', stats);
    } catch (error) {
        console.error('ERROR AL OBTENER ESTADISTICAS: ', error);
        return failed(res, error.message);
    };
};

module.exports = statsCtrl;