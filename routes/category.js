const Router = require('express').Router();
const { tokenValidation } = require('../middlewares/userMiddlewares');
const catMiddleware = require('../middlewares/categoryMiddleware');
const catController = require('../controllers/categoryController');

Router.post(
  '/categories',
  catMiddleware.nameValidation,
  tokenValidation,
  catController.create,
  );
Router.get(
  '/categories',
  tokenValidation,
  catController.getAll,
);

module.exports = Router;