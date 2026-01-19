const Usuario = require('../models/usuario');

class UsuarioService {
    async getUsuarios() {
        const usuarios = await Usuario.find();
        return usuarios;
    };
};

module.exports = new UsuarioService();