"use strict";
exports.__esModule = true;
exports.rootReadmeFile = exports.createAppConfigExpo = exports.rootGitIgnore = exports.createGitIgnore = exports.createProjectDirectory = exports.configFileGenerator = exports.envCreator = exports.createConfig = exports.getDirName = exports.checkFile = void 0;
var fs_1 = require("fs");
var chalk = require("chalk");
var fs = require("fs");
var constants_1 = require("./constants");
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
        "projectName": "\"" + answers.name + "\"",
        "modules": {
            "admin": {
                "enabled": answers.admin,
                "gitRepo": "https://github.com/gochewy/admin.git"
            },
            "content": {
                "enabled": answers.content,
                "gitRepo": "https://github.com/gochewy/content.git"
            },
            "graphql": {
                "enabled": answers.graphQL,
                "gitRepo": "https://github.com/gochewy/graphql.git"
            },
            "auth": {
                "enabled": answers.auth,
                "gitRepo": "https://github.com/gochewy/auth.git"
            },
            "server": {
                "enabled": answers.server,
                "gitRepo": "https://github.com/gochewy/server.git"
            },
            "worker": {
                "enabled": answers.worker,
                "gitRepo": "https://github.com/gochewy/worker.git"
            },
            "mobile": {
                "enabled": answers.mobile,
                "gitRepo": "https://github.com/gochewy/mobile.git"
            },
            "analytics": {
                "enabled": answers.analytics,
                "gitRepo": "https://github.com/gochewy/analytics.git"
            },
            "business-intelligence": {
                "enabled": answers["business-intelligence"],
                "gitRepo": "https://github.com/gochewy/business-intelligence.git"
            }
        }
    };
    fs_1.writeFileSync("./../" + answers.name + "/chewy.json", JSON.stringify(template, null, 2));
};
exports.configFileGenerator = configFileGenerator;
var createProjectDirectory = function (directory) {
    fs.mkdirSync("./../" + directory, { recursive: true });
    log(chalk.greenBright("Created directory named: " + directory));
};
exports.createProjectDirectory = createProjectDirectory;
var createGitIgnore = function (dir) {
    var fileContent = "/data";
    fs.appendFileSync("./../" + dir + "/admin/.gitignore", fileContent);
};
exports.createGitIgnore = createGitIgnore;
var rootGitIgnore = function (dir) {
    fs_1.writeFileSync("./../" + dir + "/.gitignore", constants_1.gitignoreTemplate);
};
exports.rootGitIgnore = rootGitIgnore;
var createAppConfigExpo = function (answers) {
    var template = "// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types\nexport default ({ config }) => {\n  return {\n    ...config,\n    extra: {\n      name: '" + answers.name + "',\n      graphql: " + answers.isGraphQL + ",\n      auth: " + answers.isAuth + ",\n    },\n  };\n};";
    fs_1.writeFileSync("./../" + answers.name + "/mobile/app.config.js", template);
};
exports.createAppConfigExpo = createAppConfigExpo;
var rootReadmeFile = function (dir) {
    fs_1.writeFileSync("./../" + dir + "/.gitignore", constants_1.readmeFileTemplate);
};
exports.rootReadmeFile = rootReadmeFile;
