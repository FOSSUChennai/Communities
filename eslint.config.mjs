import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      'indent': 'off',
      'semi': 'off',
      'quotes': 'off',
      'comma-spacing': 'off',
      'key-spacing': 'off',
      'object-curly-spacing': 'off',
      'arrow-spacing': 'off',
    }
  }
];

export default eslintConfig;
