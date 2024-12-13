module.exports = {
  root: true,
  ignorePatterns: ['node_modules/*', 'dist/*'],
  overrides: [
    {
      files: [
        'src/**/*.ts',
        '.eslintrc.js',
        'angular.json',
        'tsconfig.json',
        '.prettierrc',
        'karma.conf.js',
      ],
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
      files: ['src/**/*.html'],
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

// module.exports = {
//   root: true,
//   ignorePatterns: ['node_modules/*', 'dist/*'],
//   overrides: [
//     {
//       files: ['src/**/*.ts'],
//       extends: [
//         'eslint:recommended',
//         'plugin:@typescript-eslint/recommended',
//         'plugin:@angular-eslint/recommended',
//         'plugin:prettier/recommended',
//       ],
//       parserOptions: {
//         project: ['tsconfig.json'],
//         createDefaultProgram: true,
//       },
//       rules: {
//         '@angular-eslint/directive-selector': [
//           'error',
//           {
//             type: 'attribute',
//             prefix: 'app',
//             style: 'camelCase',
//           },
//         ],
//         '@angular-eslint/component-selector': [
//           'error',
//           {
//             type: 'element',
//             prefix: 'app',
//             style: 'kebab-case',
//           },
//         ],
//         'prettier/prettier': ['error', { endOfLine: 'auto' }],
//         'max-len': [
//           'error',
//           {
//             code: 120, // Define o comprimento máximo de uma linha
//             ignoreStrings: true, // Ignora strings longas
//             ignoreTemplateLiterals: true, // Ignora strings de template
//             ignoreComments: true, // Ignora comentários
//           },
//         ],
//       },
//     },
//     {
//       files: ['src/**/*.html'],
//       extends: ['plugin:@angular-eslint/template/recommended', 'plugin:prettier/recommended'],
//       rules: {
//         'prettier/prettier': [
//           'error',
//           {
//             parser: 'angular',
//           },
//         ],
//       },
//     },
//   ],
// };
