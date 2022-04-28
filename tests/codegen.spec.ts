import { describe, it, expect } from "vitest";
import { generate } from "../src/codegen";
import { NodeTypes } from "../src/ast";

describe("codegen", () => {
  it("simple element", () => {
    const root = {
      type: "root",
      children: [
        {
          type: NodeTypes.ELEMENT,
          tag: "div",
        },
      ],
    };

    const { code } = generate(root);
    expect(code).toMatchSnapshot();
  });

  it(" self closing element  ", () => {
    const root = {
      type: "root",
      children: [
        {
          type: NodeTypes.ELEMENT,
          tag: "span",
          isSelfClosing: true,
        },
      ],
    };

    const { code } = generate(root);
    expect(code).toMatchSnapshot();
  });

  it("element children is text ", () => {
    // <div>hi</div>
    const root = {
      type: "root",
      children: [
        {
          type: NodeTypes.ELEMENT,
          tag: "div",
          children: [
            {
              type: NodeTypes.TEXT,
              content: "hi",
            },
          ],
        },
      ],
    };

    const { code } = generate(root);
    expect(code).toMatchSnapshot();
  });
});
