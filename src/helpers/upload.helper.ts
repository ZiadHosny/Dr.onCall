import multer from 'multer';
import { AppLocalizedError } from '../utils/AppError.js';
import { StatusCodes } from 'http-status-codes';
import { Request } from 'express';

const memoryStorage = multer.memoryStorage();

export const uploadMemory = multer({
  storage: memoryStorage,
});

const diskStorage = (path: string) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `/uploads/${path}`);
    },
    filename: function (req, file, cb) {
      const imageExtension = file.mimetype.split('/')[1];
      const filename = `${file.originalname}-${Date.now()}.${imageExtension}`;
      const fileUrl = `${process.env.BASE_URL}/uploads/${filename}`;
      req.body.fileUrl = fileUrl;
      req.body.file = filename;

      cb(null, filename);
    },
  });

const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else
    cb(
      new AppLocalizedError(
        {
          ar: 'يجب أن يكون الملف من نوع صورة.',
          en: 'The file should be an image type.',
        },
        StatusCodes.UNSUPPORTED_MEDIA_TYPE,
      ),
      false,
    );
};

const uploadImage = (path: string) =>
  multer({ storage: diskStorage(path), fileFilter });

export const uploadSingleImage = (field: string, path: string) => {
  return uploadImage(path).single(field);
};

export const uploadMultipleImage = (
  fields: { name: string; maxCount: number }[],
  path: string,
) => {
  return uploadImage(path).fields(fields);
};
