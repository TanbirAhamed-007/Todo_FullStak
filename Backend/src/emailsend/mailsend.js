import nodemailer from 'nodemailer'
import dotenv from 'dotenv/config'

export const mailsend = async (token, email) => {
    const transport = nodemailer.createTransport({
        service: "gmail",

        auth: {
            user: process.env.mailuser,
            pass: process.env.pass
        }
    });

    const mailConfiguration = {
        from: process.env.mailuser,
        to: email,
        subject: "user verification purpose",
        text: `for verify our website use this token
         ${token}`
    };

    transport.sendMail(mailConfiguration, function (error, info) {
        if (error) {
            console.log("email cannot sent!", error)
        } else {
            console.log("Email send Successfully")
            console.log(info);
        }
    })

}