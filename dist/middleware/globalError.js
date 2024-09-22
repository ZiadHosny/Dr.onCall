import { getFromEnv } from '../utils/getFromEnv.js';
import { sendLocalizedResponse } from '../utils/response.js';
export const globalErrorMiddleware = (err, req, res, __) => {
    const { mode } = getFromEnv();
    if (mode == 'dev') {
        devMode(err, req, res);
    }
    else {
        prodMode(err, req, res);
    }
};
const prodMode = (err, req, res) => {
    sendLocalizedResponse({
        message: err.localizedMessage,
        res,
        req,
        status: err.statusCode,
    });
};
const devMode = (err, req, res) => {
    sendLocalizedResponse({
        message: err.localizedMessage,
        res,
        req,
        status: err.statusCode,
    });
};
