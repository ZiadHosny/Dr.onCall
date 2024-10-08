import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { UserModel } from '../../models/user.model.js';
import jwt from 'jsonwebtoken';
import { getFromEnv } from '../../utils/getFromEnv.js';
import { sendEmail } from '../../utils/email/sendEmail.js';
import { AppLocalizedError } from '../../utils/AppError.js';
import { sendLocalizedResponse } from '../../utils/response.js';
import { APP_NAME, ROUNDS } from '../../utils/constants.js';
import { catchAsyncError } from '../../utils/catchAsyncError.js';
import { StatusCodes } from 'http-status-codes';
import { AuthRequest } from './user.interface.js';
import { Messages } from '../../utils/Messages.js';
import { Factory } from '../../utils/factory.js';

export const signUp = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, phone } = req.body;
    const { secretKey, rounds } = getFromEnv();
    const user = await UserModel.findOne({ email });
    if (user) {
      next(
        new AppLocalizedError(
          Messages.accountAlreadyExists,
          StatusCodes.CONFLICT,
        ),
      );
    } else {
      bcrypt.hash(password, rounds, async (err, hash) => {
        if (err) {
          return next(
            new AppLocalizedError(
              Messages.hashingError,
              StatusCodes.INTERNAL_SERVER_ERROR,
            ),
          );
        }
        await UserModel.insertMany({
          name,
          email,
          password: hash,
          phone,
        });

        const token = jwt.sign({ email }, secretKey);
        await sendEmail({
          userEmail: email,
          token,
          subject: `Verification From ${APP_NAME} App`,
        });

        sendLocalizedResponse({
          res,
          req,
          message: Messages.registerSuccessfullyConfirmEmail,
          status: StatusCodes.CREATED,
        });
      });
    }
  },
);

export const signIn = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const { secretKey } = getFromEnv();

    const user = await UserModel.findOne({ email });

    if (user) {
      const match = await bcrypt.compare(password, user.password);

      const { _id: userId, name, isVerified, isActive, type } = user;

      const token = jwt.sign(
        {
          userId,
          name,
          isVerified,
          password: user.password,
          email,
          type,
        },
        secretKey,
      );

      if (!isVerified) {
        next(
          new AppLocalizedError(Messages.confirmEmail, StatusCodes.FORBIDDEN),
        );
      }

      if (!isActive) {
        next(
          new AppLocalizedError(Messages.inActiveUser, StatusCodes.FORBIDDEN),
        );
      }

      if (match) {
        sendLocalizedResponse({
          res,
          req,
          message: Messages.loginSuccessfully,
          data: {
            token,
            user: {
              name,
              email,
              type,
            },
          },
          status: StatusCodes.OK,
        });
      } else {
        next(
          new AppLocalizedError(
            Messages.incorrectPassword,
            StatusCodes.UNAUTHORIZED,
          ),
        );
      }
    } else {
      next(
        new AppLocalizedError(Messages.accountNotFound, StatusCodes.NOT_FOUND),
      );
    }
  },
);

export const emailVerify = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    const { secretKey } = getFromEnv();

    jwt.verify(token, secretKey, async (err, decoded: any) => {
      if (err) {
        next(
          new AppLocalizedError(
            Messages.accountNotFound,
            StatusCodes.NOT_FOUND,
          ),
        );
      } else {
        const { email } = decoded;
        const user = await UserModel.findOne({ email });
        if (user) {
          await UserModel.findOneAndUpdate({ email }, { isVerified: true });
          sendLocalizedResponse({
            req,
            res,
            message: Messages.emailVerified,
            status: StatusCodes.OK,
          });
        } else {
          return next(
            new AppLocalizedError(
              Messages.accountNotFound,
              StatusCodes.NOT_FOUND,
            ),
          );
        }
      }
    });
  },
);

export const changePassword = catchAsyncError(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { password, newPassword } = req.body;
    const { userId } = req.user;

    // Verify current password
    const isPasswordValid = await bcrypt.compare(password, req.user.password);
    if (!isPasswordValid) {
      return next(
        new AppLocalizedError(
          Messages.currentPasswordIncorrect,
          StatusCodes.UNAUTHORIZED,
        ),
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, ROUNDS);

    await UserModel.findByIdAndUpdate(userId, { password: hashedPassword });

    return sendLocalizedResponse({
      req,
      res,
      message: Messages.passwordChangedSuccessfully,
      status: StatusCodes.OK,
    });
  },
);

export const allUsers = Factory.getAllItems(UserModel, {});
