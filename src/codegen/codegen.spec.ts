import { describe, it, expect } from "vitest";
import { generate } from "./codegen";
import { baseParse } from "@vue/compiler-core";

describe("codegen", () => {
  it("simple element", () => {
    const root = {
      type: "root",
      children: [
        {
          type: "element",
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
          type: "element",
          tag: "span",
          isSelfClosing: true,
        },
      ],
    };

    const { code } = generate(root);
    expect(code).toMatchSnapshot();
  });
});
