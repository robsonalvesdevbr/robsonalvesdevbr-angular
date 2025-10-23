# Sistema de Internacionalização (i18n)

Este diretório contém os arquivos de tradução para o suporte bilíngue do aplicativo.

## Idiomas Suportados

- **pt-BR.json** - Português do Brasil (padrão)
- **en-US.json** - Inglês Americano

## Estrutura dos Arquivos

Os arquivos de tradução seguem uma estrutura hierárquica em JSON:

```json
{
  "feature": {
    "section": {
      "key": "Texto traduzido"
    }
  }
}
```

### Exemplo:

```json
{
  "navigation": {
    "about": "Sobre",
    "contact": "Contato"
  },
  "dashboard": {
    "title": "Dashboard Pessoal",
    "stats": {
      "coursesCompleted": "Cursos Concluídos"
    }
  }
}
```

## Como Adicionar Novas Traduções

### 1. Adicione a chave em ambos os arquivos

**pt-BR.json:**
```json
{
  "myFeature": {
    "title": "Meu Título"
  }
}
```

**en-US.json:**
```json
{
  "myFeature": {
    "title": "My Title"
  }
}
```

### 2. Use no template HTML

```html
<h1>{{ 'myFeature.title' | translate }}</h1>
```

## Interpolação de Parâmetros

Para incluir variáveis dinâmicas nas traduções, use `{{variableName}}`:

**pt-BR.json:**
```json
{
  "greeting": "Olá, {{name}}!"
}
```

**Template:**
```html
<p>{{ 'greeting' | translate:{ name: userName() } }}</p>
```

## Convenções de Nomenclatura

1. **Use snake_case em minúsculas** com pontos para hierarquia
2. **Estrutura recomendada**: `feature.section.element`
3. **Exemplos válidos**:
   - `navigation.about`
   - `dashboard.stats.coursesCompleted`
   - `common.loading`

## Organização

- **navigation**: Links de navegação e menu
- **dashboard**: Seção de dashboard e estatísticas
- **about**: Seção sobre e timeline de carreira
- **common**: Strings compartilhadas (loading, errors, buttons, etc.)

## Validação

Antes de fazer commit, certifique-se de que:

1. ✅ Todas as chaves existem em **ambos** os arquivos (pt-BR.json e en-US.json)
2. ✅ A estrutura hierárquica é idêntica em ambos os arquivos
3. ✅ Não há chaves duplicadas
4. ✅ O JSON está formatado corretamente (sem erros de sintaxe)

## Scripts Úteis

### Validar traduções
```bash
npm run validate:translations
```

## Importante

⚠️ **Dados do `src/app/data/` NÃO devem ser traduzidos**

O sistema de internacionalização afeta apenas:
- Textos da interface (UI)
- Labels e títulos
- Mensagens ao usuário
- Navegação

Dados como cursos, livros, graduações permanecem no idioma original.

## Exemplo Completo

**Componente TypeScript:**
```typescript
import { TranslatePipe } from '@path-pipes/translate.pipe';

@Component({
  imports: [TranslatePipe],
  // ...
})
export class MyComponent {
  // Uso direto via serviço (opcional)
  welcomeMessage = computed(() =>
    this.languageService.translate('home.welcome')
  );
}
```

**Template HTML:**
```html
<!-- Uso básico -->
<h1>{{ 'home.title' | translate }}</h1>

<!-- Com parâmetros -->
<p>{{ 'home.greeting' | translate:{ name: userName() } }}</p>

<!-- Em atributos -->
<button [attr.aria-label]="'common.close' | translate">
  X
</button>
```

## Troubleshooting

### Tradução não aparece
1. Verifique se a chave existe em ambos os arquivos
2. Verifique a ortografia da chave
3. Certifique-se de que o TranslatePipe está importado no componente
4. Verifique o console do navegador para avisos

### Tradução mostra a chave ao invés do texto
- A chave não existe no arquivo de tradução
- Verifique warnings no console: `Translation missing for key: sua.chave`

### Parâmetros não são substituídos
- Certifique-se de usar `{{variableName}}` no arquivo JSON
- Verifique se está passando os parâmetros corretamente no pipe

## Contato

Para dúvidas ou sugestões sobre o sistema de tradução, consulte a documentação do Angular ou abra uma issue no repositório.
