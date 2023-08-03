"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSAccount = void 0;
var execSync = require("child_process").execSync;
var AWSAccount = /** @class */ (function () {
    function AWSAccount() {
    }
    /**
     * TODO: Add method description
     * @returns
     */
    AWSAccount.prototype.fetchStackList = function () {
        var command = "aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE ROLLBACK_COMPLETE UPDATE_COMPLETE UPDATE_ROLLBACK_COMPLETE --region ".concat(this.region, " --query 'sort_by(StackSummaries, &StackName)[*].[StackName, StackStatus, DriftInformation.StackDriftStatus, DriftInformation.LastCheckTimestamp]' --output table");
        return execSync(command, { encoding: "utf-8" });
    };
    /**
     *
     */
    AWSAccount.prototype.getRegion = function () {
        return this.region;
    };
    /**
     *
     */
    AWSAccount.prototype.setRegion = function (region) {
        if (region === null)
            throw new Error("Regions should not be null");
        this.region = region;
    };
    /**
     * TODO: Add method description
     * @returns boolean
     */
    AWSAccount.prototype.getStackNamesFromStackList = function () {
        try {
            var stackNames = this.fetchStackList();
            this.stackNamesList = stackNames
                .trim()
                .split(/\r?\n/)
                .slice(3)
                .map(function (row) { return row.split(/\s+/)[1]; })
                .filter(function (item) { return item !== undefined && item.trim() !== ""; });
            return true;
        }
        catch (error) {
            console.error("An error occurred while retrieving the stacks:", error);
            return false;
        }
    };
    /**
     * TODO: Add method description
     * @returns
     */
    AWSAccount.prototype.getStackNameList = function () {
        return this.stackNamesList;
    };
    /**
     * TODO: Add method description
     */
    AWSAccount.prototype.checkAllStacks = function () {
        if (this.getStackNamesFromStackList()) {
            for (var i = 0; i < this.stackNamesList.length; i++) {
                var stackName = this.stackNamesList[i];
                var command = "aws cloudformation detect-stack-drift --stack-name ".concat(stackName, " --region ").concat(this.region);
                var index = i + 1;
                console.log("[Stack ".concat(index, " / ").concat(this.stackNamesList.length, "] - ").concat(command));
                execSync(command, { encoding: "utf-8" });
            }
        }
        else {
            console.log("The operation could not be executed.");
            return false;
        }
        return true;
    };
    /**
     *
     */
    AWSAccount.prototype.getAllDriftedStack = function () {
        var stacks = this.getAllStackWithStatus();
        var flag = stacks.includes("DRIFTED");
        if (!flag) {
            return "There are not drifted stack.";
        }
        var command = "aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE ROLLBACK_COMPLETE UPDATE_COMPLETE UPDATE_ROLLBACK_COMPLETE --region ".concat(this.region, " --query 'sort_by(StackSummaries, &StackName)[*].[StackName, StackStatus, DriftInformation.StackDriftStatus, DriftInformation.LastCheckTimestamp]' --output table | grep DRIFTED");
        return execSync(command, { encoding: "utf-8" });
    };
    /**
     *
     */
    AWSAccount.prototype.getAllStackWithStatus = function () {
        this.checkAllStacks();
        var command = "aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE ROLLBACK_COMPLETE UPDATE_COMPLETE UPDATE_ROLLBACK_COMPLETE --region ".concat(this.region, " --query 'sort_by(StackSummaries, &StackName)[*].[StackName, StackStatus, DriftInformation.StackDriftStatus, DriftInformation.LastCheckTimestamp]' --output table");
        return execSync(command, { encoding: "utf-8" });
    };
    return AWSAccount;
}());
exports.AWSAccount = AWSAccount;
