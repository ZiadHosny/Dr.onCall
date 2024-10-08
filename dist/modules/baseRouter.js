import { Router } from 'express';
import { APP_NAME } from '../utils/constants.js';
const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <title>Dr.On Call Api</title>
    <style>
    body {
      background-color: black;
      color: white;
      margin: 0;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-family: sans-serif;
    }
    h1 {
      z-index: 1000;
      position: fixed;
      font-size: 4em;
      box-shadow: rgba(240, 46, 170, 0.4) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px;   
    }
  </style>
  </head>
  <body>
    <canvas></canvas>
    <h1>${APP_NAME} Api!</h1>
    <script src="animatedColors.js"></script>
  </body>
</html>
`;
const router = Router();
router.get('/', (_, res) => {
    res.send(htmlContent);
});
export const baseRouter = router;
