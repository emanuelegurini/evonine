import { IPrinter } from "./IPrinter";

const fs = require("fs");

export class Printer implements IPrinter {
  private _path: string = "../output/";

  constructor() {}

  public printToConsole(data: string | Array<string>): void {
    if (data === null) {
      throw new Error("Data should not be null!");
    }

    if (typeof data === "string") {
      console.log(data);
    } else {
      try {
        console.log("Start..");
        console.log("Check for AWS Stack names..");

        console.log("START =============================================");
        for (let i = 0; i < data.length; i++) {
          const stackName = data[i];
          let index = i + 1;
          console.log(`[Stack ${index} / ${data.length}] - ${stackName}`);
        }
        console.log("=============================================== END");
      } catch (error: unknown) {
        console.error("Error during the execution:", error);
      }
    }
  }

  public writeToFile(data: string | Array<string>): void {
    if (data === null) {
      throw new Error("Data should not be null!");
    }

    const fileName = this.getFileName();

    let content = "";

    if (typeof data === "string") {
      content = data;
    } else {
      content = data
        .map((line, index) => `[Stack ${index + 1} / ${data.length}] - ${line}`)
        .join("\n");
    }

    fs.writeFileSync(this._path + fileName, content, {
      encoding: "utf-8",
    });

    console.log(`Saved in ${fileName}`);
  }

  public getFileName(): string {
    const today = new Date();

    const dd: string = today.getDate().toString().padStart(2, "0");
    const MM: string = (today.getMonth() + 1).toString().padStart(2, "0");
    const YYYY: string = today.getUTCFullYear().toString();
    const HH: string = today.getHours().toString().padStart(2, "0");
    const mm: string = today.getMinutes().toString().padStart(2, "0");

    // <STACKNAME_DD-MM-YYYY_HH-mm.txt>
    return `stack_${dd}-${MM}-${YYYY}_${HH}-${mm}.txt`;
  }
}
