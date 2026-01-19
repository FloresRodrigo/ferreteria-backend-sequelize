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

//METODO DE RECUPERACION DE CONTRASEÑA
authCtrl.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if(!email) {
            return failed(res, 'Se necesita un email');
        };
        await authService.forgotPassword(email);
        return success(res, 'Se envio un correo para recuperar la contraseña', email);
    } catch (error) {
        console.error('ERROR EN RECUPERACION DE CONTRASEÑA: ', error);
        return failed(req, error.message);
    };
};

//METODO DE REINICIO DE CONTRASEÑA
authCtrl.resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        if(!token || !password) {
            return failed(res, 'Datos invalidos');
        };
        await authService.resetPassword(token, password);
        return success(res, 'Contraseña actualizada correctamente', password);
    } catch (error) {
        console.error('ERROR EN REINICIO DE CONTRASEÑA: ', error);
        return failed(res, error.message);
    }
};

module.exports = authCtrl;