const fs = require("fs");

import { Printer } from "../src/Printer";
import { test, expect } from "vitest";

test("getFileName returns a valid file name", () => {
  const printer = new Printer("");
  const fileName = printer.getFileName();
  expect(fileName).toMatch(/^stack_\d{2}-\d{2}-\d{4}_\d{2}-\d{2}.txt$/);
});

test("printData saves data to a file", async () => {
  const printer = new Printer("This is some data");
  const fileName = printer.getFileName();
  await printer.printData();

  const fileContent = await fs.readFileSync(fileName, { encoding: "utf-8" });
  expect(fileContent).toBe("This is some data");
});

test("printData saves an array of data to a file", async () => {
  const printer = new Printer(["This is data 1", "This is data 2"]);
  const fileName = printer.getFileName();
  await printer.printData();

  const fileContent = await fs.readFileSync(fileName, { encoding: "utf-8" });
  const stringContent = fileContent.toString();
  expect(stringContent).toStrictEqual("This is data 1\nThis is data 2");
});
