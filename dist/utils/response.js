export const sendResponse = ({ res, status, message, page, data }) => {
    const response = { message, status, data };
    const sendedData = page ? { ...response, page } : response;
    return res.status(status).send(sendedData);
};
export const sendLocalizedResponse = ({ req, res, status, message, page, data }) => {
    // // Get the preferred language from the Accept-Language header or default to English
    const lang = req.headers['accept-language']?.includes('ar') ? 'ar' : 'en';
    const response = {
        message: lang === 'ar' ? message.ar : message.en,
        data,
    };
    const sendedData = page ? { ...response, page } : response;
    return res.status(status).send(sendedData);
};
