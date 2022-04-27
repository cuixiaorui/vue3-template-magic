import { describe, it, expect } from "vitest";
import { compile } from "./compiler";

describe("compiler", () => {
  it("happy path", () => {

    function plugin(node: any) {
      // 1 代表的是 element
      if (node.type === 1) {
        node.tag = "span";
      }
    }

    const { code } = compile("<div></div>", {
      nodeTransforms: [plugin],
    });

    expect(code).toMatchSnapshot();
  });
});
