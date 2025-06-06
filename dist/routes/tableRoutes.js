"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import { Router } from "express";
import { TableController } from "../controllers/tableController";
function setTableRoutes(app) {
    const router = (0, Router)();
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
const _setTableRoutes = setTableRoutes;
export { _setTableRoutes as setTableRoutes };
