const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

router.post('/signup', userController.socialSignup);
router.post('/savedsearch', userController.saveSearchedTitles);
router.get('/savedtitles', userController.getSavedSearch);

module.exports = router;
