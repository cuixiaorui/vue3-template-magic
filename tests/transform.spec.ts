import { transform } from "../src/transform";
import { describe, it, expect } from "vitest";

describe("transform", () => {
  it("happy path", () => {
    const ast = {
      type: 0,
      children: [
        {
          type: 1,
          tag: "div",
          children: []
        },
      ],
    };

    const plugin = (node: any) => {
      if (node.type === 1) {
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
