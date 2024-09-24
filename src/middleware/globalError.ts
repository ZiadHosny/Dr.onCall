import { NextFunction, Request, Response } from 'express';
import { getFromEnv } from '../utils/getFromEnv.js';
import { AppErrorType } from '../utils/AppError.js';
import { sendLocalizedResponse } from '../utils/response.js';

export const globalErrorMiddleware = (
  err: AppErrorType,
  req: Request,
  res: Response,
  __: NextFunction,
) => {
  const { mode } = getFromEnv();

  if (mode == 'dev') {
    devMode(err, req, res);
  } else {
    prodMode(err, req, res);
  }
};

const prodMode = (err: AppErrorType, req: Request, res: Response) => {
  sendLocalizedResponse({
    message: err.localizedMessage,
    res,
    req,
    status: err.statusCode,
    isError: true,
  });
};

const devMode = (err: AppErrorType, req: Request, res: Response) => {
  sendLocalizedResponse({
    message: err.localizedMessage,
    res,
    req,
    status: err.statusCode,
    isError: true,
  });
};
