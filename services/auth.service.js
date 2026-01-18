const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
    //METODO PARA REGISTRAR
    async register({ nombre_completo, username, email, password }) {
        //VALIDACIONES
        //Validar que lleguen datos
        if(!nombre_completo || !username || !email || !password) {
            throw new Error('Datos invalidos'); 
        };
        //Validar longitudes
        if(nombre_completo.length < 8 || nombre_completo.length > 40) {
            throw new Error('El nombre debe tener entre 8 y 40 caracteres');
        };
        if(username.length < 4 || username.length > 20) {
            throw new Error('El username debe tener entre 4 y 20 caracteres');
        };
        if(password.length < 8 || password.length > 20) {
            throw new Error('La contraseña debe tener entre 8 y 20 caracteres');
        };
        //Validar username
        if(!/^[A-Za-z0-9]+$/.test(username)) {
            throw new Error('El username solo puede tener letras y numeros');
        };
        //Validar email
        if(!/.+\@.+\..+/.test(email)) {
            throw new Error('Formato de email invalido');
        };
        //Validar que no esten ocupados el username o el email
        const usernameExists = await Usuario.findOne({ username: username });
        const emailExists = await Usuario.findOne({ email: email })
        if(usernameExists) {
            throw new Error('Username ya registrado');
        };
        if(emailExists) {
            throw new Error('Email ya registrado');
        };
        //Crear usuario con contraseña hasheada
        const hashedPassword = await bcrypt.hash(password, 10);
        const usuario = await Usuario.create({
            nombre_completo: nombre_completo,
            username: username,
            email: email,
            password: hashedPassword
        });
        return {
            id: usuario._id,
            username: usuario.username,
            email: usuario.email
        };
    };

    //METODO PARA LOGIN
    async login({ login, password }) {
        //Validar que lleguen datos
        if(!login || !password) {
            throw new Error('Datos invalidos');
        };
        //Buscar usuario por username o email
        const usuario = await Usuario.findOne({
            $or: [
                { username: login },
                { email: login }
            ]
        });
        if(!usuario) {
            throw new Error('Login invalido');
        };
        //Verificar password
        const match = await bcrypt.compare(password, usuario.password);
        if(!match) {
            throw new Error('La contraseña es incorrecta');
        };
        //Firma del JWT con id y rol
        const token = jwt.sign(
            {
                id: usuario._id,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION || '2hr' }
        );
        return {
            id: usuario._id,
            username: usuario.username,
            email: usuario.email,
            token: token
        };
    };
};

module.exports = new AuthService();