import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { logBlueMsg } from '../../utils/console/log.js';
import { AppLocalizedError } from '../../utils/AppError.js';
import { StatusCodes } from 'http-status-codes';

export const validation = (
  schema: Joi.ObjectSchema,
  reqPart: 'params' | 'body',
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = JSON.parse(JSON.stringify(req[reqPart]));
    const { error } = schema.validate(body, { abortEarly: true });

    logBlueMsg(`Validation for request part:  ${reqPart}`);

    const message =
      error?.details.map((i: any) => i.message).join(',') ?? 'Validation Error';

    return error
      ? next(
          new AppLocalizedError(
            {
              ar: message,
              en: message,
            },
            StatusCodes.BAD_REQUEST,
          ),
        )
      : next();
  };
};
