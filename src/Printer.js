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
        var fileName = this.getFileName();
        if (typeof this.data === "string") {
            fs.writeFileSync(fileName, this.data, { encoding: "utf-8" });
        }
        else {
            fs.writeFileSync(fileName, this.data.join("\n"), { encoding: "utf-8" });
        }
        console.log("Saved in ".concat(fileName));
    };
    /**
     * Return file name using the following format
     * <STACKNAME_DD-MM-YYYY_HH-mm.txt>
     */
    Printer.prototype.getFileName = function () {
        var today = new Date();
        var dd = today.getDate().toString().padStart(2, "0");
        var MM = (today.getMonth() + 1).toString().padStart(2, "0");
        var YYYY = today.getUTCFullYear().toString();
        var HH = today.getHours().toString().padStart(2, "0");
        var mm = today.getMinutes().toString().padStart(2, "0");
        return "stack_".concat(dd, "-").concat(MM, "-").concat(YYYY, "_").concat(HH, "-").concat(mm, ".txt");
    };
    return Printer;
}());
exports.Printer = Printer;
