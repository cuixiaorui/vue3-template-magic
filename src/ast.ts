export const enum NodeTypes {
  ROOT,
  ELEMENT,
  TEXT,
  COMMENT,
  SIMPLE_EXPRESSION,
  INTERPOLATION,
  ATTRIBUTE,
  DIRECTIVE,
  // containers
  COMPOUND_EXPRESSION,
  IF,
  IF_BRANCH,
  FOR,
  TEXT_CALL,
  // codegen
  VNODE_CALL,
  JS_CALL_EXPRESSION,
  JS_OBJECT_EXPRESSION,
  JS_PROPERTY,
  JS_ARRAY_EXPRESSION,
  JS_FUNCTION_EXPRESSION,
  JS_CONDITIONAL_EXPRESSION,
  JS_CACHE_EXPRESSION,

  // ssr codegen
  JS_BLOCK_STATEMENT,
  JS_TEMPLATE_LITERAL,
  JS_IF_STATEMENT,
  JS_ASSIGNMENT_EXPRESSION,
  JS_SEQUENCE_EXPRESSION,
  JS_RETURN_STATEMENT,
}

export interface Node {
  type: NodeTypes;
}

export const enum ElementTypes {
  ELEMENT,
  COMPONENT,
  SLOT,
  TEMPLATE,
}

export interface TextNode extends Node {
  type: NodeTypes.TEXT;
  content: string;
}
export interface AttributeNode extends Node {
  type: NodeTypes.ATTRIBUTE;
  name: string;
  value: TextNode | undefined;
}

export interface BaseElementNode {
  type: NodeTypes.ELEMENT;
  tag: string;
  tagType: ElementTypes;
  isSelfClosing: boolean;
  props: Array<AttributeNode>;
  children: TemplateChildNode[];
}

export type ElementNode = PlainElementNode;

export interface PlainElementNode extends BaseElementNode {
  tagType: ElementTypes.ELEMENT;
}

export type TemplateChildNode = ElementNode | TextNode;

export declare interface RootNode extends Node {
  type: NodeTypes.ROOT;
  children: TemplateChildNode[];
}

export function createElementNode(options: Partial<ElementNode>): ElementNode {
  return {
    type: NodeTypes.ELEMENT,
    tag: "div",
    tagType: ElementTypes.ELEMENT,
    isSelfClosing: false,
    props: [],
    children: [],
    ...options,
  };
}

export function createTextNode(content: string): TextNode {
  return {
    type: NodeTypes.TEXT,
    content,
  };
}

export function createRootNode(options: Partial<RootNode>): RootNode {
  return {
    type: NodeTypes.ROOT,
    children: [],
    ...options,
  };
}

export function createAttributeNode(
  name: string,
  value?: AttributeNode["value"]
): AttributeNode {
  return {
    type: NodeTypes.ATTRIBUTE,
    name,
    value,
  };
}
