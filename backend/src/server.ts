import 'dotenv/config';
import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import HttpError from './models/HttpError';
import errorHandler from './middlewares/errorHandler';
import roomsRouter from './routes/rooms.routes';
import userRouter from './routes/user.routes';
import cookieParser from 'cookie-parser';

const app = express();

// logger
app.use(morgan('dev'));

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('<h1>Home</h1>');
});

// Esto envía todas las peticiones /users a mi enrutador
app.use('/rooms', roomsRouter);
app.use('/users', userRouter);

//? Middleware 404 not found
app.use((req, res) => {
  throw new HttpError(404, 'Invalid route');
});

//! Middleware de los errores
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}...`);
});
