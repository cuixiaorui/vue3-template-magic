// TODO 这里的 ast 类型应该是从 vue3 中导出
export function generate(ast: any) {
  const node = ast.children[0];

  const tagName = node.tag;
  const isSelfClosing = node.isSelfClosing;

  let code = "";

  if (isSelfClosing) {
    code += `<${tagName}/>`;
  } else {
    code += `<${tagName}></${tagName}>`;
  }

  return {
    code,
  };
}
