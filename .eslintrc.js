module.exports = {
  root: true,
  ignorePatterns: ['**/*'],
  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@angular-eslint/recommended',
        'plugin:prettier/recommended',
      ],
      parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: true,
      },
      rules: {
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'app',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'app',
            style: 'kebab-case',
          },
        ],
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
      },
    },
    {
      files: ['*.html'],
      extends: [
        'plugin:@angular-eslint/template/recommended',
        'plugin:prettier/recommended',
      ],
      rules: {
        'prettier/prettier': [
          'error',
          {
            parser: 'angular',
          },
        ],
      },
    },
  ],
};

// // @ts-check
// const eslint = require("@eslint/js");
// const tseslint = require("typescript-eslint");
// const angular = require("angular-eslint");

// module.exports = tseslint.config(
//   {
//     files: ["**/*.ts"],
//     extends: [
//       eslint.configs.recommended,
//       ...tseslint.configs.recommended,
//       ...tseslint.configs.stylistic,
//       ...angular.configs.tsRecommended,
//     ],
//     processor: angular.processInlineTemplates,
//     rules: {
//       "@angular-eslint/directive-selector": [
//         "error",
//         {
//           type: "attribute",
//           prefix: "app",
//           style: "camelCase",
//         },
//       ],
//       "@angular-eslint/component-selector": [
//         "error",
//         {
//           type: "element",
//           prefix: "app",
//           style: "kebab-case",
//         },
//       ],
//     },
//   },
//   {
//     files: ["**/*.html"],
//     extends: [
//       ...angular.configs.templateRecommended,
//       ...angular.configs.templateAccessibility,
//     ],
//     rules: {
//       'prettier/prettier': ['error', { endOfLine: 'auto' }],
//     },
//   }
// );
