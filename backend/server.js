const express = require('express');
const mongoconnect = require('./db.js');
const cors = require('cors');
const PORT = 8000;

// Connect to MongoDB
mongoconnect();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route to verify server is running
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
