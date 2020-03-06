// const nodemailer = require("nodemailer");
// const mailGun = require("nodemailer-mailgun-transport");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = (to, email, name, subject, text, cb) => {
  const msg = {
    to: process.env.MYEMAIL,
    from: email,
    name: name,
    subject: subject,
    text: text
  };
  sgMail.send(msg);
};

module.exports = sendMail;
