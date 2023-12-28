const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.Mongo_url, {
    dbName: "Xenon_database",
  });
console.log("DB connected")
mongoose.connection.on('error', (err) => {
    console.error('Unknown error occured', err);
});