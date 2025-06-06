"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import { Schema, model } from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const User = (0, model)('User', userSchema);
const _default = User;
export { _default as default };
