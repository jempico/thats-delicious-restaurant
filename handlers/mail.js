const nodemailer = require('nodemailer');
const promisify = require('es6-promisify');
const juice = require('juice');
const htmlToText = require('html-to-text');
const pug = require('pug');

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

const generateHTML = (filename, options = {})=> {
    const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options);
    const inlined = juice(html)
    return inlined;
}
exports.send = async(options) => {
    const html = generateHTML(options.filename, options);
    const text = htmlToText.fromString(html);
    const mailOptions = {
        from: 'Jem Pi <gojem@code.com>',
        to: options.user.email,
        subject: 'Testing official mail',
        html,
        text
    }
    const sendMail = promisify(transport.sendMail, transport);
    return sendMail(mailOptions);
}

//Testing MAil
/*
transport.sendMail({
    from: 'Jem Pi <jpfilarca@gmail.com>',
    to: 'jempi@example.com',
    subject: 'Just trying fake email',
    html: 'Hey I <strong>hate</strong>you',
    text: 'Hey I **hate you**'
});*/