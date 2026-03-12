const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Articulo = sequelize.define('Articulo', {
    nombre: { type: DataTypes.STRING(40), allowNull: false, validate: { len: [3, 40] } },
    descripcion: { type: DataTypes.STRING(200), allowNull: false, validate: { len: [10, 200] } },
    imagen: { type: DataTypes.STRING, allowNull: false },
    precio: { type: DataTypes.DECIMAL(10,2), allowNull: false, validate: { min: 0 } },
    stock: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 0 } },
    total_vendido: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    estado: { type: DataTypes.ENUM('ACTIVO', 'INACTIVO'), allowNull: false, defaultValue: 'ACTIVO' }
}, { tableName: 'articulos', timestamps: true });

module.exports = Articulo;