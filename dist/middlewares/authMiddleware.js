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
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied.' });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err || !decoded || typeof decoded !== 'object' || !('id' in decoded)) {
            return res.status(401).json({ message: 'Token is not valid.' });
        }
        try {
            const user = yield userModel_1.default.findById(decoded.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            req.user = user;
            next();
        }
        catch (error) {
            return res.status(500).json({ message: 'Server error.' });
        }
    }));
};
const _default = authMiddleware;
export { _default as default };
