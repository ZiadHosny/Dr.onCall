import { catchAsyncError } from './catchAsyncError.js';
import { StatusCodes } from 'http-status-codes';
import { sendLocalizedResponse } from './response.js';
import { AppLocalizedError } from './AppError.js';
import { ApiFeature } from './ApiFeature.js';
import { Messages } from './Messages.js';
const getAllItems = (Model, { fields = '-__v', populate = [''], successMessage = Messages.foundSuccessfully, }) => {
    return catchAsyncError(async (req, res) => {
        //  1- find all data
        const query = req.query;
        const mongoQuery = Model.find({}).select(`${fields}`);
        if (populate.length > 0 && populate[0] !== '') {
            query.populate =
                query?.populate && query?.populate?.length > 0
                    ? query.populate?.concat(populate.join(','))
                    : populate.join(',');
        }
        // 2- get features
        const { data, paginationInfo } = await new ApiFeature(mongoQuery, query)
            .populate()
            // .filter()
            .fields()
            .search()
            .sort()
            .paginate();
        // 3- get features
        // if (data.length === 0) {
        //   return next(
        //     new AppLocalizedError(
        //       {
        //         en: "not found",
        //         ar: "لا يوجد اي نتيجة",
        //       },
        //       StatusCodes.NOT_FOUND
        //     )
        //   );
        // }
        sendLocalizedResponse({
            status: StatusCodes.OK,
            req,
            res,
            data: data,
            paginationInfo,
            message: successMessage,
        });
    });
};
const createNewItem = (Model, { successMessage = Messages.createdSuccessfully }) => {
    return catchAsyncError(async (req, res, next) => {
        // 1- take data from request body
        const data = req.body;
        const isExistBefore = await Model.findOne({ ...req.body });
        if (isExistBefore) {
            return next(new AppLocalizedError(Messages.isExistBefore, StatusCodes.CONFLICT));
        }
        // 2- create new document in mongooseDB
        const document = await Model.create(data);
        // 3- send response
        return sendLocalizedResponse({
            req,
            res,
            message: successMessage,
            status: StatusCodes.CREATED,
            data: document,
        });
    });
};
const getOneItemById = (Model, { populate = [''], fields = '-__v', successMessage = Messages.foundSuccessfully, }) => {
    return catchAsyncError(async (req, res, next) => {
        // 1- get id of item from params
        const { id } = req.params;
        // 2- find document from mongooseDB
        const query = Model.findById(id).select(fields);
        // 3- get document
        const document = populate?.length > 0 && populate[0] !== ''
            ? await query.populate(populate)
            : await query;
        // 4- check if document not found
        if (!document) {
            return next(new AppLocalizedError({
                en: `Not Found Any Result For This Id: ${id}`,
                ar: `${id} : id لا يوجد اي نتيجة بهذا باستخدم`,
            }, StatusCodes.NOT_FOUND));
        }
        // 5- send response
        return sendLocalizedResponse({
            req,
            res,
            status: StatusCodes.OK,
            message: successMessage,
            data: document,
        });
    });
};
const getOneItemBySlug = (Model, { populate = [''], fields = '-__v', successMessage = Messages.foundSuccessfully, }) => {
    return catchAsyncError(async (req, res, next) => {
        // 1- get id of item from params
        const { slug } = req.body;
        // 2- find document from mongooseDB
        let query = Model.findOne({ slug }).select(fields);
        // 3- get document
        const document = populate?.length > 0 && populate[0] !== ''
            ? await query.populate(populate)
            : await query;
        // 4- check if document not found
        if (!document) {
            return next(new AppLocalizedError({
                en: `Not Found Any Result For This slug : ${slug}`,
                ar: `${slug} : slug لا يوجد اي نتيجة بهذا باستخدم`,
            }, StatusCodes.NOT_FOUND));
        }
        // 5- send response
        return sendLocalizedResponse({
            req,
            res,
            status: StatusCodes.OK,
            message: successMessage,
            data: document,
        });
    });
};
const updateOneItemById = (Model, { populate = [''], successMessage = Messages.updatedSuccessfully, }) => {
    return catchAsyncError(async (req, res, next) => {
        // 1- get id for item from params
        const { id } = req.params;
        const isExistBefore = await Model.findOne({ ...req.body });
        if (isExistBefore) {
            return next(new AppLocalizedError(Messages.isExistBefore, StatusCodes.CONFLICT));
        }
        // 2- find item and update in mongooseDB
        const query = Model.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        // 3- get document
        const document = populate?.length > 0 && populate[0] !== ''
            ? await query.populate(populate)
            : await query;
        // 3- check if document not found
        if (!document) {
            return next(new AppLocalizedError({
                en: `Not Found Any Result For This Id ${id}`,
                ar: `${id} لا يوجد اي نتيجة لهذا `,
            }, StatusCodes.NOT_FOUND));
        }
        // 4- save update
        await document.save();
        // 5- send response
        return sendLocalizedResponse({
            req,
            res,
            status: StatusCodes.OK,
            message: successMessage,
            data: document,
        });
    });
};
const deleteOneItemById = (Model, { successMessage = Messages.deleteSuccessfully }) => {
    return catchAsyncError(async (req, res, next) => {
        // 1- get id for item from params
        const { id } = req.params;
        // 2- find item and delete in mongooseDB
        const document = await Model.findByIdAndDelete(id);
        // 3- check if item deleted
        if (!document) {
            return next(new AppLocalizedError({
                en: `Not Found Any Result For This Id ${id}`,
                ar: `${id} لا يوجد اي نتيجة لهذا `,
            }, StatusCodes.NOT_FOUND));
        }
        // 4- send response
        return sendLocalizedResponse({
            req,
            res,
            status: StatusCodes.OK,
            message: successMessage,
            data: document,
        });
    });
};
export const Factory = {
    getAllItems,
    createNewItem,
    getOneItemById,
    getOneItemBySlug,
    updateOneItemById,
    deleteOneItemById,
};
