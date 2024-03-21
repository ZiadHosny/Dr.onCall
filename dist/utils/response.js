export const sendResponse = ({ res, status, message, page, data }) => {
    const response = { message, status, data };
    const sendedData = page ? { ...response, page } : response;
    return res.status(status).send(sendedData);
};
