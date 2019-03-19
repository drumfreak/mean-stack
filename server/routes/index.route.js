const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const weatherRoutes  = require('./weather.route');
const contactRoutes  = require('./contact.route');
const blogRoutes  = require('./blog.route');
const userProfileRoutes  = require('./userprofile.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/weather', weatherRoutes);
router.use('/contact', contactRoutes);
router.use('/blog', blogRoutes);
router.use('/userprofile', userProfileRoutes);


module.exports = router;
