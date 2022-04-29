import { NodeTypes } from "@vue/compiler-core";
import { test } from "vitest";
test("test demo", () => {
  // TypeError: Cannot read properties of undefined (reading 'ELEMENT')
  console.log(NodeTypes.ELEMENT);
});
