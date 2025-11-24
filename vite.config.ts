/// <reference types="vitest" />

import { defineConfig, Plugin } from 'vitest/config';
import path from 'path';
import fs from 'fs';

// Plugin para resolver templates e estilos do Angular
function angularResourcePlugin(): Plugin {
  return {
    name: 'angular-resource-loader',
    transform(code, id) {
      if (id.endsWith('.component.ts')) {
        let transformedCode = code;

        // Resolver templateUrl
        const templateUrlMatch = code.match(/templateUrl:\s*['"`](.+?)['"`]/);
        if (templateUrlMatch) {
          const templatePath = path.resolve(path.dirname(id), templateUrlMatch[1]);
          if (fs.existsSync(templatePath)) {
            const template = fs.readFileSync(templatePath, 'utf-8')
              .replace(/`/g, '\\`')
              .replace(/\$/g, '\\$');
            transformedCode = transformedCode.replace(
              /templateUrl:\s*['"`].+?['"`]/,
              `template: \`${template}\``
            );
          }
        }

        // Resolver styleUrl/styleUrls
        const styleUrlMatch = code.match(/styleUrls?:\s*(\[['"`](.+?)['"`]\]|['"`](.+?)['"`])/);
        if (styleUrlMatch) {
          transformedCode = transformedCode.replace(
            /styleUrls?:\s*(\[['"`].+?['"`]\]|['"`].+?['"`])/,
            'styles: []'
          );
        }

        return transformedCode;
      }
      return code;
    },
  };
}

export default defineConfig({
  plugins: [angularResourcePlugin()],
  resolve: {
    conditions: ['default', 'import'],
    alias: {
      '@path-components': path.resolve(__dirname, './src/app/components'),
      '@path-services': path.resolve(__dirname, './src/app/services'),
      '@path-data': path.resolve(__dirname, './src/app/data'),
      '@path-interfaces': path.resolve(__dirname, './src/app/interfaces'),
      '@path-pipes': path.resolve(__dirname, './src/app/pipes'),
      '@path-app': path.resolve(__dirname, './src/app'),
      '@path-environments': path.resolve(__dirname, './src/environments'),
    },
  },
  assetsInclude: ['**/*.html', '**/*.scss'],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.angular', 'e2e'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test-setup.ts',
        'src/vitest-jasmine-shim.ts',
        '**/*.spec.ts',
        '**/*.config.ts',
        'src/main.ts',
        'src/environments/',
      ],
    },
    reporters: ['default'],
    css: true,
    server: {
      deps: {
        inline: [
          'zone.js',
          '@angular/core',
          '@angular/common',
          '@angular/platform-browser',
          'ngx-google-analytics',
          'ngx-pagination',
        ],
      },
    },
  },
});
