const express = require('express');
const drugController = require('../controllers/drugController');
const util = require('../middleware/util');

const router = express.Router();

router.get('/search', drugController.search);
router.post('/save', util.checkAuth, drugController.save);
router.delete('/delete', drugController.deleteMyDrug);

module.exports = router;