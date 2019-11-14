const express = require('express');
const router = express.Router();
const user = require('./../controllers/user');

router.route('/signup').post(user.signup);
router.route('/signin').post(user.signin);

module.exports = router;
