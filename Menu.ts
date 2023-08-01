const readline = require("readline");

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
          this.op1();
          break;
        case "2":
          this.op2();
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
    return;
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
  public op1() {
    console.log("opt 1");
  }

  /**
   * TODO: Add property description
   */
  public op2() {
    console.log("opt 2");
  }
}
