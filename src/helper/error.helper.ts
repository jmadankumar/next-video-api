import { Response } from 'express';

export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Database Error';
  }
}
export class HttpError extends Error {
  statusCode: number;
  constructor(message: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode || 500;
  }
}

export class CustomError extends HttpError {
  constructor(message: string, statusCode?: number) {
    super(message, statusCode);
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class AccessDeniedError extends HttpError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class InternalServerError extends HttpError {
  constructor(message?: string) {
    super(message || 'Internal server error', 500);
  }
}

export const errorHandler = (err: any, req: any, res: Response, next: (err?: any) => void) => {
  console.log(err);
  if (err) {
    if (err instanceof HttpError) {
      console.log('HttpError', err.message);
      res.status(err.statusCode).send({
        message: err.message,
      });
    } else {
      res.status(500).send({ message: 'Internal server error' });
    }
    return;
  }
  next(err);
};

// Reference: https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/
export const wrapAsyncError = (fn: any) => (...args: any[]) => fn(...args).catch(args[2]);
