import { Response, Request } from 'express';
import { LangType } from './types.js';

type SendResponseType<T> = {
  res: Response;
  status: number;
  message: T;
  page?: number;
  data?: any;
};

export const sendResponse = ({
  res,
  status,
  message,
  page,
  data,
}: SendResponseType<string>) => {
  const response = { message, status, data };

  const sendedData = page ? { ...response, page } : response;
  return res.status(status).send(sendedData);
};

interface SendLocalizedType extends SendResponseType<LangType> {
  req: Request;
}

export const sendLocalizedResponse = ({
  req,
  res,
  status,
  message,
  page,
  data,
}: SendLocalizedType) => {
  // // Get the preferred language from the Accept-Language header or default to English
  const lang = req.headers['accept-language']?.includes('ar') ? 'ar' : 'en';

  const response = {
    message: lang === 'ar' ? message.ar : message.en,
    data,
  };

  const sendedData = page ? { ...response, page } : response;
  return res.status(status).send(sendedData);
};
