import express from 'express';
import { getFromEnv } from './utils/getFromEnv.js';
import { connectToMongoDb } from './database/connectToMongo.js';
import { logBlueMsg, logErrMsg } from './utils/console/log.js';
import router from './router.js';
import { APP_NAME } from './utils/constants.js';
// import { initSocket } from './database/iOConnection.js';
import http from 'http';
// import { setDummyData } from './helpers/dummyData.helper.js';
// import { useAutomation } from './automations/corn.js';

const { port } = getFromEnv();
const app = express();

const server = http.createServer(app);

await connectToMongoDb();

// useAutomation()
// await setDummyData();

app.use('/', router);

// export const io = initSocket(server);

server.listen(port, () =>
  logBlueMsg(`${APP_NAME} Api listening on port ${port}!`),
);

process.on('unhandledRejection', (err) => {
  logErrMsg('unhandledRejection' + err);
});
