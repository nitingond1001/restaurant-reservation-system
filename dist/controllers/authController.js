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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel"));
class AuthController {
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = req.body;
                if (!username || !email || !password) {
                    res.status(400).send("All fields are required.");
                    return;
                }
                const existing = yield userModel_1.default.findOne({ email });
                if (existing) {
                    res.status(409).send("User already exists.");
                    return;
                }
                // Hash the password
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                const user = new userModel_1.default({ name: username, email, password: hashedPassword });
                yield user.save();
                res.redirect('/login');
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Registration failed.");
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                // Allow login by name or email
                const user = yield userModel_1.default.findOne({
                    $or: [{ name: username }, { email: username }]
                });
                if (!user) {
                    res.status(401).send("Invalid username/email or password.");
                    return;
                }
                // Compare hashed password
                const isMatch = yield bcryptjs_1.default.compare(password, user.password);
                if (!isMatch) {
                    res.status(401).send("Invalid username/email or password.");
                    return;
                }
                // On success, redirect or render dashboard
                res.redirect("/dashboard");
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Login failed.");
            }
        });
    }
    logoutUser(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Logic for user logout
        });
    }
    authenticate(_req, _res, next) {
        // authentication logic here
        next();
    }
}
exports.default = AuthController;
