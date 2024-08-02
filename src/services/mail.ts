import nodemailer, { Transporter } from "nodemailer";
import { config } from "../config/env";
import { logger } from "../utils/logger";

interface MailOptions {
  to: string;
  subject: string;
  text: string;
}
interface NewUser {
  name: string;
  email: string;
  password: string;
}

export class EmailService {
  private transporter: Transporter;
  private sender: string;

  constructor() {
    this.sender = config.EMAIL_USER;
    this.transporter = nodemailer.createTransport({
      host: config.EMAIL_HOST,
      port: config.EMAIL_PORT,
      secure: config.EMAIL_PORT === 465 ? true : false,
      auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASSWORD,
      },
    });
  }

  public async sendEmail(values: MailOptions) {
    const { to, subject } = values;
    await this.transporter.sendMail({ ...values, from: this.sender });
    logger.info({ action: "sendEmail", dst: to, subject });
  }
}

export class NewUserNotification extends EmailService {
  private options: MailOptions;

  constructor(user: NewUser) {
    super();
    this.options = {
      subject: "Welcome to MedConnect",
      to: user.email,
      text: `Welcome ${user.name},
            Below are your login credentials. 
            Kindly reset your password in the next 3 days.
            
            email: ${user.email}
            password: ${user.password}
      `,
    };
  }

  public sendWelcomeMail = async () => await this.sendEmail(this.options);
}
