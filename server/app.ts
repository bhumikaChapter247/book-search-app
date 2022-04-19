import express from 'express';
import mongoose ,{ ConnectOptions } from 'mongoose'; // new
import cors from 'cors';
import * as swaggerUi from 'swagger-ui-express';
const swaggerDocument=require('./swagger.json')
require('dotenv');
const routes = require('./src/routes/apiRoutes') ;
const PORT:string|number= process.env.PORT || 5000;

const uri:string=process.env.DATABASE_URI||'mongodb+srv://bhumika:1sQ53VgRVNQfAKn2@book-search-db.6mj1n.mongodb.net/googlebooks?retryWrites=true&w=majority';

const app:any = express();
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/* -------------------------------------------- Alow origin ------------------------------------------- */
var corsOption:Object = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token', 'authorization'],
};
app.use(cors(corsOption));
// Define API routes here
app.use('/api', routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT, () => {
  console.log(`Server has started at ${PORT} !`);
});
// Database connection
mongoose.connect(
  uri,
  { useUnifiedTopology: true, useNewUrlParser: true } as ConnectOptions,
  (err) => {
    if (err) {
      console.error('Connection to DB failed');
    } else {
      console.log('Connection to DB was successful');
    }
  }
);
