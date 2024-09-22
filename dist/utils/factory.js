import { catchAsyncError } from './catchAsyncError.js';
import { StatusCodes } from 'http-status-codes';
import { sendLocalizedResponse } from './response.js';
import { AppLocalizedError } from './AppError.js';
// @desc    Get All Items
// @route   GET /api/v1/......
// @access  Public
// export const getAllItems = <T>(Model: Model<T>, populate: string[] = [""], fields: string = "-__v") =>
//     catchAsyncError(
//         async (req: Request, res: Response, next: NextFunction) => {
//             //  1- find all data
//             const query = req.query as IQuery;
//             const mongoQuery = Model.find({}).select(fields);
//             if (populate.length > 0 && populate[0] !== "") {
//                 query.populate =
//                     query?.populate && query?.populate?.length > 0
//                         ? query.populate?.concat(populate.join(","))
//                         : populate.join(",");
//             }
//             // 2- get features
//             const { data, paginationResult } = await new ApiFeature(
//                 mongoQuery,
//                 query
//             )
//                 .populate()
//                 .filter()
//                 .limitFields()
//                 .search()
//                 .sort()
//                 .paginate();
//             // 3- get features
//             if (data.length === 0) {
//                 return next(
//                     new ApiError(
//                         {
//                             en: "not found",
//                             ar: "لا يوجد اي نتيجة",
//                         },
//                         StatusCodes.NOT_FOUND
//                     )
//                 );
//             }
//             let categoryMeta;
//             let subcategoryMeta;
//             if (query && (query.category || query.subcategory)) {
//                 categoryMeta = await Meta.findOne({ reference: query.category });
//                 subcategoryMeta = await Meta.findOne({ reference: query.subcategory });
//             }
//             let MetaData = {
//                 categoryMeta,
//                 subcategoryMeta,
//             };
//             // 5- send response
//             res.status(StatusCodes.OK).json({
//                 status: Status.SUCCESS,
//                 results: data.length,
//                 paginationResult,
//                 data: data,
//                 MetaData,
//                 success_en: "found successfully",
//                 success_ar: "تم العثور بنجاح",
//             });
//         }
//     );
// @desc    Create New Item
// @route   POST /api/v1/......
// @access  Private
const createNewItem = (Model) => catchAsyncError(async (req, res, next) => {
    // 1- take data from request body
    const data = req.body;
    // 2- create new document in mongooseDB
    const document = await Model.create(data);
    // 3- send response
    return sendLocalizedResponse({
        req,
        res,
        message: {
            en: 'Created Successfully',
            ar: 'تم الانشاء بنجاح',
        },
        status: StatusCodes.CREATED,
        data: document,
    });
});
// @desc    Get Specific Item By Id
// @route   GET /api/v1/......
// @access  Public
const getOneItemById = (Model, populate = [''], fields = '-__v') => catchAsyncError(async (req, res, next) => {
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
        message: {
            en: 'Found Successfully',
            ar: 'تم العثور بنجاح',
        },
        data: document,
    });
});
// @desc    Get Specific Item By Slug
// @route   GET /api/v1/......
// @access  Public
const getOneItemBySlug = (Model, populate = [''], fields = '-__v') => catchAsyncError(async (req, res, next) => {
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
        message: {
            en: 'Found Successfully',
            ar: 'تم العثور بنجاح',
        },
        data: document,
    });
});
// @desc    Update Specific Item
// @route   PUT    /api/v1/.....
// @access  Private
const updateOneItemById = (Model, populate = ['']) => catchAsyncError(async (req, res, next) => {
    // 1- get id for item from params
    const { id } = req.params;
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
            ar: `${id}لا يوجداي نتيجة لهذا`,
        }, StatusCodes.NOT_FOUND));
    }
    // 4- save update
    await document.save();
    // 5- send response
    return sendLocalizedResponse({
        req,
        res,
        status: StatusCodes.OK,
        message: {
            en: 'Updated Successfully',
            ar: 'تم التعديل بنجاح',
        },
        data: document,
    });
});
// @desc    Delete Specific Item
// @route   DELETE    /api/v1/.....
// @access  Private
const deleteOneItemById = (Model) => catchAsyncError(async (req, res, next) => {
    // 1- get id for item from params
    const { id } = req.params;
    // 2- find item and delete in mongooseDB
    const document = await Model.findByIdAndDelete(id);
    // 3- check if item deleted
    if (!document) {
        return next(new AppLocalizedError({
            en: `Not Found Any Result For This Id ${id}`,
            ar: `${id}لا يوجداي نتيجة لهذا`,
        }, StatusCodes.NOT_FOUND));
    }
    // 4- send response
    return sendLocalizedResponse({
        req,
        res,
        status: StatusCodes.OK,
        message: {
            en: 'Deleted Successfully',
            ar: 'تم الحذف بنجاح',
        },
        data: document,
    });
});
export const Factory = {
    createNewItem,
    getOneItemById,
    getOneItemBySlug,
    updateOneItemById,
    deleteOneItemById,
};
