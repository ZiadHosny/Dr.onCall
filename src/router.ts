import express from "express"
import cors from 'cors'
import morgan from 'morgan'
import { userRouter } from "./modules/user/user.router.js"
import messageRouter from "./modules/message/message.router.js"
import baseRouter from "./modules/baseRouter.js"
import invalidRouter from "./modules/invalidRouter.js"
import { globalErrorMiddleware } from "./middleware/globalError.js"
import { getFromEnv } from "./utils/getFromEnv.js"

const { mode } = getFromEnv()
const app = express()

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cors())

if (mode == "dev") {
    app.use(morgan("dev"));
}

//routes
app.use('/api', baseRouter)
app.use('/api/users', userRouter)
app.use('/api/messages', messageRouter)

// default Routes
app.use('*', invalidRouter)
app.use(globalErrorMiddleware)

export const router = app

// if (mode === 'prod') {
//     const __dirname = path.resolve();

//     app.use(express.static(path.join(__dirname, '/frontend/build')));

//     app.get('*', (req, res) =>
//         res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
//     );
// }