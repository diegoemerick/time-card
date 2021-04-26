require('dotenv').config();
const nodemailer = require("nodemailer");
const fs = require('fs');

class SendEmailService {

    async sendEmail() {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_FROM,
                pass: process.env.EMAIL_FROM_PASSWORD,
            },
        });

        let message = await transporter.sendMail({
            from: '"Registro de Ponto" <seuponto@registro.com>', // sender address
            to: process.env.EMAIL_TO, // list of receivers
            subject: "Ponto Registrado ✔", // Subject line
            text: "Ponto Registrado", // plain text body
            attachments: [{
                filename: 'register.jpg',
                content: fs.createReadStream('register.jpg'),
                cid: 'register@register.com'
            }]
        });

        console.log("Message sent: %s", message.messageId);
        console.log(message);
    }

}


module.exports = SendEmailService;