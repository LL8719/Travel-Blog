const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const mailRoutes = require('./mailRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/', mailRoutes);

module.exports = router;
