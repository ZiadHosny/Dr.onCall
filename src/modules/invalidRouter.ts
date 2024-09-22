import { Request, Response, NextFunction, Router } from 'express';
import { AppLocalizedError } from '../utils/AppError.js';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/', (_: Request, __: Response, next: NextFunction) => {
  return next(
    new AppLocalizedError(
      {
        ar: 'عنوان URL غير صالح - لا يمكن الوصول إلى هذه النقطة.',
        en: "Invalid URL - can't access this endpoint.",
      },
      StatusCodes.NOT_FOUND,
    ),
  );
});

export const invalidRouter = router;
