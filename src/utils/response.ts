import { Response, Request } from 'express';
import { LangType } from './types.js';
import { PaginationInfo } from './ApiFeature.js';

type SendResponseType<T> = {
  res: Response;
  status: number;
  message: T;
  page?: number;
  data?: any;
  isError?: boolean;
  details?: string;
  paginationInfo?: PaginationInfo;
  length?: number;
};

export const sendResponse = ({
  res,
  status,
  message,
  page,
  data,
  isError = false,
}: SendResponseType<string>) => {
  const messageOrError = isError ? { error: message } : { message };

  const response = { messageOrError, status, data };

  const sendedData = page ? { ...response, page } : response;
  return res.status(status).send(sendedData);
};

interface SendLocalizedType extends SendResponseType<LangType> {
  req: Request;
}

export const sendLocalizedResponse = ({
  req,
  res,
  status = 500,
  message,
  isError = false,
  page,
  data,
  details,
  paginationInfo,
  length,
}: SendLocalizedType) => {
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
