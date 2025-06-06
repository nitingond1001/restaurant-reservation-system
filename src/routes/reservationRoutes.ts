import { Router } from 'express';
import { ReservationController } from '../controllers/reservationController';

const reservationController = new ReservationController();

export default function setReservationRoutes(app: Router) {
    app.post('/reservations', reservationController.createReservation);
    app.get('/reservations/user/:userId', reservationController.getUserReservations);
    app.put('/reservations/:reservationId', reservationController.modifyReservation);
    app.delete('/reservations/:reservationId', reservationController.cancelReservation);
}