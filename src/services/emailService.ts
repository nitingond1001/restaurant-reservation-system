import nodemailer from 'nodemailer';

class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email service
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // Your email password
            },
        });
    }

    async sendConfirmationEmail(to: string, reservationDetails: any) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject: 'Reservation Confirmation',
            text: `Your reservation has been confirmed. Details: ${JSON.stringify(reservationDetails)}`,
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending confirmation email:', error);
        }
    }

    async sendReminderEmail(to: string, reservationDetails: any) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject: 'Reservation Reminder',
            text: `This is a reminder for your upcoming reservation. Details: ${JSON.stringify(reservationDetails)}`,
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending reminder email:', error);
        }
    }
}

export default new EmailService();