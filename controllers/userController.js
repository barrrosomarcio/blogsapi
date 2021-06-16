const JWT = require('jsonwebtoken');
require('dotenv').config();
const DECODE = require('jwt-decode');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const newUser = async (req, res) => {
  try {
    const { email, displayName, password, image } = req.body;
    const userAlreadyExists = await User.findOne({ where: { email } });
    if (!userAlreadyExists) {
    const token = JWT.sign({ displayName, email }, JWT_SECRET);
    await User.create({ email, displayName, password, image });
    return res.status(201).send({
      token,
    });
  }
  return res.status(409).send({
    message: 'User already registered',
  });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
const login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || toString(user.dataValues.password) !== toString(req.body.password)) {
      return res.status(400).send({
        message: 'Invalid fields',
      });
    }
    const token = JWT.sign(
      { displayName: user.dataValues.displayName, email: user.dataValues.email }, JWT_SECRET,
      );
      return res.status(200).send({
        token,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
const getAll = async (req, res) => {
  try {
    const querie = await User.findAll();
    const output = [];
    querie.forEach((Element) => {
      output.push(Element.dataValues);
    });
    return res.status(200).send(output);
  } catch (error) {
    console.log(error);
  }
};
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).send({
        message: 'User does not exist',
      });
    }
    return res.status(200).send(user.dataValues);
  } catch (error) {
    console.log(error);
  }
};
const deleteME = async (req, res) => {
  try {
    const { email } = DECODE(req.headers.authorization);
    const user = await User.findOne({ where: { email } });
    await user.destroy();
    return res.status(204).send();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  newUser,
  login,
  getAll,
  getById,
  deleteME,
};