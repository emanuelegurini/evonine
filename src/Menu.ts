const readline = require("readline");

import { AWSAccount } from "./AWSAccount";
import { IMenu } from "./IMenu";
import { Printer } from "./Printer";
import { menuOptions, awsRegionMap } from "./data";

export class Menu implements IMenu {
  private _rl;
  private _awsAccount: AWSAccount;

  constructor() {
    this._awsAccount = new AWSAccount();
    this._rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  public getMenuOptions() {
    return {
      "1": () => this.logAllStackNames(),
      "2": () => this.checkAllStacks(),
      "3": () => this.logAllDriftedStack(),
      "4": () => this.getAllStatusStack(),
      "5": () => this.printAllStackNamesOnTXTFile(),
      "6": () => this.printAllDriftedStackOnTXTFile(),
    };
  }

  public print(header: string, options: { [key: number]: string }): void {
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
  private printHeader() {
    console.log(`
    ███████████████████████████████████████████████████████████████

      ███████╗██╗   ██╗ ██████╗ ███╗   ██╗██╗███╗   ██╗███████╗
      ██╔════╝██║   ██║██╔═══██╗████╗  ██║██║████╗  ██║██╔════╝
      █████╗  ██║   ██║██║   ██║██╔██╗ ██║██║██╔██╗ ██║█████╗  
      ██╔══╝  ╚██╗ ██╔╝██║   ██║██║╚██╗██║██║██║╚██╗██║██╔══╝  
      ███████╗ ╚████╔╝ ╚██████╔╝██║ ╚████║██║██║ ╚████║███████╗
      ╚══════╝  ╚═══╝   ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═══╝╚══════╝
                                                               
                         AWS Drift Detector

    ███████████████████████████████████████████████████████████████
      `);
  }

  private async selectRegion(): Promise<boolean> {
    this.print("Select your region:", awsRegionMap);
    const option: string = await this.getInput();

    if (option === "x") {
      return true; // Return true if user entered "x"
    }

    const selectedRegion = awsRegionMap[option];
    if (selectedRegion) {
      this._awsAccount.setRegion(selectedRegion);
      console.log(
        "\x1b[42m",
        "Selected region:",
        this._awsAccount.getRegion(),
        "\x1b[0m"
      );
    } else {
      console.log("Invalid region. Please try again.");
    }

    return false; // Return false to indicate that the user did not enter "x"
  }

  public async start(): Promise<void> {
    this.printHeader();

    let exit: boolean = false;
    do {
      exit = await this.selectRegion(); // Check if the user entered "x"

      if (!exit) {
        // Proceed with the menu only if the user didn't enter "x"
        let option: string;
        do {
          this.print("Menu", menuOptions);
          option = await this.getInput();

          if (option === "x") {
            exit = true; // Set exit to true if the user entered "x" during menu selection
          } else {
            await this.executeOption(option);
          }
        } while (option !== "x" && !exit); // Exit the loop if the user enters "x" or if exit is true
      }
    } while (!exit); // Continue the loop until exit is true

    this._rl.close();
  }

  private async executeOption(option: string): Promise<void> {
    const options: { [key: string]: () => void } = this.getMenuOptions();
    const selectedOption = options[option];
    if (selectedOption) {
      console.log(
        "\x1b[45m",
        "Selected option:",
        menuOptions[option],
        "\x1b[0m"
      );
      await selectedOption();
    } else {
      console.log("Invalid option. Please try again.");
    }
  }

  public getInput(): Promise<string> {
    return new Promise((resolve) => {
      this._rl.question("Enter your option: ", (answer: any) => {
        resolve(answer.trim().toLowerCase());
      });
    });
  }

  public printAllStackNamesOnTXTFile(): void {
    try {
      console.log("Start..");
      console.log("Check for AWS Stack names..");

      const stackNames = this._awsAccount.getStackNameList();
      console.log(stackNames);
      const printer = new Printer(stackNames);
      printer.printData();
      console.log("Stack names saved on .txt file.");
      console.log("Check in your directory.");
    } catch (error) {
      console.error("Error during the execution:", error);
    }
  }

  public logAllStackNames(): void {
    try {
      console.log("Start..");
      console.log("Check for AWS Stack names..");

      const stackNames = this._awsAccount.getStackNameList();
      console.log("START =============================================");
      console.log(stackNames);
      console.log("=============================================== END");
    } catch (error: unknown) {
      console.error("Error during the execution:", error);
    }
  }

  public checkAllStacks(): void {
    try {
      console.log("Start..");
      console.log("Check if all stack are in sync..");
      if (this._awsAccount.checkAllStacks()) {
        console.log("Stack are checked.");
      } else {
        this._awsAccount.checkAllStacks();
      }
    } catch (error: unknown) {
      console.error("Error during the execution:", error);
    }
  }

  public logAllDriftedStack(): void {
    try {
      console.log("Start..");
      console.log("Check if all stack are in sync..");

      const stackNames = this._awsAccount.getAllDriftedStack();
      console.log("START =============================================");
      console.log(stackNames);
      console.log("=============================================== END");
    } catch (error: unknown) {
      console.error("Error during the execution:", error);
    }
  }

  public printAllDriftedStackOnTXTFile(): void {
    try {
      console.log("Start..");
      console.log("Check for AWS Stack names..");

      this._awsAccount.getStackNamesFromStackList();
      const stackNames = this._awsAccount.getAllDriftedStack();
      console.log(stackNames);
      const printer = new Printer(stackNames);
      printer.printData();
      console.log("Stack names saved on .txt file.");
      console.log("Check in your directory.");
    } catch (error: unknown) {
      console.error("Error during the execution:", error);
    }
  }

  public getAllStatusStack(): void {
    try {
      console.log("Start..");
      console.log("Check if all stack are in sync..");

      const stackNames = this._awsAccount.getAllStackWithStatus();
      console.log("START =============================================");
      console.log(stackNames);
      console.log("=============================================== END");
    } catch (error: unknown) {
      console.error("Error during the execution:", error);
    }
  }
}
