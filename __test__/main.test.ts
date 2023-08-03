import { expect, test } from "vitest";
import { Menu } from "../src/Menu";

test("Create Menu object", () => {
  const menu = new Menu();
  expect(menu).toBeDefined();
});
