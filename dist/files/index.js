"use strict";
exports.__esModule = true;
exports.rootDockerFile = exports.rootReadmeFile = exports.createAppConfigExpo = exports.rootGitIgnore = exports.createGitIgnoreAdmin = exports.createProjectDirectory = exports.configFileGenerator = exports.envCreator = exports.createConfig = exports.getDirName = exports.checkFile = void 0;
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
    var data = fs_1.readFileSync(dir + "/" + subdir + "/sample.env");
    fs_1.writeFile(dir + "/" + subdir + "/.env", data, function (err) {
        if (err) {
            log(err);
        }
    });
};
exports.envCreator = envCreator;
var configFileGenerator = function (answers) {
    var template = {
        "projectName": "" + answers.name,
        "modules": {
            "admin": {
                "enabled": answers.admin,
                "gitRepo": "https://github.com/gochewy/admin.git",
                "containerized": true
            },
            "content": {
                "enabled": answers.content,
                "gitRepo": "https://github.com/gochewy/content.git",
                "containerized": false
            },
            "graphql": {
                "enabled": answers.graphql,
                "gitRepo": "https://github.com/gochewy/graphql.git",
                "containerized": true
            },
            "auth": {
                "enabled": answers.auth,
                "gitRepo": "https://github.com/gochewy/auth.git",
                "containerized": true
            },
            "server": {
                "enabled": answers.server,
                "gitRepo": "https://github.com/gochewy/server.git",
                "containerized": true
            },
            "worker": {
                "enabled": answers.worker,
                "gitRepo": "https://github.com/gochewy/worker.git",
                "containerized": true
            },
            "mobile": {
                "enabled": answers.mobile,
                "gitRepo": "https://github.com/gochewy/mobile.git",
                "containerized": false
            },
            "web": {
                "enabled": true,
                "gitRepo": "https://github.com/gochewy/web.git",
                "containerized": false
            },
            "analytics": {
                "enabled": answers.analytics,
                "gitRepo": "https://github.com/gochewy/analytics.git",
                "containerized": true
            },
            "business-intelligence": {
                "enabled": answers["business-intelligence"],
                "gitRepo": "https://github.com/gochewy/business-intelligence.git",
                "containerized": true
            }
        }
    };
    fs_1.writeFileSync(answers.name + "/chewy.json", JSON.stringify(template, null, 2));
};
exports.configFileGenerator = configFileGenerator;
var createProjectDirectory = function (directory) {
    fs.mkdirSync("" + directory, { recursive: true });
    log(chalk.greenBright("Created directory named: " + directory));
};
exports.createProjectDirectory = createProjectDirectory;
var createGitIgnoreAdmin = function (dir) {
    var fileContent = "/data";
    fs.appendFileSync(dir + "/admin/.gitignore", fileContent);
};
exports.createGitIgnoreAdmin = createGitIgnoreAdmin;
var rootGitIgnore = function (dir) {
    fs_1.writeFileSync(dir + "/.gitignore", constants_1.gitignoreTemplate);
};
exports.rootGitIgnore = rootGitIgnore;
var createAppConfigExpo = function (answers) {
    var template = "// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types\nexport default ({ config }) => {\n  return {\n    ...config,\n    extra: {\n      name: '" + answers.name + "',\n      graphql: " + answers.isGraphQL + ",\n      auth: " + answers.isAuth + ",\n    },\n  };\n};";
    fs_1.writeFileSync(answers.name + "/mobile/app.config.js", template);
};
exports.createAppConfigExpo = createAppConfigExpo;
var rootReadmeFile = function (dir) {
    fs_1.writeFileSync(dir + "/README.md", constants_1.readmeFileTemplate);
};
exports.rootReadmeFile = rootReadmeFile;
var rootDockerFile = function (dir) {
    var dockerFile = "version: '3.8'\n## Base docker-compose file for all other ones in this project\n";
    fs_1.writeFileSync("" + dir, dockerFile);
};
exports.rootDockerFile = rootDockerFile;
