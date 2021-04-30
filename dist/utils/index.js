"use strict";
exports.__esModule = true;
exports.printInstallOptions = void 0;
var chalk = require("chalk");
var log = console.log;
var printInstallOptions = function () {
    log();
    log(chalk.magenta("=============================="));
    log(chalk.magenta("===Chewy-CLI install options=="));
    log(chalk.magenta("=============================="));
    log();
    log(chalk.greenBright("To install with no extra modules use init minimal"));
    log(chalk.greenBright("To install with all modules use init all"));
    log(chalk.greenBright("To install with options to install modules use init custom"));
    log();
};
exports.printInstallOptions = printInstallOptions;
