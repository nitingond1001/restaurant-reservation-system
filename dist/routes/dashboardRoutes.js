"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
import { Router } from "express";
const authController_1 = __importDefault(require("../controllers/authController"));
const router = (0, Router)();
const authController = new authController_1.default();
// User Dashboard Routes
router.get('/user/dashboard', authController.authenticate, (req, res) => {
    res.render('userDashboard', { user: req.user });
});
// Admin Dashboard Routes
router.get('/admin/dashboard', authController.authenticate, (req, res) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === 'admin') {
        res.render('adminDashboard', { user: req.user });
    }
    else {
        res.status(403).send('Access denied');
    }
});
const setDashboardRoutes = (app) => {
    app.use('/dashboard', router);
};
const _setDashboardRoutes = setDashboardRoutes;
export { _setDashboardRoutes as setDashboardRoutes };
