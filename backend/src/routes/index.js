const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const noteRoutes = require('./note.routes');
const tenantRoutes = require('./tenant.routes');

router.get('/health', (req, res) => res.json({ status: 'ok' }));
router.use('/auth', authRoutes);
router.use('/notes', noteRoutes);
router.use('/tenants', tenantRoutes);

module.exports = router;