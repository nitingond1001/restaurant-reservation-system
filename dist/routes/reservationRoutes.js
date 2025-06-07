"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reservationController_1 = require("../controllers/reservationController");
const reservationController = new reservationController_1.ReservationController();
function setReservationRoutes(app) {
    app.post('/reservations', reservationController.createReservation);
    app.get('/reservations/user/:userId', reservationController.getUserReservations);
    app.put('/reservations/:reservationId', reservationController.modifyReservation);
    app.delete('/reservations/:reservationId', reservationController.cancelReservation);
}
exports.default = setReservationRoutes;
