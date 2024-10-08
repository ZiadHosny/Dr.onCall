export const sendResponse = ({ res, status, message, page, data, isError = false, }) => {
    const messageOrError = isError ? { error: message } : { message };
    const response = { messageOrError, status, data };
    const sendedData = page ? { ...response, page } : response;
    return res.status(status).send(sendedData);
};
export const sendLocalizedResponse = ({ req, res, status = 500, message, isError = false, page, data, details, paginationInfo, length, }) => {
    // // Get the preferred language from the Accept-Language header or default to English
    const lang = req.headers['accept-language']?.includes('ar') ? 'ar' : 'en';
    const messageOrError = isError
        ? { error: lang === 'ar' && message.ar ? message.ar : message.en }
        : { message: lang === 'ar' && message.ar ? message.ar : message.en };
    const response = {
        ...messageOrError,
        details,
        paginationInfo,
        length,
        data,
    };
    const sendedData = page ? { ...response, page } : response;
    return res.status(status).send(sendedData);
};
