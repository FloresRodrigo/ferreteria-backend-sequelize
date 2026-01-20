const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

class UsuarioService {
    //METODO PARA OBTENER TODOS LOS USUARIOS
    async getUsuarios({ nombre_completo, username, email, estado }) {
        const filter = {};
        if(nombre_completo && nombre_completo.trim() !== '') {
            filter.nombre_completo = { $regex: nombre_completo.trim(), $options: 'i' };
        };
        if(username && username.trim() !== '') {
            filter.username = { $regex: username.trim(), $options: 'i' };
        };
        if(email && email.trim() !== '') {
            filter.email = { $regex: email.trim(), $options: 'i' };
        };
        if(estado && (estado === 'ACTIVO' || estado === 'INACTIVO')) {
            filter.estado = estado;
        };
        const usuarios = await Usuario.find(filter).select('-password -resetPasswordToken -resetPasswordExpiration');
        return usuarios;
    };

    //METODO PARA OBTENER UN USUARIO
    async getUsuario(id) {
        if(!id) {
            throw new Error('Debe ingresar un ID');
        };
        const usuario = await Usuario.findById(id).select('-password -resetPasswordToken -resetPasswordExpiration -deleteRequestedAt');
        if(!usuario) {
            throw new Error('No se encontro un usuario con ese ID');
        };
        return usuario;
    };

    //METODO PARA ACTUALIZAR EL PERFIL DE USUARIO
    async updateProfile(id, { nombre_completo, username, email }) {
        //Verificar ID y usuario
        if(!id) {
            throw new Error('Debe ingresar un ID');
        };
        const usuario = await Usuario.findById(id);
        if(!usuario) {
            throw new Error('No se encontro un usuario con ese ID');
        };
        //VALIDACIONES
        //Validar datos, si llega uno se valida y se actualiza
        if(nombre_completo) {
            if(nombre_completo.length < 8 || nombre_completo.length > 40) {
                throw new Error('El nombre debe tener entre 8 y 40 caracteres');
            };
            usuario.nombre_completo = nombre_completo;
        };
        if(username) {
            if(username.length < 4 || username.length > 20) {
                throw new Error('El username debe tener entre 4 y 20 caracteres');
            };
            if(!/^[A-Za-z0-9]+$/.test(username)) {
                throw new Error('El username solo puede tener letras y numeros');
            };
            const usernameExists = await Usuario.findOne({ username: username, _id: { $ne: id } });
            if(usernameExists) {
                throw new Error('Username ya registrado');
            };
            usuario.username = username;
        };
        if(email) {
            if(!/.+\@.+\..+/.test(email)) {
                throw new Error('Formato de email invalido');
            };
            const emailExists = await Usuario.findOne({ email: email, _id: { $ne: id } });
            if(emailExists) {
                throw new Error('Email ya registrado');
            };
            usuario.email = email;
        };
        if(!nombre_completo && !username && !email) {
            throw new Error('Ingrese al menos un campo');
        };
        await usuario.save();
    };

    //METODO PARA CAMBIAR CONTRASEÑA
    async changePassword(id, { actualPassword, newPassword, repeatNewPassword }) {
        //Verificar ID y usuario
        if(!id) {
            throw new Error('Debe ingresar un ID');
        };
        const usuario = await Usuario.findById(id);
        if(!usuario) {
            throw new Error('No se encontro un usuario con ese ID');
        };
        //Validar que lleguen datos
        if(!actualPassword || !newPassword || !repeatNewPassword) {
            throw new Error('Debe completar todos los campos');
        };
        //Verificar contraseña
        const match = await bcrypt.compare(actualPassword, usuario.password);
        if(!match) {
            throw new Error('La contraseña actual es incorrecta');
        };
        //Validar contraseña
        if(newPassword.length < 8 || newPassword.length > 20) {
            throw new Error('La contraseña debe tener entre 8 y 20 caracteres');
        };
        //Validar que coincida la nueva contraseña
        if(newPassword !== repeatNewPassword) {
            throw new Error('Las contraseñas no coinciden');
        };
        const samePassword = await bcrypt.compare(newPassword, usuario.password);
        if(samePassword) {
            throw new Error('La nueva contraseña no puede ser igual a la anterior');
        };
        //Hashear y asignar nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        usuario.password = hashedPassword;
        usuario.passwordChangedAt = new Date();
        await usuario.save();
    };

    //METODO PARA ACTUALIZAR USUARIO
    async updateUsuario(idTarget, { nombre_completo, username, email, password, estado }) {
        //Verificar ID
        if(!idTarget) {
            throw new Error('Debe ingresar un ID');
        };
        //Verificar usuario a modificar
        const usuario = await Usuario.findById(idTarget);
        if(!usuario) {
            throw new Error('El usuario objetivo no existe');
        };
        //Verificar que lleguen datos
        if(!nombre_completo || !username || !email) {
            throw new Error('Debe completar todos los datos');
        };
        //VALIDACIONES
        //Validar longitudes
        if(nombre_completo.length < 8 || nombre_completo.length > 40) {
            throw new Error('El nombre debe tener entre 8 y 40 caracteres');
        };
        //Validar username
        if(username.length < 4 || username.length > 20) {
            throw new Error('El username debe tener entre 4 y 20 caracteres');
        };
        if(!/^[A-Za-z0-9]+$/.test(username)) {
            throw new Error('El username solo puede tener letras y numeros');
        };
        //Validar email
        if(!/.+\@.+\..+/.test(email)) {
            throw new Error('Formato de email invalido');
        };
        //Validar que no esten ocupados el username o el email
        const usernameExists = await Usuario.findOne({ username: username, _id: { $ne: idTarget } });
        const emailExists = await Usuario.findOne({ email: email, _id: { $ne: idTarget } });
        if(usernameExists) {
            throw new Error('Username ya registrado');
        };
        if(emailExists) {
            throw new Error('Email ya registrado');
        };
        //Actualizacion
        usuario.nombre_completo = nombre_completo;
        usuario.username = username;
        usuario.email = email;
        //Cambiar contraseña solo si llega
        if(password) {
            if(password.length < 8 || password.length > 20) {
                throw new Error('La contraseña debe tener entre 8 y 20 caracteres');
            };
            const hashedPassword = await bcrypt.hash(password, 10);
            usuario.password = hashedPassword;
            usuario.passwordChangedAt = new Date();
        };
        //Cambiar estado solo si llega y es valido
        if(estado) {
            if(estado === 'ACTIVO') {
                usuario.estado = estado;
                usuario.deleteRequestedAt = undefined;
            };
        };
        await usuario.save();
    };

    //METODO PARA ELIMINAR UN USUARIO (logicamente)
    async deleteUsuario(idReq, idTarget) {
        //Verificar IDs
        if(!idReq || !idTarget) {
            throw new Error('IDs invalidos');
        };
        //Verificar usuario a eliminar
        const usuario = await Usuario.findById(idTarget);
        if(!usuario) {
            throw new Error('El usuario objetivo no existe');
        };
        //Verificar que no se elimine a si mismo
        if(idReq === usuario._id.toString()) {
            throw new Error('No puede eliminarse a si mismo');
        };
        //Verificar que no este ya inactivo
        if(usuario.estado === 'INACTIVO') {
            throw new Error('El usuario ya se encuentra inactivo');
        };
        usuario.estado = 'INACTIVO';
        usuario.deleteRequestedAt = new Date();
        await usuario.save();
    };

};//USUARIOSERVICE

module.exports = new UsuarioService();