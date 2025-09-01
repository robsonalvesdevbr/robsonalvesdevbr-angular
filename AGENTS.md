# AGENTS.md

## Dev environment tips

### Prerequisites
- **Node.js**: >= 22.9 (as specified in package.json engines)
- **Angular CLI**: Installed globally (`npm install -g @angular/cli`)
- **Package Manager**: npm (project uses npm scripts)

### Quick Start Commands
```bash
npm install                    # Install dependencies
npm start                     # Start dev server (ng serve --no-hmr)
npm run watch                 # Build with watch mode
npm run lint                  # Run ESLint
npm run format                # Format code with Prettier
npm run format:check          # Check code formatting
```

### Project Structure Navigation
- **Components**: `/src/app/components/` - Organized by pages and utils
- **Services**: `/src/app/services/` - Data, SEO, analytics services
- **Data**: `/src/app/data/` - Static data files (Profile, Course, Book, etc.)
- **Interfaces**: `/src/app/interfaces/` - TypeScript interfaces
- **Pipes**: `/src/app/pipes/` - Custom transformation pipes
- **Models**: `/src/app/models/` - Enums and model definitions

### Path Aliases (Use in imports)
```typescript
@path-components/*     → ./src/app/components/*
@path-services/*       → ./src/app/services/*
@path-data/*          → ./src/app/data/*
@path-interfaces/*     → ./src/app/interfaces/*
@path-pipes/*         → ./src/app/pipes/*
@path-app/*           → ./src/app/*
@path-environments/*   → ./src/environments/*
```

### Development Server
- Default port: `4200`
- Hot Module Replacement (HMR) disabled by default
- Server starts with `ng serve --no-hmr`

### Key Technologies
- **Angular 20.2** with standalone components (no NgModules)
- **Bootstrap 5.3** with Bootstrap Icons
- **TypeScript 5.9** with strict mode
- **SCSS** for component styling
- **Zoneless change detection** (experimental)
- **Google Analytics** via ngx-google-analytics

### Code Quality Tools
- **ESLint**: Angular-specific rules with Prettier integration
- **Prettier**: Code formatting for TS, HTML, SCSS, JSON
- **TypeScript Compiler**: Strict mode with enhanced checks

## Testing instructions

### Test Framework
- **Testing Framework**: Jasmine 5.10 with Karma 6.4
- **Browser**: Chrome (ChromeHeadless for CI)
- **Coverage**: Istanbul/nyc integration

### Available Test Commands
```bash
npm test              # Run tests with watch mode (interactive)
npm run test-nowatch  # Run tests once (CI mode with ChromeHeadless)
npm run test-coverage # Run tests with coverage report
ng test              # Alternative command for interactive testing
```

### Test Structure
- **Unit Tests**: `*.spec.ts` files alongside components/services/pipes
- **Test Configuration**: `tsconfig.spec.json`
- **Karma Config**: Default Angular CLI configuration

### Testing Guidelines
1. **Component Tests**: Test component logic, inputs, outputs, and DOM interactions
2. **Service Tests**: Mock dependencies and test business logic
3. **Pipe Tests**: Test transformations with various input scenarios
4. **Directive Tests**: Test DOM manipulation and attribute changes

### Test File Locations
```
src/app/components/**/*.spec.ts     # Component tests
src/app/services/**/*.spec.ts       # Service tests  
src/app/pipes/**/*.spec.ts          # Pipe tests
src/app/directives/**/*.spec.ts     # Directive tests
src/app/app.component.spec.ts       # Main app component test
```

### Running Specific Tests
```bash
ng test --include='**/component-name.spec.ts'    # Run specific component
ng test --browsers=Chrome                        # Use specific browser
ng test --code-coverage                          # Generate coverage
ng test --watch=false                            # Single run mode
```

### Coverage Reports
- **Location**: `coverage/` directory (generated after `npm run test-coverage`)
- **Formats**: HTML report with detailed file-by-file coverage
- **Threshold**: Configure in `karma.conf.js` if needed

### Test Dependencies
- All test files should import required testing utilities:
  - `TestBed` for component/service testing
  - `ComponentFixture` for component DOM testing
  - Custom pipes and services should be properly mocked

### Before Merging
1. Run `npm run test-nowatch` to ensure all tests pass
2. Run `npm run test-coverage` to check coverage metrics
3. Run `npm run lint` to ensure code quality
4. Fix any failing tests or linting errors before committing

## PR instructions

- Follow the [Angular PR guidelines](https://angular.io/guide/styleguide#commit-message-guidelines) for commit messages.
- Ensure your branch is up to date with the base branch (e.g., `main` or `develop`).
- Write a clear and concise PR title and description.
- Include screenshots or videos for UI changes.
- Link to any relevant issues or discussions.
- Request reviews from appropriate team members.
- Address all feedback before merging.
