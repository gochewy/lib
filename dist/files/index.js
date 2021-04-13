"use strict";
exports.__esModule = true;
exports.fileGenerator = exports.envCreator = exports.help = exports.checkFile = void 0;
var fs_1 = require("fs");
var findUp = require('find-up');
var checkFile = function () {
    var cwd = process.cwd();
    var file = findUp.sync('package.json', {
        cwd: cwd,
        type: 'file'
    });
    if (file) {
        console.log("file found", file);
    }
    return file;
};
exports.checkFile = checkFile;
var help = function () { return "rein gell"; };
exports.help = help;
var envCreator = function (dir, subdir) {
    // eslint-disable-next-line no-console
    var log = console.log;
    var data = fs_1.readFileSync("./../" + dir + "/" + subdir + "/sample.env");
    fs_1.writeFile("./../" + dir + "/" + subdir + "/.env", data, function (err) {
        if (err) {
            log(err);
        }
    });
};
exports.envCreator = envCreator;
var fileGenerator = function (answers, dir) {
    var template = "{\n  \"dev\": {\n  \"projectName\": \"Chewy-Stack\",\n    \"modulesEnabled\": {\n      \"directus\": true,\n      \"appsmith\": " + answers.isAppsmith + ",\n      \"client\": true,\n      \"server\": true,\n      \"worker\": true\n  },\n  \"servicesEnabled\": {\n    \"rabbitMQ\": " + answers.isRabbitMQ + "\n  }\n}\n}";
    fs_1.writeFileSync("./../" + dir + "/project-config.json", template);
};
exports.fileGenerator = fileGenerator;
