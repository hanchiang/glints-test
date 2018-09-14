const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: "Hotmail",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  },
})



module.exports = async ({ referrer, referrerName, to }) => {
  const url = `${process.env.CLIENT_URL}/${referrer}`;
  const text = `You are invited by ${referrerName}. The link is at: ${url}`;
  const html = `
    <p>You are invited by ${referrerName}</p>
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
  console.log('Email sent to: ' + to);
  transport.close();
  return info;
}