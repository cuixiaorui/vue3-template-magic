// TODO ast type from vue3
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
