import { Router } from 'express';
import { TableController } from '../controllers/tableController';
import { Application } from 'express';


export function setTableRoutes(app: Application): void {
    const router = Router();
    const tableController = new TableController();

    router.get('/availability', (req, res) => {
        const { date, time, guests } = req.query;
        if (typeof date !== 'string' || typeof time !== 'string' || typeof guests !== 'string') {
            return res.status(400).json({ error: 'Missing or invalid query parameters' });
        }
        const availableTables = tableController.checkTableAvailability(date, time, parseInt(guests, 10));
        res.json(availableTables);
    });
    router.post('/add', tableController.addTable.bind(tableController));

    app.use('/api/tables', router);
}