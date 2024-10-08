import { Router, Response } from 'express';
import { APP_NAME } from '../utils/constants.js';

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
      animation: backgroundAnimation 10s infinite alternate;
    }

      @keyframes backgroundAnimation {
      0% {
        background-color: #3498db; /* Blue */
      }
      50% {
        background-color: #000; /* Red */
      }
      100% {
        background-color: #2ecc71; /* Green */
      }
    }

    /* Style the h1 element */
    h1 {
      font-size: 4em; /* Adjust font size as needed */
      box-shadow: rgba(240, 46, 170, 0.4) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px;    }
  </style>
  </head>
  <body>
    <h1>${APP_NAME} Api!</h1>
  </body>
</html>
`;

const router = Router();

router.get('/', (_, res: Response) => {
  res.send(htmlContent);
});

export const baseRouter = router;
