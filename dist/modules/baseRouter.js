import * as express from "express";
import { APP_NAME } from "../utils/constants.js";
const baseRouter = express.Router();
baseRouter.get('/', (_, res) => {
    res.send(`Hello From ${APP_NAME} Api!`);
});
export default baseRouter;
