const Joi = require('@hapi/joi');
const { JoiErrors } = require('../utils/rules'); 

const signupValidation = Joi.object({
  username: Joi.string().trim().min(3).max(30).required().error(new Error(JoiErrors.error.username)),
  email: Joi.string().trim().email().required().error(new Error(JoiErrors.error.email)),
  password: Joi.string().trim().min(8).required().error(new Error(JoiErrors.error.password)),
  contactNumber: Joi.string().trim().length(10).pattern(/^\d+$/).required().error(new Error(JoiErrors.error.contactNumber)),
});

module.exports = {
  signupValidation
};
