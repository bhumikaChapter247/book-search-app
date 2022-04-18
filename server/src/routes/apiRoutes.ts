const expresss = require('express');
const router = expresss.Router();
const { user } = require('./index');

router.use('/user', user);
module.exports = router;
