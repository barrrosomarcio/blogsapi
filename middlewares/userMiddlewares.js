const JWT = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;
const emailRegex = /\S+@\S+\.\S+/;
const nameMinLength = 8;
const passMinLength = 6;
const ZERO = 0;

const displayNameEmailValidation = (req, res, next) => {
  if (!req.body.displayName || req.body.displayName.length < nameMinLength) {
    return res.status(400).send({
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  if (!req.body.email) {
    return res.status(400).send({
      message: '"email" is required',
    });
  }
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).send({
      message: '"email" must be a valid email',
    });
  }
  next();
};
const passwordValidation = (req, res, next) => {
  if (!req.body.password) {
    return res.status(400).send({
      message: '"password" is required',
    });
  }
  if (req.body.password.length < passMinLength) {
    return res.status(400).send({
      message: '"password" length must be 6 characters long',
    });
  }
  next();
};
const loginValidation = (req, res, next) => {
  const { email, password } = req.body;
  if (email === undefined) { return res.status(400).send({ message: '"email" is required' }); }
  if (password === undefined) {
    return res.status(400).send({ message: '"password" is required' });
  }
  if (email.length === ZERO) {
    return res.status(400).send({ message: '"email" is not allowed to be empty' });
  }
  if (password.length === ZERO) {
    return res.status(400).send({ message: '"password" is not allowed to be empty' });
  }
  next();
};
const tokenValidation = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({
        message: 'Token not found',
      });
    }
    JWT.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).send({
      message: 'Expired or invalid token',
    });
  }
};
module.exports = {
  displayNameEmailValidation,
  passwordValidation,
  loginValidation,
  tokenValidation,
};