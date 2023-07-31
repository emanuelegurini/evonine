import { AWSAccount } from "./AWSAccount";
import { Printer } from "./Printer";

class Main {
  constructor() {
    console.log("Start.");
    console.log("Check for AWS");

    let awsAccount = new AWSAccount("eu-west-1");
    const stackNames: Array<string> = awsAccount.getAllStackNames();
    let printer = new Printer(stackNames);
    printer.printData();
  }
}

const main = new Main();
