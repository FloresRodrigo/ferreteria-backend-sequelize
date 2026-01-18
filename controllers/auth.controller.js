const authService = require('../services/auth.service');
const { success, failed } = require('../helpers/response.helper');

const authCtrl = {};

//METODO DE REGISTRO
authCtrl.register = async (req, res) => {
    try {
        const usuario = await authService.register(req.body);
        return success(res, 'Usuario creado exitosamente', usuario);
    } catch (error) {
        console.error('ERROR EN EL REGISTRO: ', error);
        return failed(res, error.message);
    };
};

//METODO DE LOGIN
authCtrl.login = async (req, res) => {
    try {
        const usuario = await authService.login(req.body);
        return success(res, 'Login exitoso', usuario);
    } catch (error) {
        console.error('ERROR EN EL LOGIN: ', error);
        return failed(res, error.message);
    };
};

module.exports = authCtrl;