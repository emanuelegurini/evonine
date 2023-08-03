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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
var readline = require("readline");
var AWSAccount_1 = require("./AWSAccount");
var Printer_1 = require("./Printer");
var data_1 = require("./data");
var Menu = /** @class */ (function () {
    function Menu() {
        this.awsAccount = new AWSAccount_1.AWSAccount();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }
    /**
     * TODO: Add property description
     */
    Menu.prototype.print = function (header, options) {
        console.log("");
        console.log(header);
        for (var key in options) {
            console.log("".concat(key, ". ").concat(options[key]));
        }
        console.log("Press x to exit");
        console.log("");
    };
    /**
     * TODO: Add method description
     */
    Menu.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var option, selectedRegion, options, selectedOption;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.print("Select your region:", data_1.awsRegionMap);
                        return [4 /*yield*/, this.getInput()];
                    case 1:
                        option = _a.sent();
                        selectedRegion = data_1.awsRegionMap[option];
                        if (selectedRegion) {
                            this.awsAccount.setRegion(selectedRegion);
                            console.log("\x1b[42m", "Selected region:", this.awsAccount.getRegion(), "\x1b[0m");
                        }
                        else {
                            console.log("Invalid option. Please try again.");
                        }
                        _a.label = 2;
                    case 2:
                        this.print("Menu", data_1.menuOptions);
                        return [4 /*yield*/, this.getInput()];
                    case 3:
                        option = _a.sent();
                        options = this.getMenuOptions();
                        selectedOption = options[option];
                        if (selectedOption) {
                            console.log("\x1b[45m", "Selected option:", data_1.menuOptions[option], "\x1b[0m");
                            selectedOption();
                        }
                        else {
                            console.log("Invalid option. Please try again.");
                        }
                        _a.label = 4;
                    case 4:
                        if (option !== "x") return [3 /*break*/, 2];
                        _a.label = 5;
                    case 5:
                        if (option !== "x") return [3 /*break*/, 0];
                        _a.label = 6;
                    case 6:
                        this.rl.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * TODO: Add method description
     */
    Menu.prototype.getInput = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.rl.question("Enter your option: ", function (answer) {
                resolve(answer.trim().toLowerCase());
            });
        });
    };
    /**
     * TODO: Add method description
     */
    Menu.prototype.printAllStackNamesOnTXTFile = function () {
        try {
            console.log("Start..");
            console.log("Check for AWS Stack names..");
            this.awsAccount.getStackNamesFromStackList();
            var stackNames = this.awsAccount.getStackNameList();
            console.log(stackNames);
            var printer = new Printer_1.Printer(stackNames);
            printer.printData();
            console.log("Stack names saved on .txt file.");
            console.log("Check in your directory.");
        }
        catch (error) {
            console.error("Error during the execution:", error);
        }
    };
    /**
     * TODO: Add method description
     */
    Menu.prototype.getMenuOptions = function () {
        var _this = this;
        return {
            "1": function () { return _this.logAllStackNames(); },
            "2": function () { return _this.checkAllStacks(); },
            "3": function () { return _this.logAllDriftedStack(); },
            "4": function () { return _this.getAllStatusStack(); },
            "5": function () { return _this.printAllStackNamesOnTXTFile(); },
            "6": function () { return _this.printAllDriftedStackOnTXTFile(); },
        };
    };
    /**
     * TODO: Add method description
     */
    Menu.prototype.logAllStackNames = function () {
        try {
            console.log("Start..");
            console.log("Check for AWS Stack names..");
            this.awsAccount.getStackNamesFromStackList();
            var stackNames = this.awsAccount.getStackNameList();
            console.log("START =============================================");
            console.log(stackNames);
            console.log("=============================================== END");
        }
        catch (error) {
            console.error("Error during the execution:", error);
        }
    };
    /**
     * TODO: Add method description
     */
    Menu.prototype.checkAllStacks = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    console.log("Start..");
                    console.log("Check if all stack are in sync..");
                    this.awsAccount.checkAllStacks();
                }
                catch (error) {
                    console.error("Error during the execution:", error);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * TODO: Add method description
     */
    Menu.prototype.logAllDriftedStack = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stackNames;
            return __generator(this, function (_a) {
                try {
                    console.log("Start..");
                    console.log("Check if all stack are in sync..");
                    stackNames = this.awsAccount.getAllDriftedStack();
                    console.log("START =============================================");
                    console.log(stackNames);
                    console.log("=============================================== END");
                }
                catch (error) {
                    console.error("Error during the execution:", error);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * TODO: Add method description
     */
    Menu.prototype.printAllDriftedStackOnTXTFile = function () {
        try {
            console.log("Start..");
            console.log("Check for AWS Stack names..");
            this.awsAccount.getStackNamesFromStackList();
            var stackNames = this.awsAccount.getAllDriftedStack();
            console.log(stackNames);
            var printer = new Printer_1.Printer(stackNames);
            printer.printData();
            console.log("Stack names saved on .txt file.");
            console.log("Check in your directory.");
        }
        catch (error) {
            console.error("Error during the execution:", error);
        }
    };
    Menu.prototype.getAllStatusStack = function () {
        try {
            console.log("Start..");
            console.log("Check if all stack are in sync..");
            var stackNames = this.awsAccount.getAllStackWithStatus();
            console.log("START =============================================");
            console.log(stackNames);
            console.log("=============================================== END");
        }
        catch (error) {
            console.error("Error during the execution:", error);
        }
    };
    return Menu;
}());
exports.Menu = Menu;
