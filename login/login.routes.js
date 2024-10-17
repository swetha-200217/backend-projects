const express = require('express');
const router = express.Router();
const { loginUser } = require('./login.controller');

router.post('/', loginUser);

module.exports = router;