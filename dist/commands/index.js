"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.stopDocker = exports.startDocker = exports.dockerCommandRunner = exports.installCustomApps = exports.installAllApps = exports.installMinimalProject = exports.addSubtrees = exports.initGitRepo = void 0;
var child_process_1 = require("child_process");
var path = require("path");
var files_1 = require("../files");
var modules = require('../../project.json').modules;
var config = require(path.resolve(process.cwd(), "chewy.json"));
var initGitRepo = function (directory) {
    child_process_1.execSync("cd " + directory + " && git init && git add . && git commit --allow-empty -n -m \"add subtree\"");
};
exports.initGitRepo = initGitRepo;
var addSubtrees = function (directory, module, url) {
    child_process_1.execSync("cd " + directory + " && git subtree add --prefix " + module + " " + url + " main --squash");
};
exports.addSubtrees = addSubtrees;
var installMinimalProject = function (answers) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, files_1.createProjectDirectory(answers.name)];
            case 1:
                _a.sent();
                return [4 /*yield*/, exports.initGitRepo(answers.name)
                    // Todo -> Decide if we want search and storage in install options
                ];
            case 2:
                _a.sent();
                // Todo -> Decide if we want search and storage in install options
                return [4 /*yield*/, exports.addSubtrees(answers.name, 'web', modules['web'].gitRepo)];
            case 3:
                // Todo -> Decide if we want search and storage in install options
                _a.sent();
                return [4 /*yield*/, exports.addSubtrees(answers.name, 'search', modules['search'].gitRepo)];
            case 4:
                _a.sent();
                return [4 /*yield*/, exports.addSubtrees(answers.name, 'storage', modules['storage'].gitRepo)];
            case 5:
                _a.sent();
                files_1.configFileGenerator(answers);
                files_1.rootGitIgnore(answers.name);
                files_1.rootReadmeFile(answers.name);
                return [2 /*return*/];
        }
    });
}); };
exports.installMinimalProject = installMinimalProject;
var installAllApps = function (answers) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.installMinimalProject(answers)];
            case 1:
                _a.sent();
                Object.keys(modules).map(function (module) {
                    if (module !== 'web') {
                        exports.addSubtrees(answers.name, module, modules[module].gitRepo);
                    }
                });
                return [2 /*return*/];
        }
    });
}); };
exports.installAllApps = installAllApps;
var installCustomApps = function (answers) { return __awaiter(void 0, void 0, void 0, function () {
    var answer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.installMinimalProject(answers)];
            case 1:
                _a.sent();
                for (answer in answers) {
                    if (answers.hasOwnProperty(answer)) {
                        if (answer !== 'name') {
                            console.log(modules[answer]);
                            if (modules[answer].enabled === true)
                                exports.addSubtrees(answers.name, answer, modules[answer].gitRepo);
                        }
                    }
                }
                return [2 /*return*/];
        }
    });
}); };
exports.installCustomApps = installCustomApps;
var dockerCommandRunner = function (cmd) {
    var modules = config.modules;
    var string = '';
    Object.entries(modules).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (value.containerized === true) {
            string = string + (" -f " + key + "/docker-compose.yml");
        }
    });
    var command = "docker-compose -f docker-compose.yml" + string + " " + cmd;
    child_process_1.exec("" + command, function (error, stdout, stderr) {
        if (error) {
            console.error("Error: " + error);
        }
        console.log(stdout);
        console.error("Error: " + stderr);
    });
};
exports.dockerCommandRunner = dockerCommandRunner;
var startDocker = function () {
    exports.dockerCommandRunner('up -d');
};
exports.startDocker = startDocker;
var stopDocker = function () {
    exports.dockerCommandRunner('down');
};
exports.stopDocker = stopDocker;
