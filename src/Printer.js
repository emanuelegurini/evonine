"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Printer = void 0;
var fs = require("fs");
var Printer = /** @class */ (function () {
    function Printer(data) {
        this.data = data;
    }
    /**
     * TODO: Add property description
     */
    Printer.prototype.printData = function () {
        var today = new Date();
        var fileName = "stack_".concat(today.getDate(), "-").concat(today.getMonth() + 1, "-").concat(today.getFullYear(), "_").concat(today.getHours(), "-").concat(today.getMinutes(), ".txt");
        if (typeof this.data === "string") {
            fs.writeFileSync("stack.txt", this.data, { encoding: "utf-8" });
        }
        else {
            fs.writeFileSync(fileName, this.data.join("\n"), { encoding: "utf-8" });
        }
        console.log("Saved in ".concat(fileName));
    };
    return Printer;
}());
exports.Printer = Printer;
