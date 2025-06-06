import express from 'express';
import bodyParser from 'body-parser';
import { setAuthRoutes } from './routes/authRoutes';
import setReservationRoutes from './routes/reservationRoutes';
import { setTableRoutes } from './routes/tableRoutes';
import { setDashboardRoutes } from './routes/dashboardRoutes';
import errorMiddleware from './middlewares/errorMiddleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

setAuthRoutes(app);
setReservationRoutes(app);
setTableRoutes(app);
setDashboardRoutes(app);

app.get('/', (_req, res) => {
    res.send('Restaurant Reservation System is running!');
});

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});