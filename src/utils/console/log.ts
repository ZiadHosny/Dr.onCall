import chalk from 'chalk'

const log = console.log
const line = '--------------------------------------------'

export const logErrMsg = (message: any) => {
    log(chalk.red.bold(message))
    log(chalk.gray(line))
}

export const logErrInfoMsg = (message: any) => {
    log(chalk.black.bgRed(message))
    log(chalk.gray(line))
}

export const logSuccessMsg = (message: string) => {
    log(chalk.green.bold(message))
    log(chalk.gray(line))
}

export const logBlueMsg = (message: string) => {
    log(chalk.blue.bold(message))
    log(chalk.gray(line))
}

export const logMsg = (message: string) => {
    log(chalk.bold(message))
    log(chalk.gray(line))
}


