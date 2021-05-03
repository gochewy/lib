"use strict";
exports.__esModule = true;
exports.createProjectDirectory = exports.configFileGenerator = exports.envCreator = exports.createConfig = exports.getDirName = exports.checkFile = void 0;
var fs_1 = require("fs");
var chalk = require("chalk");
var fs = require("fs");
var findUp = require('find-up');
var log = console.log;
var checkFile = function () {
    var cwd = process.cwd();
    var file = findUp.sync('project-config.json', {
        cwd: cwd,
        type: 'file'
    });
    if (file) {
        console.log("file found", file);
    }
    return file;
};
exports.checkFile = checkFile;
var getDirName = function () {
    return require('./../../config.json').directory;
};
exports.getDirName = getDirName;
var createConfig = function (dir) {
    var fileTemplate = "{\n    \"directory\": \"" + dir + "\"\n    }";
    fs_1.writeFileSync('./config.json', fileTemplate);
};
exports.createConfig = createConfig;
var envCreator = function (dir, subdir) {
    var data = fs_1.readFileSync("./../" + dir + "/" + subdir + "/sample.env");
    fs_1.writeFile("./../" + dir + "/" + subdir + "/.env", data, function (err) {
        if (err) {
            log(err);
        }
    });
};
exports.envCreator = envCreator;
var configFileGenerator = function (answers) {
    var template = {
        dev: {
            projectName: answers.name,
            modulesEnabled: {
                content: answers.isContent,
                admin: answers.isAdmin,
                web: true,
                server: answers.isServer,
                worker: answers.isWorker,
                graphql: answers.isGraphQL,
                auth: answers.isAuth,
                mobile: answers.isMobile
            }
        }
    };
    fs_1.writeFileSync("./../" + answers.name + "/project-config.json", JSON.stringify(template, null, 2));
};
exports.configFileGenerator = configFileGenerator;
var createProjectDirectory = function (directory) {
    fs.mkdirSync("./../" + directory, { recursive: true });
    log(chalk.greenBright("Created directory named: " + directory));
};
exports.createProjectDirectory = createProjectDirectory;
