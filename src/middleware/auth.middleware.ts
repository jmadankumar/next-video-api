import { NextFunction, Request, Response } from 'express';
import { wrapAsyncError, AccessDeniedError } from '../helper/error';
import { verifyToken } from '../helper/jwt';
import { UserDTO } from '../types/user';

export const authorizeUser = wrapAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { hasToken, user, isAuthenticated } = res.locals;

    if (!hasToken || !isAuthenticated) {
      throw new AccessDeniedError('Unauthorized');
    }
    next();
  },
);

export const parseAuthToken = wrapAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const authentication_token =
      req.cookies?.authentication_token || req.headers['x-authentication-token'];

    if (!authentication_token) {
      res.locals.hasToken = false;
    } else {
      res.locals.hasToken = true;
    }

    try {
      const user: UserDTO = verifyToken(authentication_token);
      res.locals.user = user;
      res.locals.isAuthenticated = true;
    } catch (err) {
      res.locals.isAuthenticated = false;
    }

    next();
  },
);
