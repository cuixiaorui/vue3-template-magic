# Vue3-Template-Magic
template code generator for vue3
Template is generated based on vue3 template
This means you can do anything with template using transform

## Why
There is only a method in vue3 that generates the render function based on template: `baseCompile`

But no template is generated based on template

In this case, we cannot use the AST form to perform some operations on the template

The template of Vue3 is an HTML dialect, so we can't use HTML codeGen too

So you have this library and the idea of this library is that the ast generated from template is going to spell back to template

This way the user can do anything in the Transform phase

## tasking

- [x] 属性
  - `<div id="123"></div>`
  - `<button disabled></button>`
- [x] prop
- [x] 插值
- [x] 指令 v-id
  - 简写 :id
- [x] 事件绑定
- [x] 内置的指令
  - v-for
  - v-html
  - v-on
  - v-if
  - v-else
  - v-else-if
- [ ] 指令的参数
- [ ] v-model
- [ ] 注释节点
- [ ] Dynamic Arguments
- [ ] Modifiers

具体参考 [veu3 template Syntax](https://vuejs.org/guide/essentials/template-syntax.html#text-interpolation)




