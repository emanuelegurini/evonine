const readline = require("readline");

import { AWSAccount } from "./AWSAccount";
import { IMenu } from "./IMenu";
import { Printer } from "./Printer";
import { menuOptions, awsRegionMap } from "./data";

export class Menu implements IMenu {
  private _rl;
  private _awsAccount: AWSAccount;
  private _printer!: Printer;

  constructor() {
    this._awsAccount = new AWSAccount();
    this._printer = new Printer();
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
      "7": () => this.printAllStackWithStatusOnTXTFile(),
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
      const stackNames = this._awsAccount.getStackNameList();
      this._printer.writeToFile(stackNames);
    } catch (error: unknown) {
      console.error("Error: ", error);
    }
  }

  public async logAllStackNames() {
    try {
      const stackNames = this._awsAccount.getStackNameList();
      this._printer.printToConsole(stackNames);
    } catch (error: unknown) {
      console.error("Error:", error);
    }
  }

  public checkAllStacks(): void {
    try {
      console.log("Start..");
      console.log("Check if all stack are in sync..");
      if (this._awsAccount.getCheckedStatus()) {
        this._printer.printToConsole("All stack are checked");
        //console.log("Stack are checked.");
      } else {
        this._awsAccount.checkAllStacks();
        this._printer.printToConsole("All stack have been checked");
      }
    } catch (error: unknown) {
      console.error("Error during the execution:" + error);
    }
  }

  public logAllDriftedStack(): void {
    try {
      const stackNames: string = this._awsAccount.getDriftedStacks();
      if (!stackNames) {
        this._awsAccount.getAllDriftedStack();
        this.logAllDriftedStack();
      }

      if (stackNames) this._printer.printToConsole(stackNames);
    } catch (error: unknown) {
      console.error(error);
    }
  }

  public printAllDriftedStackOnTXTFile(): void {
    try {
      const stackNames: string = this._awsAccount.getDriftedStacks();
      if (!stackNames) {
        this._awsAccount.getAllDriftedStack();
        this.printAllDriftedStackOnTXTFile();
      }

      if (stackNames) this._printer.writeToFile(stackNames);
    } catch (error: unknown) {
      console.error(error);
    }
  }

  public getAllStatusStack(): void {
    try {
      const stackWithStatus: string = this._awsAccount.getAllStack();
      if (!stackWithStatus) {
        this._awsAccount.getAllStackWithStatus();
        this.getAllStatusStack();
      }

      if (stackWithStatus) this._printer.printToConsole(stackWithStatus);
    } catch (error: unknown) {
      console.error(error);
    }
  }

  public printAllStackWithStatusOnTXTFile(): void {
    try {
      const stackWithStatus: string = this._awsAccount.getAllStack();
      if (!stackWithStatus) {
        this._awsAccount.getAllStackWithStatus();
        this.printAllStackWithStatusOnTXTFile();
      }

      if (stackWithStatus) this._printer.writeToFile(stackWithStatus);
    } catch (error: unknown) {
      console.error(error);
    }
  }
}
