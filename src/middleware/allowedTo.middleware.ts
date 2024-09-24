import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsyncError } from '../utils/catchAsyncError.js';
import { AuthRequest, Role } from '../modules/user/user.interface.js';
import { AppLocalizedError } from '../utils/AppError.js';

// @desc      Authorization (User Permissions) ["superAdmin", "admin", "user", "doctor"]
type Roles = Role[];
export const allowedTo = (...roles: Roles) =>
  catchAsyncError(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      const { type } = req.user;

      // if rule is superAdmin ant it's not in roles array
      if (!roles.includes(Role.SuperAdmin) && type === Role.SuperAdmin) {
        return next(
          new AppLocalizedError(
            {
              en: 'Access denied for Root Admin.',
              ar: 'تم رفض الوصول لمدير المديرين.',
            },
            StatusCodes.FORBIDDEN,
          ),
        );
      }
      // if rule is admin ant it's not in roles array
      if (!roles.includes(Role.Admin) && type === Role.Admin) {
        return next(
          new AppLocalizedError(
            {
              en: 'Access denied for Admin.',
              ar: 'تم رفض الوصول للمسؤول.',
            },
            StatusCodes.FORBIDDEN,
          ),
        );
      }
      // if rule is doctor ant it's not in roles array
      if (!roles.includes(Role.Doctor) && type === Role.Doctor) {
        return next(
          new AppLocalizedError(
            {
              en: 'Access denied for Doctor.',
              ar: 'تم رفض الوصول للطبيب.',
            },
            StatusCodes.FORBIDDEN,
          ),
        );
      }
      // if rule is user ant it's not in roles array
      if (!roles.includes(Role.User) && type === Role.User) {
        return next(
          new AppLocalizedError(
            {
              en: 'Access denied for Doctor.',
              ar: 'تم رفض الوصول للطبيب.',
            },
            StatusCodes.FORBIDDEN,
          ),
        );
      }

      next();
    },
  );
