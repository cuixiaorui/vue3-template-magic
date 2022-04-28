import { transform } from "../src/transform";
import { describe, it, expect } from "vitest";
import { NodeTypes } from "../src/ast";

describe("transform", () => {
  it("happy path", () => {
    const ast = {
      type: 0,
      children: [
        {
          type: NodeTypes.ELEMENT,
          tag: "div",
          children: []
        },
      ],
    };

    const plugin = (node: any) => {
      if (node.type === NodeTypes.ELEMENT) {
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
