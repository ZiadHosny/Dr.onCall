import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { getFromEnv } from '../utils/getFromEnv.js';
import { logErrMsg, logErrInfoMsg, logSuccessMsg, } from '../utils/console/log.js';
import { userModel } from '../models/user.model.js';
import { ROUNDS } from '../utils/constants.js';
const createAdmin = async () => {
    const users = await userModel.find({});
    if (users.length < 1) {
        await userModel.create({
            name: 'Doctor onCall',
            email: 'doctor@oo.com',
            isVerified: true,
            isActive: true,
            phone: '01110146112',
            password: await bcrypt.hash('123', ROUNDS),
            type: 'doctor',
        });
        logSuccessMsg('Admin Created Successfully');
    }
};
export const connectToMongoDb = async () => {
    const { mongoDBUrl } = getFromEnv();
    try {
        await mongoose.connect(mongoDBUrl);
        await createAdmin();
        console.log(mongoDBUrl, 'zzzzzzzzzzzzzzzz');
        logSuccessMsg(`Connect To Mongo DB Successfully`);
    }
    catch (err) {
        logErrMsg('Error when connect to Mongo DB');
        logErrInfoMsg(err);
    }
};
