"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import { ReservationController } from "../controllers/reservationController";
const reservationController = new ReservationController();
function setReservationRoutes(app) {
    app.post('/reservations', reservationController.createReservation);
    app.get('/reservations/user/:userId', reservationController.getUserReservations);
    app.put('/reservations/:reservationId', reservationController.modifyReservation);
    app.delete('/reservations/:reservationId', reservationController.cancelReservation);
}
const _default = setReservationRoutes;
export { _default as default };
