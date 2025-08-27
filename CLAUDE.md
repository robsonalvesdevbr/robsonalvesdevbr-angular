# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Build and Serve
- `npm start` - Start development server (equivalent to `ng serve --no-hmr`)
- `ng build` - Build for development
- `ng build --configuration production` or `npm run build:prod` - Build for production
- `ng build --watch --configuration development` or `npm run watch` - Build with watch mode

### Testing
- `npm test` - Run tests with watch mode (Karma + Jasmine)
- `npm run test-nowatch` - Run tests once without watch mode (headless Chrome)
- `npm run test-coverage` - Run tests with coverage report

### Code Quality
- `npm run lint` - Run ESLint on TypeScript and HTML files
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Requirements
- Node.js >= 22.9 (specified in package.json engines)

## Architecture Overview

### Technology Stack
- **Angular 20.2** with standalone components (no modules)
- **TypeScript** with strict mode enabled
- **Bootstrap 5.3.7** for styling with Bootstrap Icons
- **SCSS** for component styles
- **Zoneless Change Detection** (Angular's new experimental feature)
- **Google Analytics** integration via `ngx-google-analytics`
- **ESLint + Prettier** for code quality

### Project Structure
This is a personal portfolio/resume website with the following key architectural patterns:

#### Component Architecture
- **Standalone Components**: All components use Angular's standalone API (no NgModules)
- **Base Component Pattern**: `BasePageComponent` provides common functionality for pages
- **Signal-based Inputs**: Uses Angular's new signal-based input API
- **OnPush Change Detection**: Components use `ChangeDetectionStrategy.OnPush`

#### Data Management
- **Centralized Data Service**: `DataService` provides static data for courses, books, graduations, etc.
- **Static Data Pattern**: All content is stored in TypeScript data files in `src/app/data/`
- **Interface-driven**: Strong typing with interfaces in `src/app/interfaces/`

#### Path Aliases (TypeScript)
The project uses custom path aliases defined in `tsconfig.json`:
- `@path-components/*` → `./src/app/components/*`
- `@path-services/*` → `./src/app/services/*`
- `@path-data/*` → `./src/app/data/*`
- `@path-interfaces/*` → `./src/app/interfaces/*`
- `@path-pipes/*` → `./src/app/pipes/*`
- `@path-app/*` → `./src/app/*`
- `@path-environments/*` → `./src/environments/*`

#### Custom Pipes
The project includes several custom pipes for data transformation:
- `EnumToArrayPipe` - Convert enums to arrays
- `FilterPipe` - Filter arrays
- `ImgcursoPipe` - Handle course images
- `MessageDateConclusionPipe` - Format completion dates
- `PrintTagsPipe` - Display tags
- `SortbyPipe` - Sort arrays

#### Routing
- Uses Angular Router with lazy-loaded components
- Single-page application with wildcard route redirecting to home

### Build Configuration
- **Development**: Source maps enabled, no optimization
- **Production**: Bundle size budgets (1MB initial, 4kB component styles)
- **Assets**: Includes Bootstrap CSS/JS, custom SCSS, and static assets
- **Output**: Built to `dist/robsonalves/`

### Code Quality Setup
- **ESLint**: Configured with Angular-specific rules
- **Prettier**: Code formatting with consistent style
- **TypeScript**: Strict mode with additional compiler options
- **Angular Compiler**: Strict templates and injection parameters

### Component Naming Convention
- Use kebab-case for component selectors
- Prefix components with `app-`
- Components are organized by feature in subdirectories

### Styling
- Uses SCSS for component and global styles
- Bootstrap 5 integrated globally
- Bootstrap Icons available throughout the application
- Custom styles in `src/css/styles.scss` and `src/styles.scss`