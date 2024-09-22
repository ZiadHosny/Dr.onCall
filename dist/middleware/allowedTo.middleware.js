import { StatusCodes } from "http-status-codes";
import { catchAsyncError } from "../utils/catchAsyncError.js";
import { Role } from "../modules/user/user.interface.js";
import { AppLocalizedError } from "../utils/AppError.js";
export const allowedTo = (...roles) => catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    // if rule is guest ant it's not in roles array then return error please login first
    if (!roles.includes(Role.Guest) && role === Role.Guest) {
        return next(new AppLocalizedError({
            en: "Please Login First",
            ar: "سجل دخول اولا"
        }, StatusCodes.ACCEPTED));
    }
    // 1) access roles
    // 2) access registered user (req.user.role)
    if (!roles.includes(req.user.role)) {
        return next(new AppLocalizedError({
            en: "You Are Not Allowed To Access This Route",
            ar: "غير مصرح لك",
        }, StatusCodes.FORBIDDEN));
    }
    next();
});
