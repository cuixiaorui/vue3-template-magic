export function transform(root: any, options = {}) {
  const context = createTransformContext(root, options);
  traverseNode(root, context);
}

function createTransformContext(root: any, options: any): any {
  const context = {
    root,
    nodeTransforms: options.nodeTransforms || [],
  };

  return context;
}

function traverseNode(node: any, context: any) {
  const nodeTransforms = context.nodeTransforms;
  const exitFns: any = [];
  for (let i = 0; i < nodeTransforms.length; i++) {
    const transform = nodeTransforms[i];
    const onExit = transform(node, context);
    if (onExit) exitFns.push(onExit);
  }

  switch (node.type) {
    case "root":
    case "element":
      traverseChildren(node, context);
      break;

    default:
      break;
  }

  let i = exitFns.length;
  while (i--) {
    exitFns[i]();
  }
}
function traverseChildren(node: any, context: any) {
  const children = node.children;

  for (let i = 0; i < children.length; i++) {
    const node = children[i];
    traverseNode(node, context);
  }
}
