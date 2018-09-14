const nodemailer = require('nodemailer');

const logger = require('./logger');

const transport = nodemailer.createTransport({
  service: "Hotmail",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  },
})



module.exports = async ({ referrer, to }) => {
  const url = `${process.env.CLIENT_URL}/${referrer}`;
  const text = `You are invited to collaborate! Access the link: ${url}`;
  const html = `
    <p>You are invited to collaborate!</p>
    <p>Access the link: <a href=${url}>here</a></p>
  `

  const mailOptions = {
    from: 'Han <yaphc@hotmail.com>',
    to,
    subject: 'You got an invite',
    text,
    html
  };

  const info = await transport.sendMail(mailOptions);
  logger.info('Email sent to: ' + to);
  transport.close();
  return info;
}