import { describe, it, expect } from "vitest";
import { NodeTypes } from "../src/ast";
import { compile } from "../src/compiler";

describe("compiler", () => {
  it("happy path", () => {
    function plugin(node: any) {
      if (node.type === NodeTypes.ELEMENT) {
        node.tag = "span";
      }
    }

    const { code } = compile("<div></div>", {
      nodeTransforms: [plugin],
    });

    expect(code).toMatchSnapshot();
  });
});
