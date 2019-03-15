const Joi = require('joi');
const Contact = require('../models/contact.model');
const nodemailer = require('nodemailer');
const config = require('../config/config');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  emailAddress: Joi.string().email(),
  subject: Joi.string().required(),
  emailBody: Joi.string().required(),
})

module.exports = {
  submitContact
}

async function submitContact(email, cb) {
  if(!email) {
    return {};
  }

  let contact = await Joi.validate(email, contactSchema, {abortEarly: false});

  // Send an e-mail.
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: config.mail.transportHost,
    port: config.mail.transportPort,
    secure: config.mail.transportSecure,
    auth: {
      user: config.mail.transportUser,
      pass: config.mail.transportPassword
    }
  });
  mailOpts = {
    from: contact.name + ' &lt;' + contact.emailBody + '&gt;',
    to: config.mail.sendMailTo,
    subject: contact.subject,
    text: `${contact.name} (${contact.emailAddress}) says:\r\n\r\n${contact.emailBody}`
  };

  smtpTrans.sendMail(mailOpts).then(async function (response) {
    console.log(response);
    contact.response = response;
    cb(await new Contact(contact).save());
  }).catch(async function (error) {
    if (error) {
      console.log('contact-failure');
      console.log(error);
      contact.error = error;
      cb(await new Contact(contact).save());
    }
  });

}
