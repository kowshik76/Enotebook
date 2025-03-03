const express = require('express');
const path = require('path');
const connectTomongo = require('./db');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectTomongo();

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
app.use(cors({
    origin: 'https://enotebook-uor5.onrender.com', // Allow requests from your frontend domain
    credentials: true, // Allow cookies and credentials
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../build/index.html'));
    });
}

// Default route
app.get('/', (req, res) => {
    res.send('Hey World!');
});

// Start server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});