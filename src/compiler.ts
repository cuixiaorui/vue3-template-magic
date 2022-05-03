import { baseParse } from "@vue/compiler-core";
import { RootNode } from "./ast";
import { generate } from "./codegen";
import { transform } from "./transform";

export function compile(template: string, options = {}) {
  const ast = baseParse(template) as any as RootNode;
  transform(ast, options);

  return generate(ast);
}
