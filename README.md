## vue3-template-magic




## tasking

- 只能用 vue3 的 baseParse 或者是 compiler-dom 的 parse 函数， transform 逻辑不可以用，需要我们自己构建，为什么？ 
  - 因为 vue3 的 transform 的目的是为了生成 js 代码，而我们是为了生成 html 代码， 所以并不通用