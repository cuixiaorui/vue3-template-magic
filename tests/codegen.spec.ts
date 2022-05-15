import { describe, it, expect } from "vitest";
import { generate } from "../src/codegen";
import {
  createAttributeNode,
  createDirectiveNode,
  createElementNode,
  createExpressNode,
  createInterpolationNode,
  createRootNode,
  createTextNode,
  NodeTypes,
} from "../src/ast";
import { baseParse } from "@vue/compiler-core";

describe("codegen", () => {
  it("simple element", () => {
    const root = createRootNode({
      children: [createElementNode({ tag: "div" })],
    });

    const { code } = generate(root);
    expect(code).toMatchInlineSnapshot('"<div></div>"');
  });

  it(" self closing element  ", () => {
    const root = createRootNode({
      children: [createElementNode({ tag: "span", isSelfClosing: true })],
    });

    const { code } = generate(root);
    expect(code).toMatchInlineSnapshot('"<span/>"');
  });

  it("element children have one text node ", () => {
    const root = createRootNode({
      children: [
        createElementNode({
          tag: "div",
          children: [createTextNode("hi")],
        }),
      ],
    });

    const { code } = generate(root);
    expect(code).toMatchInlineSnapshot('"<div>hi</div>"');
  });

  it("element children have two  node of text and element ", () => {
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
    expect(code).toMatchInlineSnapshot('"<div>hi<span></span></div>"');
  });

  it("simple props", () => {
    const root = createRootNode({
      children: [
        createElementNode({
          tag: "div",
          props: [createAttributeNode("id", createTextNode("test"))],
        }),
      ],
    });

    const { code } = generate(root);
    expect(code).toMatchInlineSnapshot('"<div id=\\"test\\"></div>"');
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
    expect(code).toMatchInlineSnapshot(
      '"<div id=\\"test\\" class=\\"red\\"></div>"'
    );
  });

  it("html attribute ", () => {
    const root = createRootNode({
      children: [
        createElementNode({
          tag: "button",
          props: [createAttributeNode("disabled")],
        }),
      ],
    });

    const { code } = generate(root);

    expect(code).toMatchInlineSnapshot('"<button disabled></button>"');
  });

  it("simple interpolation", () => {
    const root = createRootNode({
      children: [
        createElementNode({
          tag: "div",
          children: [createInterpolationNode(createExpressNode("msg"))],
        }),
      ],
    });

    const { code } = generate(root);

    expect(code).toMatchInlineSnapshot('"<div>{{msg}}</div>"');
  });

  it("only expression", () => {
    const root = createRootNode({
      children: [createInterpolationNode(createExpressNode("var a = 1"))],
    });

    const { code } = generate(root);

    expect(code).toMatchInlineSnapshot('"{{var a = 1}}"');
  });

  it("v-html", () => {
    const root = createRootNode({
      children: [
        createElementNode({
          tag: "span",
          props: [createDirectiveNode("html", createExpressNode("rawHtml"))],
        }),
      ],
    });

    const { code } = generate(root);

    expect(code).toMatchInlineSnapshot('"<span v-html=\\"rawHtml\\"></span>"');
  });

  it("v-bind", () => {
    const root = createRootNode({
      children: [
        createElementNode({
          tag: "span",
          props: [
            createDirectiveNode(
              "bind",
              createExpressNode("dynamicId"),
              createExpressNode("id")
            ),
          ],
        }),
      ],
    });

    const { code } = generate(root);

    expect(code).toMatchInlineSnapshot(
      '"<span v-bind:id=\\"dynamicId\\"></span>"'
    );
  });

  it('<div :id="dynamicId"></div>', () => {
    const root = createRootNode({
      children: [
        createElementNode({
          tag: "div",
          props: [
            createDirectiveNode(
              "bind",
              createExpressNode("dynamicId"),
              createExpressNode("id"),
              [],
              true
            ),
          ],
        }),
      ],
    });

    const { code } = generate(root);

    expect(code).toMatchInlineSnapshot('"<div :id=\\"dynamicId\\"></div>"');
  });
});
