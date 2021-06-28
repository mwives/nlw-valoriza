import sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export function sendWelcomeEmail({ name, email }) {
  sgMail.send({
    to: email,
    from: "ivo.nlwvaloriza@gmail.com",
    templateId: "d-95c94c7054344e6f85cb2e333f1a7318",
    dynamicTemplateData: { name },
  });
}
