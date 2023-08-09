import { IPrinter } from "./IPrinter";
import * as fs from "fs";

export class Printer implements IPrinter {
  private _path: string = "../output/";

  constructor() {}

  public displayToConsole(data: string | Array<string>): void {
    if (!data) {
      console.error("Data should not be null or undefined!");
    }

    try {
      if (typeof data === "string") {
        console.log(data);
      } else {
        console.log("Start..");
        console.log("Check for AWS Stack names..");

        console.log("START =============================================");
        for (let i = 0; i < data.length; i++) {
          const stackName = data[i];
          let index = i + 1;
          console.log(`[Stack ${index} / ${data.length}] - ${stackName}`);
        }
        console.log("=============================================== END");
      }
    } catch (error: unknown) {
      throw new Error(`Error during data display: ${error}`);
    }
  }

  public saveToFile(data: string | Array<string>): void {
    if (!data) {
      console.error("Data should not be null!");
    }

    const fileName = this.generateFileName();

    let content = "";

    try {
      if (typeof data === "string") {
        content = data;
      } else {
        content = data
          .map(
            (line, index) => `[Stack ${index + 1} / ${data.length}] - ${line}`
          )
          .join("\n");
      }

      fs.writeFileSync(this._path + fileName, content, {
        encoding: "utf-8",
      });

      console.log(`Data saved in ${fileName}`);
    } catch (error: unknown) {
      throw new Error(`Error saving to file: ${error}`);
    }
  }

  public generateFileName(): string {
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
