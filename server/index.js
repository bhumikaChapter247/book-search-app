const express = require('express');
const mongoose = require('mongoose'); // new
const PORT = process.env.PORT || 5000;
const routes = require('./src/routes/apiRoutes');

const app = express();
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Define API routes here
app.use('/api', routes);
app.listen(PORT, () => {
  console.log(`Server has started at ${PORT} !`);
});
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
