"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reservationSchema = new mongoose_1.Schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    numberOfGuests: {
        type: Number,
        required: true,
        min: 1
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    table: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Table',
        required: true
    }
}, { timestamps: true });
const Reservation = (0, mongoose_1.model)('Reservation', reservationSchema);
exports.default = Reservation;
