"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import { Schema, model } from "mongoose";
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
const Table = (0, model)('Table', tableSchema);
const _default = Table;
export { _default as default };
