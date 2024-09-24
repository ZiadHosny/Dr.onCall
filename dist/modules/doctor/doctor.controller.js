import * as bcrypt from 'bcrypt';
import { AppLocalizedError } from '../../utils/AppError.js';
import { DoctorModel } from '../../models/doctor.model.js';
import { userModel } from '../../models/user.model.js';
import { getFromEnv } from '../../utils/getFromEnv.js';
import { sendLocalizedResponse } from '../../utils/response.js';
import { StatusCodes } from 'http-status-codes';
import { Factory } from '../../utils/factory.js';
import { catchAsyncError } from '../../utils/catchAsyncError.js';
import { Messages } from '../../utils/Messages.js';
export const addDoctor = catchAsyncError(async (req, res, next) => {
    const { name, email, password, phone, imageUrl, specialty, rating } = req.body;
    const { rounds } = getFromEnv();
    const user = await userModel.findOne({ email });
    if (user) {
        next(new AppLocalizedError(Messages.accountAlreadyExists, StatusCodes.CONFLICT));
    }
    else {
        bcrypt.hash(password, rounds, async (err, hash) => {
            if (err) {
                return next(new AppLocalizedError(Messages.hashingError, StatusCodes.INTERNAL_SERVER_ERROR));
            }
            const user = await userModel.create({
                name,
                email,
                password: hash,
                phone,
                type: 'doctor',
                isVerified: true,
            });
            await DoctorModel.insertMany({
                user: user._id,
                imageUrl,
                specialty,
                rating,
            });
            sendLocalizedResponse({
                res,
                req,
                status: 200,
                message: {
                    ar: 'تم اضافة الدكتور بنجاح',
                    en: 'Doctor Added Successfully',
                },
            });
        });
    }
});
export const updateDoctor = Factory.updateOneItemById(DoctorModel);
export const allDoctors = catchAsyncError(async (req, res) => {
    const doctors = await DoctorModel.find({}).populate('user');
    sendLocalizedResponse({
        message: {
            ar: 'تم الحصول على جميع الأطباء بنجاح',
            en: 'Get All Doctors Successfully',
        },
        res,
        req,
        status: StatusCodes.OK,
        data: doctors,
    });
});
// export const rateDoctor = expressAsyncHandler(async (req: Request, res: Response) => {
//     const { doctorId, rating } = req.body;
//     const updatedDoctor = await updateDoctorRating(doctorId, rating);
//     res.status(200).json(updatedDoctor);
//     const doctors = await DoctorModel.find({}).populate('user')
//     sendLocalizedResponse({
//         message: {
//             ar: 'تم الحصول على جميع الأطباء بنجاح',
//             en: 'Get All Doctors Successfully',
//         },
//         res,
//         req,
//         status: StatusCodes.OK,
//         data: doctors,
//     })
// })
