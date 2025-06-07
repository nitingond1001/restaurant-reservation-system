"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tableSchema = new mongoose_1.Schema({
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
const Table = (0, mongoose_1.model)('Table', tableSchema);
exports.default = Table;
