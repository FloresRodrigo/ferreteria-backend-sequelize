const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Usuario = sequelize.define('Usuario', {
    nombre_completo: { type: DataTypes.STRING(40), allowNull: false, validate: { len: [8, 40] } },
    username: { type: DataTypes.STRING(20), allowNull: false, unique: true, validate: { len: [4, 20] } },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING(60), allowNull: true },
    rol: { type: DataTypes.ENUM('ADMIN', 'CLIENTE'), allowNull: false, defaultValue: 'CLIENTE' },
    estado: { type: DataTypes.ENUM('ACTIVO', 'INACTIVO'), allowNull: false, defaultValue: 'ACTIVO' },
    lastLogin: { type: DataTypes.DATE },
    deleteRequestedAt: { type: DataTypes.DATE },
    resetPasswordToken: { type: DataTypes.STRING },
    resetPasswordExpiration: { type: DataTypes.DATE },
    passwordChangedAt: { type: DataTypes.DATE },
    isGoogle: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
}, { tableName: 'usuarios', timestamps: true });

module.exports = Usuario;