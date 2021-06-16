const Router = require('express').Router();
const userMiddlewares = require('../middlewares/userMiddlewares');
const userController = require('../controllers/userController');

Router.get(
  '/user/:id',
  userMiddlewares.tokenValidation,
  userController.getById,
  );
Router.post(
  '/user',
  userMiddlewares.displayNameEmailValidation,
  userMiddlewares.passwordValidation,
  userController.newUser,
  );
Router.post(
  '/login',
  userMiddlewares.loginValidation,
  userController.login,
  );
Router.get(
  '/user',
  userMiddlewares.tokenValidation,
  userController.getAll,
  );
Router.delete(
  '/user/me',
  userMiddlewares.tokenValidation,
  userController.deleteME,
  );

module.exports = Router;