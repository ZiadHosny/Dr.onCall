import { Request, Response } from 'express';
import { getFromEnv } from '../utils/getFromEnv.js';
import { AppErrorType } from '../utils/AppError.js';
import { sendLocalizedResponse } from '../utils/response.js';
import { Messages } from '../utils/Messages.js';

export const globalErrorMiddleware = (
  err: AppErrorType,
  req: Request,
  res: Response,
) => {
  const { mode } = getFromEnv();

  if (mode == 'dev') {
    devMode(err, req, res);
  } else {
    prodMode(err, req, res);
  }
};

const prodMode = (err: AppErrorType, req: Request, res: Response) => {
  const details = !err.localizedMessage ? { details: err.toString() } : {};

  sendLocalizedResponse({
    message: err.localizedMessage ?? Messages.serverError,
    res,
    req,
    status: err.statusCode,
    isError: true,
    ...details,
  });
};

const devMode = (err: AppErrorType, req: Request, res: Response) => {
  const details = !err.localizedMessage ? { details: err.toString() } : {};

  sendLocalizedResponse({
    message: err.localizedMessage ?? Messages.serverError,
    res,
    req,
    status: err.statusCode,
    isError: true,
    ...details,
  });
};
