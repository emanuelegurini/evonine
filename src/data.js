"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuOptions = exports.awsRegionMap = exports.AwsRegion = void 0;
var AwsRegion;
(function (AwsRegion) {
    AwsRegion["US_EAST_1"] = "us-east-1";
    AwsRegion["US_EAST_2"] = "us-east-2";
    AwsRegion["US_WEST_1"] = "us-west-1";
    AwsRegion["US_WEST_2"] = "us-west-2";
    AwsRegion["EU_WEST_1"] = "eu-west-1";
    AwsRegion["EU_WEST_2"] = "eu-west-2";
    AwsRegion["EU_SOUTH_1"] = "eu-south-1";
    AwsRegion["EU_CENTRAL_1"] = "eu-central-1";
    AwsRegion["AP_SOUTHEAST_1"] = "ap-southeast-1";
    AwsRegion["AP_SOUTHEAST_2"] = "ap-southeast-2";
    AwsRegion["AP_NORTHEAST_1"] = "ap-northeast-1";
    AwsRegion["AP_NORTHEAST_2"] = "ap-northeast-2";
    AwsRegion["SA_EAST_1"] = "sa-east-1";
    AwsRegion["CA_CENTRAL_1"] = "ca-central-1";
    AwsRegion["CN_NORTH_1"] = "cn-north-1";
    AwsRegion["CN_NORTHWEST_1"] = "cn-northwest-1";
    AwsRegion["AP_EAST_1"] = "ap-east-1";
    AwsRegion["ME_SOUTH_1"] = "me-south-1";
    AwsRegion["AF_SOUTH_1"] = "af-south-1";
})(AwsRegion || (exports.AwsRegion = AwsRegion = {}));
exports.awsRegionMap = {
    "1": AwsRegion.US_EAST_1,
    "2": AwsRegion.US_EAST_2,
    "3": AwsRegion.US_WEST_1,
    "4": AwsRegion.US_WEST_2,
    "5": AwsRegion.EU_WEST_1,
    "6": AwsRegion.EU_WEST_2,
    "7": AwsRegion.EU_CENTRAL_1,
    "8": AwsRegion.AP_SOUTHEAST_1,
    "9": AwsRegion.AP_SOUTHEAST_2,
    "10": AwsRegion.AP_NORTHEAST_1,
    "11": AwsRegion.AP_NORTHEAST_2,
    "12": AwsRegion.SA_EAST_1,
    "13": AwsRegion.CA_CENTRAL_1,
    "14": AwsRegion.CN_NORTH_1,
    "15": AwsRegion.CN_NORTHWEST_1,
    "16": AwsRegion.AP_EAST_1,
    "17": AwsRegion.ME_SOUTH_1,
    "18": AwsRegion.AF_SOUTH_1,
    "19": AwsRegion.EU_SOUTH_1,
};
exports.menuOptions = {
    1: "Log all Stack name",
    2: "Check all stacks",
    3: "Log all drifted stack",
    4: "Log table with all stack status",
    5: "Print all stack names in a TXT file",
    6: "Print all drifted stack in a TXT file",
};
