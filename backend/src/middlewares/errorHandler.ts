import { NextFunction, Request, Response } from 'express';
import HttpError from '../models/HttpError.js';
import ValidationError from '../models/ValidationError.js';

//! ES OBLIGATORIO QUE USÉIS LOS 4 PARÁMETROS, si no no reconocerá que es el middleware de los errores
function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ValidationError) {
    res.status(error.statusCode).send({
      message: error.message,
      errors: error.errors,
    });
    return;
  }
  if (error instanceof HttpError) {
    res.status(error.statusCode).send({
      message: error.message,
    });
    return;
  }

  if (error instanceof Error) {
    res.status(500).send({
      message: error.message,
    });
  }
}

export default errorHandler;
