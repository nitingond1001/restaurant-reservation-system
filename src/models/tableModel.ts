import { Schema, model } from 'mongoose';

const tableSchema = new Schema({
    tableNumber: {
        type: Number,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'reserved', 'maintenance'],
        default: 'available'
    }
});

const Table = model('Table', tableSchema);

export default Table;