const express = require('express');
const router = express.Router();
const { upgradePlan } = require('../controllers/tenant.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.post('/:slug/upgrade', authenticate, authorize('admin'), upgradePlan);

module.exports = router;