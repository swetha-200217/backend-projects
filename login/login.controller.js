const { getUserByEmailOrUsername, comparePassword } = require('./login.services');
const Boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const redis = require('../config/redis');
const dotenv = require('dotenv');
const { constant } = require('../utils/constants');
const { loginValidation } = require('./login.validation');

const loginUser = async (req, res, next) => {
    try {
        const { error } = loginValidation.validate(req.body);
        if (error) throw Boom.badRequest(error.details[0].message);

        const { emailOrUsername, password } = req.body;

        const user = await getUserByEmailOrUsername(emailOrUsername);
        if (!user) throw Boom.unauthorized(constant.error.invalidCredentials); // Updated message

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) throw Boom.unauthorized(constant.error.invalidCredentials); // Updated message

        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '7d' });

        await redis.set(`session_${user.id}`, token, 'EX', 604800);

        res.json({ success: true, message: constant.success.authenticationSuccess, token, username: user.username });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    loginUser,
};
