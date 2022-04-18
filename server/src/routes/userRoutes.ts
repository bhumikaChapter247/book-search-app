const Express = require('express');
const Router = Express.Router();

const userController = require('../controller/userController');

Router.post('/signup', userController.socialSignup);
Router.post('/savedsearch', userController.saveSearchedTitles);
Router.get('/savedtitles', userController.getSavedSearch);

module.exports = Router;
