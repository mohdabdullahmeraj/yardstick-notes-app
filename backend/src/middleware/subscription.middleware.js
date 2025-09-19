const Tenant = require('../models/tenant.model');
const Note = require('../models/note.model');

const checkNoteLimit = async (req, res, next) => {
    try {
        const tenant = await Tenant.findById(req.user.tenantId);
        if (tenant.plan === 'free') {
            const noteCount = await Note.countDocuments({ tenant: req.user.tenantId });
            if (noteCount >= 3) {
                return res.status(403).json({ message: 'Note limit reached. Please upgrade to the Pro plan.' });
            }
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error while checking subscription' });
    }
};

module.exports = { checkNoteLimit };