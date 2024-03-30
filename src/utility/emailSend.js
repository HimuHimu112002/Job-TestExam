const nodemailer = require("nodemailer");

async function EmailSend(email, token) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mdhmaktaruzzaman9101@gmail.com",
      pass: "mopgvxmusxutzubs",
    },
  });
  await transporter.sendMail({
    from: 'NURIT',
    to: email,
    subject: "Email Verification",
    text: `Hello`,
    html: `<h1>Please Verifiy</h1><br/><h2>${process.env.BASE_URL}/api/v1/tokenverify/${token}</h2>`,
  });
}
module.exports = EmailSend