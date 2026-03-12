const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Ticket = sequelize.define('Ticket', {
    id_cliente: { type: DataTypes.INTEGER, allowNull: false },
    fecha_compra: { type: DataTypes.DATE },
    total: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
    estado: { type: DataTypes.ENUM('PENDIENTE', 'PAGADO', 'CANCELADO'), allowNull: false, defaultValue: 'PENDIENTE' },
}, { tableName: 'tickets', timestamps: true });

module.exports = Ticket;