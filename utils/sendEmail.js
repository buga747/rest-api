const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);

// const msg = {
//   to: "oleg-747@ukr.net", // Change to your recipient
//   from: "oleh.buhaichuk@gmail.com", // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };

const sendEmail = async (data) => {
  const email = { ...data, from: "oleh.buhaichuk@gmail.com" };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
