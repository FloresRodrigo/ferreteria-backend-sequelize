const { failed } = require('../helpers/response.helper');

function adminMiddleware(req, res, next) {
    if(!req.user) {
        return failed(res, 'No inicio sesion');
    };
    if(req.user.rol !== 'ADMIN') {
        return failed(res, 'Acceso denegado, no tiene el rol de administrador');
    };
    next();
};

module.exports = adminMiddleware;