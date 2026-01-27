const mongoose = require('mongoose');
const DetalleTicket = require('./detalleTicket');
const Contador = require('./contador');

const { Schema } = mongoose;
const estados = ['PENDIENTE', 'PAGADO', 'CANCELADO'];

const TicketSchema = new Schema({
    nro_ticket: { type: Number, required: true, min: 0, unique: true},
    id_cliente: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    fecha_compra: { type: Date },
    total: { type: Number, required: true, min: 0 },
    estado: {
        type: String,
        enum: estados,
        default: 'PENDIENTE'
    },
    detalles_ticket: [{ type: DetalleTicket.schema }]
}, { timestamps: true });

//Para asignar el total automaticamente
TicketSchema.pre('validate', function() {
    if (this.detalles_ticket && this.detalles_ticket.length > 0) {
        this.total = this.detalles_ticket.reduce((total, detalle) => {
            return total + (detalle.precio_unitario * detalle.cantidad);
        }, 0);
    } else {
        this.total = 0;
    }
});

//Para asignar el numero de ticket automaticamente
TicketSchema.pre('validate', async function() {
    if(this.isNew) {
        const contador = await Contador.findByIdAndUpdate(
            'ticket',
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.nro_ticket = contador.seq;
    }
});

module.exports = mongoose.models.Ticket || mongoose.model('Ticket', TicketSchema);