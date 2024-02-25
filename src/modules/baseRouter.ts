import * as express from "express";
import { APP_NAME, BLOOD_TYPES } from "../utils/constants.js";

const baseRouter = express.Router()

baseRouter.get('/', (_, res: express.Response) => {
    res.send(`Hello From ${APP_NAME} Api!`)
})

export default baseRouter