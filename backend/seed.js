require('dotenv').config();
const mongoose = require('mongoose');
const Tenant = require('./src/models/tenant.model');
const User = require('./src/models/user.model');
const Note = require('./src/models/note.model'); // ⚙️ 1. Import the Note model

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB connected for seeding');

        // Clear existing data from all relevant collections
        await Tenant.deleteMany({});
        await User.deleteMany({});
        await Note.deleteMany({}); 

        // Create Tenants
        const acme = await Tenant.create({ name: 'Acme', slug: 'acme', plan: 'free' });
        const globex = await Tenant.create({ name: 'Globex', slug: 'globex', plan: 'free' });

        // Create Users
        await User.create([
            { email: 'admin@acme.test', password: 'password', role: 'admin', tenant: acme._id },
            { email: 'user@acme.test', password: 'password', role: 'member', tenant: acme._id },
            { email: 'admin@globex.test', password: 'password', role: 'admin', tenant: globex._id },
            { email: 'user@globex.test', password: 'password', role: 'member', tenant: globex._id },
        ]);

        console.log('Database seeded successfully! All old data cleared.');
    } catch (error) {
        console.error('Error during seeding:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedData();