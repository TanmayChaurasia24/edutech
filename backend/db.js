const mongoose = require('mongoose');
require('dotenv').config(); 

const mongo_uri = process.env.MONGO_URI;

if (!mongo_uri) {
  console.error('MONGO_URI is not defined');
  process.exit(1);
}

const mongoconnect = () => {
  mongoose.connect(mongo_uri)
  .then(() => console.log('Database connected'))
  .catch((error) => console.error(`Error connecting to the database: ${error}`));
}

module.exports = mongoconnect;
