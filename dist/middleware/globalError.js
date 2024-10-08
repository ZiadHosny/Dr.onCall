import { getFromEnv } from '../utils/getFromEnv.js';
import { sendLocalizedResponse } from '../utils/response.js';
import { Messages } from '../utils/Messages.js';
export const globalErrorMiddleware = (err, req, res) => {
    const { mode } = getFromEnv();
    if (mode == 'dev') {
        devMode(err, req, res);
    }
    else {
        prodMode(err, req, res);
    }
};
const prodMode = (err, req, res) => {
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
const devMode = (err, req, res) => {
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
