import { defineConfig } from "oxlint";

export default defineConfig({
  options: {
    maxWarnings: 10,
  },
  rules: {
    "no-constant-binary-expression": "off",
  },
});
