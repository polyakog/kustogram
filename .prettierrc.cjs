module.exports = {
  trailingComma: 'es5',
  semi: false,
  singleQuote: true,
  endOfLine: 'auto',
  printWidth: 100,
  requirePragma: true,
  arrowParens: 'avoid',
  overrides: [
    {
      files: '{**/*,*}.{css,scss,sass,less,js,jsx,ts,tsx,json,md,mdx}',
      excludeFiles: [
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/coverage/**',
        '**/public/**',
        '**/*.d.ts',
        '**/deployment/**',
      ],
      options: { requirePragma: false },
    },
  ],
}

// {
//   "printWidth": 100,
//   "tabWidth": 2,
//   "semi": true,
//   "trailingComma": "none",
//   "bracketSpacing": true
// }