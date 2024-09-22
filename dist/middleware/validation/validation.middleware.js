import { logBlueMsg } from '../../utils/console/log.js';
import { AppError } from '../../utils/AppError.js';
export const validation = (schema, reqPart) => {
    return (req, res, next) => {
        const body = JSON.parse(JSON.stringify(req[reqPart]));
        const { error } = schema.validate(body, { abortEarly: true });
        logBlueMsg(`Validation for request part:  ${reqPart}`);
        return error
            ? next(new AppError(error.message, 400, error.details))
            : next();
    };
};
