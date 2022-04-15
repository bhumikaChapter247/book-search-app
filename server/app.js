const express = require('express');
const mongoose = require('mongoose'); // new
const PORT = process.env.PORT || 5000;
const routes = require('./src/routes/apiRoutes');
const cors = require('cors');
require('dotenv');
const app = express();
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/* -------------------------------------------- Alow origin ------------------------------------------- */
var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token', 'authorization'],
};
app.use(cors(corsOption));
// Define API routes here
app.use('/api', routes);
app.listen(PORT, () => {
  console.log(`Server has started at ${PORT} !`);
});
// Database connection
mongoose.connect(
  process.env.DATABASE_URL || 'mongodb://localhost/googlebooks',
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) {
      console.error('Connection to DB failed');
    } else {
      console.log('Connection to DB was successful');
    }
  }
);
