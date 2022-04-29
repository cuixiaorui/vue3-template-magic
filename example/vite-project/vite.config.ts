import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { compile } from "../../lib/vue3-template-magic.esm.js";
import { parse } from "@vue/compiler-sfc";

// self plugin

function templateTransformPlugin() {
  return {
    name: "templateTransformPlugin",
    transform(code: string, id: string) {
      if (id.endsWith(".vue")) {
        const { descriptor: {template} } = parse(code);

        const plugin = (code) => {
          if (code.type === 1) {
            code.tag = "span";
          }
        };

        const { code: transformedTemplateCode } = compile(template.content, {
          nodeTransforms: [plugin],
        });
        code = code.replace(
          /<template>([\s\S]+)<\/template>/g,
          `<template>${transformedTemplateCode}</template>`
        );
      }

      return code;
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [templateTransformPlugin(), vue()],
});
