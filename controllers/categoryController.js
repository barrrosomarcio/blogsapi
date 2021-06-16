const { Category } = require('../models');

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const response = await Category.create({ name });
    return res.status(201).send(response);
  } catch (error) {
    console.log(error);
  }
};
const getAll = async (req, res) => {
  try {
    const response = await Category.findAll();
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  create,
  getAll,
};