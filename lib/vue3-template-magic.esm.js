import { baseParse } from '@vue/compiler-core';

// TODO ast type from vue3
function generate(ast) {
    const context = createCodegenContext();
    const node = ast.children[0];
    genNode(node, context);
    return {
        code: context.code,
    };
}
function createCodegenContext() {
    const context = {
        code: "",
        push(source) {
            context.code += source;
        },
    };
    return context;
}
function genNode(node, context) {
    switch (node.type) {
        case 1 /* NodeTypes.ELEMENT */:
            genElement(node, context);
            break;
        case 2 /* NodeTypes.TEXT */:
            genText(node, context);
            break;
    }
}
function genText(node, context) {
    const { push } = context;
    push(`${node.content}`);
}
function genElement(node, context) {
    var _a;
    const { push } = context;
    const tagName = node.tag;
    const isSelfClosing = node.isSelfClosing;
    if (isSelfClosing) {
        push(`<${tagName}/>`);
    }
    else {
        push(`<${tagName}>`);
        if (((_a = node.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            genNodeList(node, context);
        }
        push(`</${tagName}>`);
    }
}
function genNodeList(node, context) {
    const children = node.children;
    for (let i = 0; i < children.length; i++) {
        genNode(children[i], context);
    }
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
        case 0 /* NodeTypes.ROOT */:
        case 1 /* NodeTypes.ELEMENT */:
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
