import { Schema, model } from 'mongoose';

const reservationSchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    table: {
        type: Schema.Types.ObjectId,
        ref: 'Table',
        required: true
    }
}, { timestamps: true });

const Reservation = model('Reservation', reservationSchema);

export default Reservation;