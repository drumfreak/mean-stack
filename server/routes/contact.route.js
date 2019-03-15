var express = require('express');
const asyncHandler = require('express-async-handler');
const contactController = require('../controllers/contact.controller');

var router = express.Router();
module.exports = router;

/* Submit Email Contact. */
router.post('/submit', asyncHandler(submitContact));

async function submitContact(req, res) {
  await contactController.submitContact(req.body, function(contact) {
    // console.log('Saved contact to db');
    // console.log(contact);
    res.json(contact);
  });
}
module.exports = router;
