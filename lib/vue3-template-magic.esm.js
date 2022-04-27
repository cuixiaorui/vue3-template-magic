import { baseParse } from '@vue/compiler-core';

// TODO ast type from vue3
function generate(ast) {
    const node = ast.children[0];
    const tagName = node.tag;
    const isSelfClosing = node.isSelfClosing;
    let code = "";
    if (isSelfClosing) {
        code += `<${tagName}/>`;
    }
    else {
        code += `<${tagName}></${tagName}>`;
    }
    return {
        code,
    };
}

function transform(root, options = {}) {
    const context = createTransformContext(root, options);
    traverseNode(root, context);
}
function createTransformContext(root, options) {
    const context = {
        root,
        nodeTransforms: options.nodeTransforms || [],
    };
    return context;
}
function traverseNode(node, context) {
    const nodeTransforms = context.nodeTransforms;
    const exitFns = [];
    for (let i = 0; i < nodeTransforms.length; i++) {
        const transform = nodeTransforms[i];
        const onExit = transform(node, context);
        if (onExit)
            exitFns.push(onExit);
    }
    switch (node.type) {
        case 0:
        case 1:
            traverseChildren(node, context);
            break;
    }
    let i = exitFns.length;
    while (i--) {
        exitFns[i]();
    }
}
function traverseChildren(node, context) {
    const children = node.children;
    for (let i = 0; i < children.length; i++) {
        const node = children[i];
        traverseNode(node, context);
    }
}

function compile(template, options = {}) {
    const ast = baseParse(template);
    transform(ast, options);
    return generate(ast);
}

export { compile };
