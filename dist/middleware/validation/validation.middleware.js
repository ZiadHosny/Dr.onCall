import { logBlueMsg } from '../../utils/console/log.js';
import { AppLocalizedError } from '../../utils/AppError.js';
import { StatusCodes } from 'http-status-codes';
export const validation = (schema, reqPart) => {
    return (req, res, next) => {
        const body = JSON.parse(JSON.stringify(req[reqPart]));
        const { error } = schema.validate(body, { abortEarly: true });
        logBlueMsg(`Validation for request part:  ${reqPart}`);
        const message = error?.details.map((i) => i.message).join(',') ?? 'Validation Error';
        return error
            ? next(new AppLocalizedError({
                ar: message,
                en: message,
            }, StatusCodes.BAD_REQUEST))
            : next();
    };
};
