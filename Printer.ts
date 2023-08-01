const fs = require("fs");

export class Printer {
  private data: Array<string> | string;

  constructor(data: Array<string> | string) {
    this.data = data;
  }

  /**
   * TODO: Add property description
   */
  public printData(): void {
    const today = new Date();
    const fileName = `stack_${today.getDate()}-${
      today.getMonth() + 1
    }-${today.getFullYear()}_${today.getHours()}-${today.getMinutes()}.txt`;

    if (typeof this.data === "string") {
      fs.writeFileSync("stack.txt", this.data, { encoding: "utf-8" });
    } else {
      fs.writeFileSync(fileName, this.data.join("\n"), { encoding: "utf-8" });
    }

    console.log(`Nomi degli stack salvati in ${fileName}`);
  }
}
