const readline = require("readline");

import { AWSAccount } from "./AWSAccount";
import { Printer } from "./Printer";

export class Menu {
  private rl;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  /**
   * TODO: Add property description
   */
  async start() {
    let option;
    do {
      this.print();
      option = await this.getInput();

      switch (option) {
        case "1":
          await this.printAllStackNamesOnTXTFile();
          break;
        case "2":
          await this.logAllStackNames();
          break;
        case "3":
          await this.checkAllStacks();
          break;
        case "4":
          await this.logAllDriftedStack();
          break;
        case "5":
          await this.printAllDriftedStackOnTXTFile();
          break;
        case "x":
          console.log("Exiting...");
          break;
        default:
          console.log("Invalid option. Please try again.");
      }
    } while (option !== "x");

    this.rl.close();
  }

  /**
   * TODO: Add property description
   */
  public print() {
    console.log("Menu:");
    console.log("1. Print all stack names in a TXT file");
    console.log("2. Log all Stack name");
    console.log("3. Check all stacks");
    console.log("4. Log all drifted stack");
    console.log("5. Print all drifted stack in a TXT file");
    console.log("Press x to exit");
  }

  /**
   * TODO: Add property description
   */
  public getInput() {
    return new Promise((resolve) => {
      this.rl.question("Enter your option: ", (answer) => {
        resolve(answer.trim().toLowerCase());
      });
    });
  }

  /**
   * TODO: Add property description
   */
  public async printAllStackNamesOnTXTFile() {
    try {
      console.log("Start..");
      console.log("Check for AWS Stack names..");

      const awsAccount = new AWSAccount("eu-west-1");
      await awsAccount.getStackNamesFromStackList();
      const stackNames = await awsAccount.getStackNameList();
      console.log(stackNames);
      const printer = new Printer(stackNames);
      await printer.printData();
      console.log("Stack names saved on .txt file.\nCheck in your directory.");
    } catch (error) {
      console.error("Errore durante l'esecuzione:", error);
    }
  }

  /**
   * TODO: Add property description
   */
  public async logAllStackNames() {
    console.log("Start..");
    console.log("Check for AWS Stack names..");

    const awsAccount = new AWSAccount("eu-west-1");
    await awsAccount.getStackNamesFromStackList();
    const stackNames = await awsAccount.getStackNameList();
    console.log("START =============================================");
    console.log(stackNames);
    console.log("============================================= END");
  }

  /**
   *
   */
  public async checkAllStacks() {
    console.log("Start..");
    console.log("Check if all stack are in sync..");

    const awsAccount = new AWSAccount("eu-west-1");
    awsAccount.checkAllStacks();
  }

  /**
   *
   */
  public async logAllDriftedStack() {
    console.log("Start..");
    console.log("Check if all stack are in sync..");

    const awsAccount = new AWSAccount("eu-west-1");
    const stackNames = awsAccount.getAllDriftedStack();
    console.log("START =============================================");
    console.log(stackNames);
    console.log("============================================= END");
  }

  /**
   * TODO: Add property description
   */
  public async printAllDriftedStackOnTXTFile() {
    try {
      console.log("Start..");
      console.log("Check for AWS Stack names..");

      const awsAccount = new AWSAccount("eu-west-1");
      await awsAccount.getStackNamesFromStackList();
      const stackNames = await awsAccount.getAllDriftedStack();
      console.log(stackNames);
      const printer = new Printer(stackNames);
      await printer.printData();
      console.log("Stack names saved on .txt file.\nCheck in your directory.");
    } catch (error) {
      console.error("Errore durante l'esecuzione:", error);
    }
  }
}
