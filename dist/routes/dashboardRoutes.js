"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDashboardRoutes = void 0;
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const userModel_1 = __importDefault(require("../models/userModel")); // Adjust the path if needed
const router = (0, express_1.Router)();
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
function setDashboardRoutes(app) {
    app.get('/admin/users', (_req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield userModel_1.default.find();
            res.render('users', { users });
        }
        catch (err) {
            res.status(500).send('Error fetching users');
        }
    }));
}
exports.setDashboardRoutes = setDashboardRoutes;
