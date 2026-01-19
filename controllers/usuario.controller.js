const usuarioService = require('../services/usuario.service');
const { success, failed } = require('../helpers/response.helper');

const usuarioCtrl = {};

usuarioCtrl.getUsuarios = async (req, res) => {
    const usuarios = await usuarioService.getUsuarios();
    return success(res, 'Lista de usuarios obtenidos', usuarios);
};

module.exports = usuarioCtrl;