const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

/* ================  API for CFA1 Question  ============== */

router.post('/signup', userController.socialSignup);
module.exports = router;
