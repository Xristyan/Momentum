import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "no-undef": "error",
      "no-console": "error",
      "no-const-assign": "error",
    },
  },
  {
    ignores: ["node_modules/", "build/"],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
