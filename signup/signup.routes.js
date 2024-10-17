const express = require('express');
const router = express.Router();
const { userRegistration } = require('./signup.controller'); 

// Route for user signup
router.post('/', userRegistration); 

module.exports = router;