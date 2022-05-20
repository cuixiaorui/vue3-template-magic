import {
  AttributeNode,
  DirectiveNode,
  ElementNode,
  ExpressionNode,
  InterpolationNode,
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
    case NodeTypes.INTERPOLATION:
      genInterpolation(node, context);
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
    genElementProps(node.props, context);
    push(`>`);

    if (node.children?.length > 0) {
      genNodeList(node, context);
    }
    push(`</${tagName}>`);
  }
}

function genElementProps(
  node: (AttributeNode | DirectiveNode)[],
  context: Context
) {
  if (!node) return;

  node.forEach((propsNode) => {
    switch (propsNode.type) {
      case NodeTypes.ATTRIBUTE:
        genElementAttribute(propsNode, context);
        break;
      case NodeTypes.DIRECTIVE:
        genElementDirective(propsNode, context);
        break;
    }
  });
}

function genElementDirective(node: DirectiveNode, context: Context) {
  const { push } = context;
  // vue3 没有提供属性来判断是不是简写，所以这里通过 loc.source 来判断
  // 有 v- 的话认为是全写
  const isShorthand = !node.loc.source.includes("v-");
  let key = isShorthand ? '':`v-${node.name}`
  let value = node.exp?.content;
  // let arg = node.arg ? `${isShorthand && node.name === 'on'? '@': ':'}${node.arg.content}` : "";
  let arg = node.arg ? `:${node.arg.content}` : "";
  push(` ${key}${arg}="${value}"`);
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
function genInterpolation(node: InterpolationNode, context: Context) {
  const { push } = context;
  push(`{{`);
  genExpression(node.content, context)
  push(`}}`);
}

function genExpression(node: ExpressionNode, content: Context) {
  const { push } = content;

  push(`${node.content}`);
}
