import { expect, test } from "vitest";
import { Menu } from "./Menu";

test("Create Menu object", () => {
  const menu = new Menu();
  expect(menu).toBeDefined();
});
