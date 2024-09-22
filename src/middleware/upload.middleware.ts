import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import ApiError from '../utils/ApiError';
import { catchAsyncError } from '../utils/catchAsyncError.js';
import multer from 'multer';

export enum IImageType {
  PNG = 'png',
  JPEG = 'jpeg',
  JPG = 'jpg',
  GIF = 'gif',
  WEBP = 'webp',
  SVG = 'svg',
}

const options = (path: string) => {
  const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: Function) => {
      cb(null, `Uploads/${path}/`);
    },
    filename: (req: Request, file: Express.Multer.File, cb: Function) => {
      cb(null, `${uuid()}_${file.originalname}`);
    },
  });

  return multer({ storage, fileFilter });
};

const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else cb(new AppError('The file should be an image type', 400), false);
};

export const uploadSingleImage = (field: string, path: string) => {
  return options(path).single(field);
};

export const uploadMultipleImage = (
  fields: { name: string; maxCount: number }[],
  path: string,
) => {
  return options(path).fields(fields);
};

// @desc    Upload Image
// @route   POST /api/v1/upload/image
// @access  public (Admin)
export const uploadImage = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      w,
      h,
      type = IImageType.PNG,
      quality = 90 as number,
    } = req.query as {
      w: string;
      h: string;
      type: IImageType;
      quality: string;
    };
    const { buffer } = req?.file as Express.Multer.File;

    // check if the type is valid

    if (!Object.values(IImageType).includes(type.toLowerCase() as IImageType)) {
      return next(new Error('Invalid image type'));
    }

    const baseImage = w && h ? sharp(buffer).resize(+w, +h) : sharp(buffer);
    const filename = `${Date.now()}-${Math.random()}-quality-${quality}`;

    switch (type) {
      case 'jpeg':
        await baseImage
          .toFormat(`jpeg`)
          .jpeg({ quality: +quality })
          .toFile(`./uploads/${filename}.jpeg`);
        break;
      case 'jpg':
        await baseImage
          .toFormat(`jpg`)
          .jpeg({ quality: +quality })
          .toFile(`./uploads/${filename}.jpg`);
        break;
      case 'gif':
        await baseImage.toFormat(`gif`).toFile(`./uploads/${filename}.gif`);
        break;
      case 'webp':
        await baseImage
          .toFormat(`webp`)
          .webp({ quality: +quality })
          .toFile(`./uploads/${filename}.webp`);
        break;
      case 'svg':
        await baseImage.toFormat(`svg`).toFile(`./uploads/${filename}.svg`);
        break;
      default:
        await baseImage
          .toFormat(`png`)
          .png({ quality: +quality })
          .toFile(`./uploads/${filename}.png`);
    }

    const imageUrl = `${process.env.APP_URL}/uploads/${filename}.${type}`;
    const image = `${filename}.${type}`;
    res.status(200).json({ imageUrl, image });
  },
);

// @desc    Upload File
// @route   POST /api/v1/upload/file
// @access  public (Admin)
export const uploadFile = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ fileUrl: req.body.fileUrl, file: req.body.file });
  },
);

// @desc    Upload Files
// @route   POST /api/v1/upload/files
// @access  public (Admin)
export const uploadFiles = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.files) {
      return next(
        new ApiError(
          { ar: 'لم يتم اختيار الملفات', en: 'No files selected' },
          400,
        ),
      );
    }

    const files = (req.files as Express.Multer.File[])?.map(
      (file: Express.Multer.File) => file?.filename,
    );

    res.status(200).json({ files });
  },
);
