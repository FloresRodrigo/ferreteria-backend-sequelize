const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const DetalleTicket = sequelize.define('DetalleTicket', {
    id_articulo: { type: DataTypes.INTEGER, allowNull: false },
    id_ticket: { type: DataTypes.INTEGER, allowNull: false },
    nombre_articulo: { type: DataTypes.STRING(40), allowNull: false, validate: { len: [3, 40] } },
    precio_unitario: { type: DataTypes.DECIMAL(10,2), allowNull: false, validate: { min: 0 } },
    cantidad: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
    subtotal: { type: DataTypes.DECIMAL(10,2), allowNull: false, validate: { min: 0 } }
}, { tableName: 'detalle_tickets', timestamps: true, indexes: [ { unique: true, fields: ['id_ticket', 'id_articulo'] } ] });

module.exports = DetalleTicket;