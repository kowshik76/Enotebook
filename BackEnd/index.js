const connectTomongo = require('./db');
const express = require('express');
const cors = require('cors');
const path = require('path'); // For serving React build files
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectTomongo();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Serve React app in production
const path = require('path');

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