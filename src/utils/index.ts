import * as chalk from "chalk";
const log = console.log;
export const printInstallOptions = () => {
    log()
    log(chalk.magenta("=============================="))
    log(chalk.magenta("===Chewy-CLI install options=="))
    log(chalk.magenta("=============================="))
    log()
    log(chalk.greenBright("To install with no extra modules use init minimal"))
    log(chalk.greenBright("To install with all modules use init all"))
    log(chalk.greenBright("To install with options to install modules use init custom"))
    log()
}
