import chalk from 'chalk';
const log = console.log;
const line = '--------------------------------------------';
export const logErrMsg = (message) => {
    log(chalk.red.bold(message));
    log(chalk.gray(line));
};
export const logErrInfoMsg = (message) => {
    log(chalk.black.bgRed(message));
    log(chalk.gray(line));
};
export const logSuccessMsg = (message) => {
    log(chalk.green.bold(message));
    log(chalk.gray(line));
};
export const logBlueMsg = (message) => {
    log(chalk.blue.bold(message));
    log(chalk.gray(line));
};
export const logMsg = (message) => {
    log(chalk.bold(message));
    log(chalk.gray(line));
};
