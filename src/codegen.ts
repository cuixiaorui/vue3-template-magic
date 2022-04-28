import { NodeTypes } from "./ast";

interface Context {
  code: string;
  push(code: string): void;
}

// TODO ast type from vue3
export function generate(ast: any) {
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

function genNode(node: any, context: Context) {
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

function genText(node: any, context: Context) {
  const {push} = context
  push(`${node.content}`)

}

function genElement(node: any, context: Context) {
  const { push } = context;
  const tagName = node.tag;
  const isSelfClosing = node.isSelfClosing;

  if (isSelfClosing) {
    push(`<${tagName}/>`);
  } else {

    push(`<${tagName}>`);
    if (node.children?.length > 0) {
      // 这里应该循环
      genNode(node.children[0], context);
    }
    push(`</${tagName}>`);
  }
}
