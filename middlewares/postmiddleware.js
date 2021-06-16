const { Op } = require('sequelize');
const { Category } = require('../models');

const fieldsValidation = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title) {
    return res.status(400).send({
      message: '"title" is required',
    });
  }
  if (!content) {
    return res.status(400).send({
      message: '"content" is required',
    });
  }
  if (!categoryIds) {
    return res.status(400).send({
      message: '"categoryIds" is required',
    });
  }
  next();
};
const catIdsValidation = async (req, res, next) => {
  const { categoryIds } = req.body;
  const catExists = await Category.findAll({ where:
    { id: { [Op.in]: categoryIds } } });
  if (catExists.length !== categoryIds.length) {
    return res.status(400).send({
      message: '"categoryIds" not found',
    });
  }
  next();
};
const updateFieldsValidation = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title) {
    return res.status(400).send({
      message: '"title" is required',
    });
  }
  if (!content) {
    return res.status(400).send({
      message: '"content" is required',
    });
  }
  if (categoryIds) {
    return res.status(400).send({
      message: 'Categories cannot be edited',
    });
  }
  next();
};

module.exports = {
  fieldsValidation,
  catIdsValidation,
  updateFieldsValidation,
};