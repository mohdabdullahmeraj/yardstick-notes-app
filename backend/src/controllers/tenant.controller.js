const Tenant = require('../models/tenant.model');

exports.upgradePlan = async (req, res) => {
    const { slug } = req.params;

    if (req.user.tenantSlug !== slug) {
         return res.status(403).json({ message: 'Forbidden: You can only upgrade your own tenant.' });
    }

    const tenant = await Tenant.findOneAndUpdate({ slug }, { plan: 'pro' }, { new: true });
    if (!tenant) {
        return res.status(404).json({ message: 'Tenant not found' });
    }
    res.json({ message: 'Plan upgraded to Pro successfully!', tenant });
};