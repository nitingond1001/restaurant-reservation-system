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
exports.setAuthRoutes = void 0;
const authController_1 = __importDefault(require("../controllers/authController"));
const userModel_1 = __importDefault(require("../models/userModel")); // adjust path as needed
const authController = new authController_1.default();
function setAuthRoutes(app) {
    // Registration form (GET)
    app.get('/register', (_req, res) => {
        res.render('register');
    });
    // Login form (GET)
    app.get('/login', (_req, res) => {
        res.render('login');
    });
    // Registration handler (POST)
    app.post('/register', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, email, password } = req.body;
            // Basic validation
            if (!username || !email || !password) {
                return res.status(400).send('All fields are required.');
            }
            // Check if user exists
            const existing = yield userModel_1.default.findOne({ email });
            if (existing) {
                return res.status(409).send('User already exists.');
            }
            // Create user
            const user = new userModel_1.default({ username, email, password });
            yield user.save();
            res.redirect('/login');
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Registration failed.');
        }
    }));
    app.post('/login', authController.loginUser.bind(authController));
    app.post('/logout', authController.logoutUser.bind(authController));
}
exports.setAuthRoutes = setAuthRoutes;
