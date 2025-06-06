export class NotificationController {
    private emailService: any; // Replace 'any' with the actual type of your email service

    constructor(emailService: any) {
        this.emailService = emailService;
    }

    public async sendEmailConfirmation(userEmail: string, reservationDetails: any): Promise<void> {
        const subject = "Reservation Confirmation";
        const message = `Dear User, your reservation has been confirmed for ${reservationDetails.date} at ${reservationDetails.time}.`;
        await this.emailService.sendConfirmationEmail(userEmail, subject, message);
    }

    public async sendEmailReminder(userEmail: string, reservationDetails: any): Promise<void> {
        const subject = "Reservation Reminder";
        const message = `Dear User, this is a reminder for your reservation on ${reservationDetails.date} at ${reservationDetails.time}.`;
        await this.emailService.sendReminderEmail(userEmail, subject, message);
    }
}