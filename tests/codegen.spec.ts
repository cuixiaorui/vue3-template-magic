import { describe, it, expect } from "vitest";
import { generate } from "../src/codegen";
import { NodeTypes } from "../src/ast";
import { baseParse } from "@vue/compiler-core";

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

  it("element children have one text node ", () => {
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

  it("element children have two  node of text and element ", () => {
    // <div>hi<span></span></div>
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
            {
              type: NodeTypes.ELEMENT,
              tag: "span",
              children: [],
            },
          ],
        },
      ],
    };

    const { code } = generate(root);
    expect(code).toMatchSnapshot();
  });

  it("simple props", () => {
    // <div id="test"></div>
    const root = {
      type: "root",
      children: [
        {
          type: NodeTypes.ELEMENT,
          tag: "div",
          props: [
            {
              type: NodeTypes.ATTRIBUTE, 
              name: "id",
              value: {
                type: NodeTypes.TEXT, 
                content: "test",
              },
            },
          ],
        },
      ],
    };

    const { code } = generate(root);
    expect(code).toMatchSnapshot();
  });

  it("multi props", () => {
    // <div id="test" class="red"></div>
    const root = {
      type: "root",
      children: [
        {
          type: NodeTypes.ELEMENT,
          tag: "div",
          props: [
            {
              type: NodeTypes.ATTRIBUTE,
              name: "id",
              value: {
                type: NodeTypes.TEXT,
                content: "test",
              },
            },

            {
              type: NodeTypes.ATTRIBUTE,
              name: "class",
              value: {
                type: NodeTypes.TEXT,
                content: "red",
              },
            },
          ],
        },
      ],
    };

    const { code } = generate(root);
    expect(code).toMatchSnapshot();
  });
});
