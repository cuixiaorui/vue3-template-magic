import { describe, it, expect } from "vitest";
import { generate } from "../src/codegen";
import {
  createAttributeNode,
  createElementNode,
  createRootNode,
  createTextNode,
  NodeTypes,
  RootNode,
} from "../src/ast";
import { baseParse } from "@vue/compiler-core";

describe("codegen", () => {
  it("simple element", () => {
    const root = createRootNode({
      children: [createElementNode({ tag: "div" })],
    });

    const { code } = generate(root);
    expect(code).toMatchSnapshot();
  });

  it(" self closing element  ", () => {
    const root = createRootNode({
      children: [createElementNode({ tag: "span", isSelfClosing: true })],
    });

    const { code } = generate(root);
    expect(code).toMatchSnapshot();
  });

  it("element children have one text node ", () => {
    // <div>hi</div>
    const root = createRootNode({
      children: [
        createElementNode({
          tag: "div",
          children: [createTextNode("hi")],
        }),
      ],
    });

    const { code } = generate(root);
    expect(code).toMatchSnapshot();
  });

  it("element children have two  node of text and element ", () => {
    // <div>hi<span></span></div>
    const root = createRootNode({
      children: [
        createElementNode({
          tag: "div",
          children: [
            createTextNode("hi"),
            createElementNode({
              tag: "span",
            }),
          ],
        }),
      ],
    });

    const { code } = generate(root);
    expect(code).toMatchSnapshot();
  });

  it("simple props", () => {
    // <div id="test"></div>
    const root = createRootNode({
      children: [
        createElementNode({
          tag: "div",
          props: [createAttributeNode("id", createTextNode("test"))],
        }),
      ],
    });

    const { code } = generate(root);
    expect(code).toMatchSnapshot();
  });

  it("multi props", () => {
    // <div id="test" class="red"></div>
    const root = createRootNode({
      children: [
        createElementNode({
          tag: "div",
          props: [
            createAttributeNode("id", createTextNode("test")),
            createAttributeNode("class", createTextNode("red")),
          ],
        }),
      ],
    });

    const { code } = generate(root);
    expect(code).toMatchSnapshot();
  });

  it("html attribute ", () => {
    // <button disabled></button>
    const root = createRootNode({
      children: [
        createElementNode({
          tag: "button",
          props: [createAttributeNode("disabled")],
        }),
      ],
    });

    const { code } = generate(root);

    expect(code).toMatchSnapshot();
  });
});
