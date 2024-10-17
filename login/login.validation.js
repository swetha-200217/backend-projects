const Joi = require('@hapi/joi');
const { constant } = require('../utils/constants');

const loginValidation = Joi.object({
    emailOrUsername: Joi.string()
        .required().trim()
        .messages({
            'string.base': constant.validation.emailOrUsername.base,
            'string.empty': constant.validation.emailOrUsername.empty,
            'any.required': constant.validation.emailOrUsername.required,
        }),
    password: Joi.string()
        .min(8)
        .required().trim()
        .messages({
            'string.base': constant.validation.password.base,
            'string.empty': constant.validation.password.empty,
            'string.min': constant.validation.password.min,
            'any.required': constant.validation.password.required,
        }),
});

module.exports = {
    loginValidation,
};