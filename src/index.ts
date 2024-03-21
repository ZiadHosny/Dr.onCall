import { getFromEnv } from "./utils/getFromEnv.js"
import { connectToMongoDb } from "./database/connectToMongo.js"
import { logBlueMsg, logErrMsg } from "./utils/console/log.js"
import { router } from "./router.js"
import { APP_NAME } from "./utils/constants.js"

const { port } = getFromEnv()

connectToMongoDb()

router.listen(port, () => logBlueMsg(`${APP_NAME} Api listening on port ${port}!`))

process.on('unhandledRejection', (err) => {
    logErrMsg("unhandledRejection" + err)
})


