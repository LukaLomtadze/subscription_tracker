import nodemailer from 'nodemailer' 
import { EMAIL_PASSWORD } from './env.js'

export const accountEmail = "lomtadze418@gmail.com";

const transporter = nodemailer.createTransport(
    {
        service: "gmail",
        auth: {
            user: "lomtadze418@gmail.com",
            pass: EMAIL_PASSWORD,
        }
    }
)

export default transporter;