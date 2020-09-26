import { NextFunction, Request, Response } from 'express';

interface PaginationQuery {
  p: number;
  s: number;
  [extra: string]: any;
}

const convertToInt = (val: string, defaultValue: number): number => {
  try {
    return parseInt(val);
  } catch (err) {
    return defaultValue;
  }
};

export const parsePaginationQuery = (
  req: Request<any, any, any, PaginationQuery>,
  res: Response<any>,
  next: NextFunction,
) => {
  const { p = 1, s = 10 } = req.query;
  const limit = convertToInt(s + '', 10);
  const offset = (convertToInt(p + '', 1) - 1) * limit;

  req.query = {
    ...req.query,
    offset: offset > 0 ? offset : 0,
    limit: limit > 0 ? limit : 0,
  };

  next();
};
