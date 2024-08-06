const express = require('express');
const mongoconnect = require('./db.js');
const courseRoute = require('./routes/courseRoute.js')
const cors = require('cors');
const PORT = 8000;

mongoconnect();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api',courseRoute)

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
