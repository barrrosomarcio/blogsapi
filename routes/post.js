const Router = require('express').Router();
const { tokenValidation } = require('../middlewares/userMiddlewares');
const postMiddlewares = require('../middlewares/postmiddleware');
const postController = require('../controllers/postController');

Router.post(
  '/post',
  tokenValidation,
  postMiddlewares.fieldsValidation,
  postMiddlewares.catIdsValidation,
  postController.create,
  );
Router.get(
  '/post',
  tokenValidation,
  postController.getAll,
  );
Router.get(
  '/post/:id',
  tokenValidation,
  postController.getById,
  );
Router.put(
  '/post/:id',
  tokenValidation,
  postMiddlewares.updateFieldsValidation,
  postController.updateById,
  );
Router.delete(
  '/post/:id',
  tokenValidation,
  postController.deleteById,
  );
module.exports = Router;