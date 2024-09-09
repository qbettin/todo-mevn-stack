require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');
const todoRoutes = require('./routes/todos.js');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://qbettin:yolostealthis@secsofttodo.yxx5w.mongodb.net/?retryWrites=true&w=majority&appName=secsoftTODO";
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/auth', authRoutes);  // Auth routes
app.use('/api/todos', todoRoutes); // Todos routes

// Example route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
mongoose.set('debug', true);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
