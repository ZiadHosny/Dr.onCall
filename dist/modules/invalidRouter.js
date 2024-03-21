import * as express from "express";
import { AppError } from "../utils/AppError.js";
const invalidRouter = express.Router();
invalidRouter.get('/', (req, _, next) => {
    next(new AppError("invalid Url - can't access this End Point " + req.originalUrl, 404));
});
export default invalidRouter;
