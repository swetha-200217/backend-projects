const pool = require('../config/mysql');
const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { constant } = require('../utils/constants');

const getUserByEmailOrUsername = async (emailOrUsername) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE email = ? OR username = ?',
            [emailOrUsername, emailOrUsername]
        );
        return rows[0];
    } catch (error) {
        throw Boom.badImplementation(constant.error.dbQueryFailed);
    }
};

const comparePassword = async (enteredPassword, storedPassword) => {
    try {
        return await bcrypt.compare(enteredPassword, storedPassword);
    } catch (error) {
        throw Boom.badImplementation(constant.error.passwordComparisonFailed);
    }
};

module.exports = {
    getUserByEmailOrUsername,
    comparePassword,
};