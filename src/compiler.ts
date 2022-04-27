import { baseParse } from "@vue/compiler-core";
import { generate } from "./codegen";
import { transform } from "./transform";

export function compile(template: string, options = {}) {
  const ast = baseParse(template);
  transform(ast, options);

  return generate(ast);
}
