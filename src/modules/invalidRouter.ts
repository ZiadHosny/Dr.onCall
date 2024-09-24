import { Request, Response, NextFunction, Router } from 'express';
import { AppLocalizedError } from '../utils/AppError.js';
import { StatusCodes } from 'http-status-codes';
import { Messages } from '../utils/Messages.js';

const router = Router();

router.get('/', (_: Request, __: Response, next: NextFunction) => {
  return next(
    new AppLocalizedError(Messages.invalidUrl, StatusCodes.NOT_FOUND),
  );
});

export const invalidRouter = router;
