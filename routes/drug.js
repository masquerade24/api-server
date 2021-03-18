const express = require('express');
const drugController = require('../controllers/drugController');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

router.get('/search', drugController.search);
router.post('/save',checkAuthMiddleware.checkAuth, drugController.save);
router.delete('/delete', checkAuthMiddleware.checkAuth, drugController.deleteMyDrug);

module.exports = router;