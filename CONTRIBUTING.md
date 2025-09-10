# Contributing Guidelines

## Git Workflow

Este projeto segue o **Git Flow** com algumas adaptações:

### Branches

- `main`: Código de produção estável
- `develop`: Branch de desenvolvimento (integração)
- `feature/*`: Novas funcionalidades
- `fix/*`: Correções de bugs
- `release/*`: Preparação de releases
- `hotfix/*`: Correções urgentes em produção

### Convenção de Commits

Utilizamos [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

#### Types

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação (não afeta lógica)
- `refactor`: Refatoração de código
- `perf`: Melhoria de performance
- `test`: Testes
- `chore`: Tarefas de build/deploy
- `ci`: Configuração de CI/CD

#### Exemplos

```bash
feat(auth): add OAuth2 integration
fix(navigation): resolve menu collapse issue
docs(readme): update installation instructions
chore(deps): update Angular to v20.2.4
```

### Versionamento

Seguimos [Semantic Versioning](https://semver.org/):

- `MAJOR.MINOR.PATCH` (ex: 1.2.3)
- `MAJOR`: Breaking changes
- `MINOR`: Novas funcionalidades (backward compatible)
- `PATCH`: Bug fixes (backward compatible)

### Pull Request Process

1. Create feature branch from `develop`
2. Implement changes with proper commit messages
3. Test thoroughly
4. Create PR to `develop`
5. Review and merge
6. Delete feature branch

### Release Process

1. Create `release/vX.Y.Z` branch from `develop`
2. Update version numbers
3. Test and fix any issues
4. Merge to `main` with tag
5. Merge back to `develop`

## Code Quality

- Run tests: `npm test`
- Run linting: `npm run lint`
- Format code: `npm run format`
- Check format: `npm run format:check`

## Questions?

Open an issue for any questions about contributing!
