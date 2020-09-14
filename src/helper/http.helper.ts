import { Response } from 'express';

function successResponse(res: Response, data: any) {
  res.status(200).send(data);
}
