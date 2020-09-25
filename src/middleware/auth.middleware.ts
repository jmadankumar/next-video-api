import { NextFunction, Request, Response } from 'express';
import { wrapAsyncError, AccessDeniedError } from '../helper/error';
import { verifyToken } from '../helper/jwt';
import { UserDTO } from '../types/user';

export const authorizeUser = wrapAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const authentication_token =
      req.cookies?.authentication_token || req.headers['x-authentication-token'];

    if (!authentication_token) {
      throw new AccessDeniedError('Unauthorized');
    }
    try {
      const user: UserDTO = verifyToken(authentication_token);
      res.locals.user = user;
      next();
    } catch (err) {
      throw new AccessDeniedError('Unauthorized');
    }
  },
);
