const config = {
  arrowParens: 'always',
  singleQuote: true,
  jsxSingleQuote: true,
  tabWidth: 2,
  semi: true,
  trailingComma: 'none',
  endOfLine: 'lf',
  plugins: [
    'prettier-plugin-tailwindcss' // must be loaded last
  ],
  printWidth: 100,
  jsonRecursiveSort: true,
  tailwindFunctions: ['cn', 'clsx', 'cva']
};

export default config;
