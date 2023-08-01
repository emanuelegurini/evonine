const readline = require("readline");

import { AWSAccount } from "./AWSAccount";
import { Printer } from "./Printer";
import { menuOptions, awsRegionMap } from "./data";

export class Menu {
  private rl;
  private awsAccount;

  constructor() {
    this.awsAccount = new AWSAccount();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  /**
   * TODO: Add property description
   */
  public print(header: string, options: { [key: number]: string }) {
    console.log("");
    console.log(header);
    for (const key in options) {
      console.log(`${key}. ${options[key]}`);
    }
    console.log("Press x to exit");
    console.log("");
  }

  /**
   * TODO: Add method description
   */
  public async start() {
    let option: string;

    do {
      this.print("Select your region:", awsRegionMap);
      option = await this.getInput();

      const selectedRegion = awsRegionMap[option];
      if (selectedRegion) {
        await this.awsAccount.setRegion(selectedRegion);
        console.log(
          "\x1b[42m",
          "Selected region:",
          this.awsAccount.getRegion(),
          "\x1b[0m"
        );
      } else {
        console.log("Invalid option. Please try again.");
      }

      do {
        this.print("Menu", menuOptions);
        option = await this.getInput();

        const options = this.getMenuOptions();
        const selectedOption = options[option];
        if (selectedOption) {
          await selectedOption();
          console.log(
            "\x1b[45m",
            "Selected option:",
            menuOptions[option],
            "\x1b[0m"
          );
        } else {
          console.log("Invalid option. Please try again.");
        }
      } while (option !== "x");
    } while (option !== "x");

    this.rl.close();
  }

  /**
   * TODO: Add method description
   */
  public getMenuOptions() {
    return {
      "1": () => this.logAllStackNames(),
      "2": () => this.checkAllStacks(),
      "3": () => this.logAllDriftedStack(),
      "4": () => this.printAllStackNamesOnTXTFile(),
      "5": () => this.printAllDriftedStackOnTXTFile(),
    };
  }

  /**
   * TODO: Add method description
   */
  public getInput(): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question("Enter your option: ", (answer) => {
        resolve(answer.trim().toLowerCase());
      });
    });
  }

  /**
   * TODO: Add method description
   */
  public async printAllStackNamesOnTXTFile() {
    try {
      console.log("Start..");
      console.log("Check for AWS Stack names..");

      await this.awsAccount.getStackNamesFromStackList();
      const stackNames = await this.awsAccount.getStackNameList();
      console.log(stackNames);
      const printer = new Printer(stackNames);
      await printer.printData();
      console.log("Stack names saved on .txt file.");
      console.log("Check in your directory.");
    } catch (error) {
      console.error("Error during the execution:", error);
    }
  }

  /**
   * TODO: Add method description
   */
  public async logAllStackNames() {
    try {
      console.log("Start..");
      console.log("Check for AWS Stack names..");

      //const awsAccount = new AWSAccount("eu-west-1");
      await this.awsAccount.getStackNamesFromStackList();
      const stackNames = await this.awsAccount.getStackNameList();
      console.log("START =============================================");
      console.log(stackNames);
      console.log("=============================================== END");
    } catch (error: unknown) {
      console.error("Error during the execution:", error);
    }
  }

  /**
   * TODO: Add method description
   */
  public async checkAllStacks() {
    try {
      console.log("Start..");
      console.log("Check if all stack are in sync..");

      //const awsAccount = new AWSAccount("eu-west-1");
      this.awsAccount.checkAllStacks();
    } catch (error: unknown) {
      console.error("Error during the execution:", error);
    }
  }

  /**
   * TODO: Add method description
   */
  public async logAllDriftedStack() {
    try {
      console.log("Start..");
      console.log("Check if all stack are in sync..");

      //const awsAccount = new AWSAccount("eu-west-1");
      const stackNames = this.awsAccount.getAllDriftedStack();
      console.log("START =============================================");
      console.log(stackNames);
      console.log("=============================================== END");
    } catch (error: unknown) {
      console.error("Error during the execution:", error);
    }
  }

  /**
   * TODO: Add method description
   */
  public async printAllDriftedStackOnTXTFile() {
    try {
      console.log("Start..");
      console.log("Check for AWS Stack names..");

      //const awsAccount = new AWSAccount("eu-west-1");
      await this.awsAccount.getStackNamesFromStackList();
      const stackNames = await this.awsAccount.getAllDriftedStack();
      console.log(stackNames);
      const printer = new Printer(stackNames);
      await printer.printData();
      console.log("Stack names saved on .txt file.");
      console.log("Check in your directory.");
    } catch (error: unknown) {
      console.error("Error during the execution:", error);
    }
  }
}
