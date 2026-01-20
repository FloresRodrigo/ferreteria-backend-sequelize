const usuarioService = require('../services/usuario.service');
const { success, failed } = require('../helpers/response.helper');

const usuarioCtrl = {};

//METODO PARA OBTENER TODOS LOS USUARIOS
usuarioCtrl.getUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.getUsuarios(req.query);
        return success(res, 'Lista de usuarios obtenidos', usuarios);
    } catch (error) {
        console.error('ERROR AL OBTENER USUARIOS: ', error);
        return failed(res, error.message);
    };
};

//METODO PARA OBTENER UN USUARIO (por req.user)
usuarioCtrl.getMyProfile = async (req, res) => {
    try {
        const usuario = await usuarioService.getUsuario(req.user.id);
        return success(res, 'Usuario obtenido', usuario);
    } catch (error) {
        console.error('ERROR AL OBTENER USUARIO: ', error);
        return failed(res, error.message);
    };
};

//METODO PARA OBTENER UN USUARIO (por req.params)
usuarioCtrl.getUsuario = async (req, res) => {
    try {
        const usuario = await usuarioService.getUsuario(req.params.id);
        return success(res, 'Usuario obtenido', usuario);
    } catch (error) {
        console.error('ERROR AL OBTENER USUARIO: ', error);
        return failed(res, error.message);
    };
};

//METODO PARA ACTUALIZAR EL PERFIL DE USUARIO
usuarioCtrl.updateMyProfile = async (req, res) => {
    try {
        await usuarioService.updateProfile(req.user.id, req.body);
        return success(res, 'Perfil actualizado');
    } catch (error) {
        console.error('ERROR AL ACTUALIZAR PERFIL: ', error);
        return failed(res, error.message);
    };
};

//METODO PARA CAMBIAR CONTRASEÑA
usuarioCtrl.changeMyPassword = async (req, res) => {
    try {
        await usuarioService.changePassword(req.user.id, req.body);
        return success(res, 'Contraseña cambiada');
    } catch (error) {
        console.error('ERROR AL CAMBIAR CONTRASEÑA: ', error);
        return failed(res, error.message);
    };  
};

//METODO PARA ACTUALIZAR USUARIO
usuarioCtrl.updateUsuario = async (req, res) => {
    try {
        await usuarioService.updateUsuario(req.params.id, req.body);
        return success(res, 'Usuario actualizado');
    } catch (error) {
        console.error('ERROR AL ACTUALIZAR USUARIO: ', error);
        return failed(res, error.message);
    }; 
};

//METODO PARA ELIMINAR UN USUARIO (logicamente)
usuarioCtrl.deleteUsuario = async (req, res) => {
    try {
        await usuarioService.deleteUsuario(req.user.id, req.params.id);
        return success(res, 'Usuario eliminado');
    } catch (error) {
        console.error('ERROR AL ELIMINAR USUARIO: ', error);
        return failed(res, error.message);
    }; 
};

module.exports = usuarioCtrl;