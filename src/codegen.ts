import {
  AttributeNode,
  ElementNode,
  NodeTypes,
  RootNode,
  TemplateChildNode,
  TextNode,
} from "./ast";

interface Context {
  code: string;
  push(code: string): void;
}

export function generate(ast: RootNode) {
  const context = createCodegenContext();
  const node = ast.children[0];

  genNode(node, context);

  return {
    code: context.code,
  };
}

function createCodegenContext(): Context {
  const context = {
    code: "",
    push(source: string) {
      context.code += source;
    },
  };

  return context;
}

function genNode(node: TemplateChildNode, context: Context) {
  switch (node.type) {
    case NodeTypes.ELEMENT:
      genElement(node, context);
      break;
    case NodeTypes.TEXT:
      genText(node, context);
      break;
    default:
      break;
  }
}

function genText(node: TextNode, context: Context) {
  const { push } = context;
  push(`${node.content}`);
}

function genElement(node: ElementNode, context: Context) {
  const { push } = context;
  const tagName = node.tag;
  const isSelfClosing = node.isSelfClosing;

  if (isSelfClosing) {
    push(`<${tagName}/>`);
  } else {
    push(`<${tagName}`);
    genElementAttributes(node.props, context);
    push(`>`);

    if (node.children?.length > 0) {
      genNodeList(node, context);
    }
    push(`</${tagName}>`);
  }
}

function genElementAttributes(node: AttributeNode[], context: Context) {
  if (!node) return;

  node.forEach((propsNode) => genElementAttribute(propsNode, context));
}

function genElementAttribute(node: AttributeNode, context: Context) {
  const { push } = context;
  let key = node.name;
  let value = "";
  if (node.value) {
    value = `="${node.value.content}"`;
  }
  push(` ${key}${value}`);
}

function genNodeList(node: ElementNode, context: Context) {
  const children = node.children;
  for (let i = 0; i < children.length; i++) {
    genNode(children[i], context);
  }
}
