import * as express from "express";
import { APP_NAME } from "../utils/constants.js";

const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <title>Dr.On Call Api</title>
    <style>
    /* Set the background color for the entire page */
    body {
      background-color: black;
      color: white; /* Set the text color to white for contrast */
      margin: 0;
      height: 100vh; /* Ensure the body takes up the full viewport height */
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
        font-family: sans-serif;
    }

    /* Style the h1 element */
    h1 {
      font-size: 4em; /* Adjust font size as needed */
    }
  </style>
  </head>
  <body>
    <h1>Hello From ${APP_NAME} Api!</h1>
  </body>
</html>
`;

const baseRouter = express.Router()

baseRouter.get('/', (_, res: express.Response) => {
    res.send(htmlContent)
})

export default baseRouter