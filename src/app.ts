import express from 'express';
import bodyParser from 'body-parser';
import { setAuthRoutes } from './routes/authRoutes';
import setReservationRoutes from './routes/reservationRoutes';
import { setTableRoutes } from './routes/tableRoutes';
import { setDashboardRoutes } from './routes/dashboardRoutes';
import errorMiddleware from './middlewares/errorMiddleware';
import path from 'path';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Root route FIRST
app.get('/', (_req, res) => {
    res.render('index');
});

setAuthRoutes(app);
setReservationRoutes(app);
setTableRoutes(app);
setDashboardRoutes(app);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});