import { getFromEnv } from "./utils/getFromEnv.js"
import { connectToMongoDb } from "./database/connectToMongo.js"
import { logBlueMsg, logErrMsg } from "./utils/console/log.js"
import { router } from "./router.js"

const { port } = getFromEnv()

connectToMongoDb()

router.listen(port, () => logBlueMsg(`Dr OnCall Api listening on port ${port}!`))

process.on('unhandledRejection', (err) => {
    logErrMsg("unhandledRejection" + err)
})


