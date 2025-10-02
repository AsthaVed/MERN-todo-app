const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Todo Schema (Simple version)
const todoSchema = new mongoose.Schema({
    text: String,
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});
const Todo = mongoose.model('Todo', todoSchema);
console.log('📁 Collection Name:', Todo.collection.name); 
// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-todo')
.then(async () => {
    console.log('✅ MongoDB Connected Successfully');

      // Check all collections in database
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📋 All Collections:');
    collections.forEach(col => {
        console.log('   -', col.name);
    });
    
    // ✅ IMPORTANT: Pehla todo create karein taki database show ho
    const count = await Todo.countDocuments();
    if(count === 0) {
        await Todo.create({ text: 'Welcome to MERN Todo App1!' });
        console.log('📝 First todo created - Database will now be visible');
    }
    
    console.log('📊 Total todos:', count);
    console.log('🔗 Database:', mongoose.connection.name);
})
.catch(err => {
    console.log('❌ MongoDB Connection Failed:', err.message);
});

// Routes
app.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.json({
        message: '🚀 MERN Todo Backend',
        totalTodos: todos.length,
        todos: todos
    });
});

app.post('/todos', async (req, res) => {
    const todo = await Todo.create(req.body);
    res.json(todo);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🎯 Server running on http://localhost:${PORT}`);
});