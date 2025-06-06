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
const nodemailer_1 = __importDefault(require("nodemailer"));
class EmailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // Your email password
            },
        });
    }
    sendConfirmationEmail(to, reservationDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to,
                subject: 'Reservation Confirmation',
                text: `Your reservation has been confirmed. Details: ${JSON.stringify(reservationDetails)}`,
            };
            try {
                yield this.transporter.sendMail(mailOptions);
            }
            catch (error) {
                console.error('Error sending confirmation email:', error);
            }
        });
    }
    sendReminderEmail(to, reservationDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to,
                subject: 'Reservation Reminder',
                text: `This is a reminder for your upcoming reservation. Details: ${JSON.stringify(reservationDetails)}`,
            };
            try {
                yield this.transporter.sendMail(mailOptions);
            }
            catch (error) {
                console.error('Error sending reminder email:', error);
            }
        });
    }
}
const _default = new EmailService();
export { _default as default };
