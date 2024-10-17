const bcrypt = require('bcrypt');
const pool = require('../config/mysql');
const Boom = require('@hapi/boom');
const { constant } = require('../utils/constants');

const saltRounds = 10;

const isUserEmailExist = async (email) => {
  try {
    const [result] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return result;
  } catch (error) {
    throw Boom.badImplementation(error.message);
  }
};

const isUserContactNumberExist = async (contactNumber) => {
  try {
    const [result] = await pool.query('SELECT * FROM users WHERE contactNumber = ?', [contactNumber]);
    return result;
  } catch (error) {
    throw Boom.badImplementation(error.message);
  }
};

const registerUser = async ({ username, email, password, contactNumber }) => {
  try {
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = 'INSERT INTO users (username,email, password, contactNumber) VALUES (?, ?, ?, ?)';
    const [result] = await pool.query(query, [username, email, hashedPassword, contactNumber]);
    if (result.affectedRows === 0) {
      throw Boom.badRequest(constant.registrationFailed);
    }
    return { id: result.insertId, username, email, contactNumber };
  } catch (error) {
    throw Boom.badImplementation(error.message);
  }
};

module.exports = {
  isUserEmailExist,
  isUserContactNumberExist,
  registerUser
};
