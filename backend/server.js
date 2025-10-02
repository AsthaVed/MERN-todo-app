const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ IMPROVED MongoDB Connection (No Warnings)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-todo')
.then(() => {
    console.log('✅ MongoDB Connected Successfully');
    console.log('📊 Database Name:', mongoose.connection.name);
    console.log('🔗 Host:', mongoose.connection.host);
})
.catch(err => {
    console.log('❌ MongoDB Connection Failed:', err.message);
});

// Test route with database info
app.get('/', (req, res) => {
    res.json({ 
        message: '🚀 MERN Todo Backend Working!',
        database: {
            status: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
            name: mongoose.connection.name,
            host: mongoose.connection.host
        },
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🎯 Server running on port ${PORT}`);
    console.log(`🔗 http://localhost:${PORT}`);
});