import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import HttpError from '../models/HttpError.js';
import { ExtendedRequest, User } from '../config/types.js';

function userAuth(req: ExtendedRequest, res: Response, next: NextFunction) {
  const { access_token } = req.cookies;
  if (!access_token) {
    throw new HttpError(401, 'Access token not found');
  }

  try {
    const payload = jwt.verify(access_token, process.env.TOKEN_SECRET!) as User;
    req.user = payload;

    next();
  } catch (error) {
    res.clearCookie('access_token');
    throw new HttpError(403, 'Invalid access token');
  }
}

export default userAuth;
