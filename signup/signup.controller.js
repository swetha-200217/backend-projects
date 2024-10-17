const { isUserEmailExist, isUserContactNumberExist, registerUser } = require('./signup.services'); 
const { signupValidation } = require('./signup.validation'); 
const Boom = require('@hapi/boom');
const { constant } = require('../utils/constants'); 

const userRegistration = async (req, res, next) => {
  try {
    // Validate the request body using Joi
    const { error } = signupValidation.validate(req.body);
    if (error) {
      throw Boom.badRequest(error.message); // Joi validation error
    }

    const { username, email, password, contactNumber } = req.body;

    // Check if the email already exists
    const isEmailExist = await isUserEmailExist(email);
    if (isEmailExist.length > 0) {
      throw Boom.conflict(constant.emailIdAlreadyInUse); // Email already in use
    }

    // Check if the contact number already exists
    const isContactNumberExist = await isUserContactNumberExist(contactNumber);
    if (isContactNumberExist.length > 0) {
      throw Boom.conflict(constant.contactNumberAlreadyInUse); // Contact number already in use
    }

    // Register the new user
    await registerUser({ username,email, password, contactNumber });
    return res.status(201).json({
      success: true,
      message: constant.registrationSuccess,
    });

  } catch (err) {
    next(err); // Pass any errors to the error handler
  }
};

module.exports = {
  userRegistration
};
