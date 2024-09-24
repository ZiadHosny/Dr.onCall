import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { getFromEnv } from '../utils/getFromEnv.js';
import { logErrMsg, logErrInfoMsg, logSuccessMsg, } from '../utils/console/log.js';
import { userModel } from '../models/user.model.js';
import { ROUNDS } from '../utils/constants.js';
import { Role } from '../modules/user/user.interface.js';
const createSuperAdmin = async () => {
    const users = await userModel.find({});
    if (users.length < 1) {
        await userModel.create({
            name: 'Doctor On Call',
            email: 'superAdmin@email.com',
            isVerified: true,
            isActive: true,
            phone: '01110146112',
            password: await bcrypt.hash('123', ROUNDS),
            type: Role.SuperAdmin,
        });
        logSuccessMsg('Admin Created Successfully');
    }
};
export const connectToMongoDb = async () => {
    const { mongoDBUrl } = getFromEnv();
    try {
        await mongoose.connect(mongoDBUrl);
        await createSuperAdmin();
        logSuccessMsg(`Connect To Mongo DB Successfully`);
    }
    catch (err) {
        logErrMsg('Error when connect to Mongo DB');
        logErrInfoMsg(err);
    }
};
