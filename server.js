import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import auth from './middlewares/auth.js'

import { notFoundError, errorHandler } from './middlewares/error-handler.js';


import userRoutes from './routes/user.js';


const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'Petbook';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://localhost:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

  app.use(cors());
  
  app.use(morgan('dev'));
  app.use(express.json());
  //app.use(express.urlencoded({ extended: true }));
  //app.use('/img', express.static('public/images'));


app.use('/user', userRoutes);


app.post("/user/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});
/*
app.use(notFoundError);
app.use(errorHandler);
*/
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});