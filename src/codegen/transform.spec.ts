import { transform } from "./transform";
import { describe, it, expect } from "vitest";

describe("transform", () => {
  it("happy path", () => {
    const ast = {
      type: "root",
      children: [
        {
          type: "element",
          tag: "div",
          children: []
        },
      ],
    };

    const plugin = (node: any) => {
      if (node.type === "element") {
        node.tag = "span";
      }
    };

    transform(ast, {
      nodeTransforms: [plugin],
    });

    const elementNode = ast.children[0];
    expect(elementNode.tag).toBe("span");
  });
});
