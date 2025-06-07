"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTableRoutes = void 0;
const express_1 = require("express");
const tableController_1 = require("../controllers/tableController");
function setTableRoutes(app) {
    const router = (0, express_1.Router)();
    const tableController = new tableController_1.TableController();
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
exports.setTableRoutes = setTableRoutes;
