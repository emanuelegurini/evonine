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
    const fileName = this.getFileName();

    if (typeof this.data === "string") {
      fs.writeFileSync(fileName, this.data, { encoding: "utf-8" });
    } else {
      fs.writeFileSync(fileName, this.data.join("\n"), { encoding: "utf-8" });
    }

    console.log(`Saved in ${fileName}`);
  }

  /**
   * Return file name using the following format
   * <STACKNAME_DD-MM-YYYY_HH-mm.txt>
   */
  public getFileName(): string {
    const today = new Date();

    const dd: string = today.getDate().toString().padStart(2, "0");
    const MM: string = (today.getMonth() + 1).toString().padStart(2, "0");
    const YYYY: string = today.getUTCFullYear().toString();
    const HH: string = today.getHours().toString().padStart(2, "0");
    const mm: string = today.getMinutes().toString().padStart(2, "0");

    return `stack_${dd}-${MM}-${YYYY}_${HH}-${mm}.txt`;
  }
}
