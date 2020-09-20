import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import initDatabase from './config/db';
import apiRouter from './routes';
import { errorHandler } from './helper/error';

const PORT = process.env.PORT || 8081;
const app = express();

initDatabase();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: ['http://localhost:3000'], preflightContinue: true }));

app.use('/api', apiRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started at port : ${PORT}`);
});
