# 📊 Scripts de Performance - Documentação Completa

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Guia de Uso](#-guia-de-uso)
- [Outputs e Relatórios](#-outputs-e-relatórios)
- [Casos de Uso](#-casos-de-uso)
- [Troubleshooting](#-troubleshooting)

## 🎯 Visão Geral

Esta documentação descreve os **5 novos scripts de performance** adicionados ao projeto Angular para monitoramento, análise e otimização de performance em tempo real.

### Scripts Implementados

| Script          | Comando                 | Finalidade                        |
| --------------- | ----------------------- | --------------------------------- |
| `start:perf`    | `npm run start:perf`    | Desenvolvimento com otimizações   |
| `build:stats`   | `npm run build:stats`   | Build com estatísticas detalhadas |
| `build:analyze` | `npm run build:analyze` | Análise visual do bundle          |
| `perf:audit`    | `npm run perf:audit`    | Auditoria Lighthouse              |
| `perf:monitor`  | `npm run perf:monitor`  | Monitoramento automatizado        |

## 🚀 Scripts Disponíveis

### 1. `start:perf` - Servidor de Desenvolvimento Otimizado

```bash
npm run start:perf
```

**Comando executado:**

```bash
ng serve --optimization --named-chunks
```

**Funcionalidades:**

- ✅ **Minificação** ativa em desenvolvimento
- ✅ **Tree shaking** habilitado
- ✅ **Named chunks** para debug
- ✅ **Source maps** otimizados
- ✅ **Bundle splitting** inteligente

**Quando usar:**

- Testar performance durante desenvolvimento
- Verificar otimizações em tempo real
- Debug de problemas específicos de produção
- Validar lazy loading e code splitting

**Output esperado:**

```bash
Initial chunk files | Names         |  Raw size
styles.css          | styles        | 385.21 kB |
main.js             | main          | 298.45 kB |
scripts.js          | scripts       | 136.95 kB |
vendor.js           | vendor        | 124.32 kB |

Bundle generation complete. [1.8 seconds]
➜  Local:   http://localhost:4200/
```

---

### 2. `build:stats` - Build com Estatísticas

```bash
npm run build:stats
```

**Comando executado:**

```bash
ng build --configuration production --stats-json
```

**Funcionalidades:**

- ✅ **Build de produção** completo
- ✅ **Arquivo stats.json** gerado
- ✅ **Métricas detalhadas** do webpack
- ✅ **Análise de dependencies** preparada

**Arquivos gerados:**

```
dist/
├── robsonalvesdevbr-angular/
│   ├── index.html
│   ├── main.js
│   ├── styles.css
│   └── stats.json          # ← Arquivo de estatísticas
```

**Conteúdo do stats.json:**

- Tamanho de cada módulo
- Dependency graph
- Chunk information
- Asset details
- Build time metrics

---

### 3. `build:analyze` - Análise Visual do Bundle

```bash
npm run build:analyze
```

**Comando executado:**

```bash
ng build --configuration production --stats-json &&
npx webpack-bundle-analyzer dist/robsonalvesdevbr-angular/stats.json
```

**Funcionalidades:**

- ✅ **Visualização interativa** do bundle
- ✅ **Treemap colorido** por tamanho
- ✅ **Identificação de dependencies** grandes
- ✅ **Oportunidades de otimização**
- ✅ **Code splitting analysis**

**Interface visual:**

```
🌐 Abre automaticamente no browser em http://127.0.0.1:8888
📊 Mostra treemap interativo com:
  - Tamanho real de cada módulo
  - Parsed size vs Gzipped size
  - Dependency breakdown
  - Vendor vs Application code
```

**Exemplo de insights:**

- `node_modules/`: 65% do bundle
- `ngx-google-analytics/`: 15% do vendor
- `bootstrap/`: 12% do CSS
- Oportunidades de lazy loading

---

### 4. `perf:audit` - Auditoria Lighthouse

```bash
npm run perf:audit
```

**Comando executado:**

```bash
ng build --configuration production &&
npx lighthouse http://localhost:4200 --only-categories=performance --chrome-flags="--headless"
```

**Pré-requisitos:**

```bash
# Instalar Lighthouse globalmente
npm install -g lighthouse

# Ou usar npx (já configurado)
```

**Funcionalidades:**

- ✅ **Core Web Vitals** completos
- ✅ **Performance score** (0-100)
- ✅ **Relatório detalhado** HTML
- ✅ **Oportunidades específicas**
- ✅ **Métricas reais** de carregamento

**Métricas analisadas:**

```
🎯 Core Web Vitals:
  - FCP (First Contentful Paint)
  - LCP (Largest Contentful Paint)
  - TTI (Time to Interactive)
  - CLS (Cumulative Layout Shift)
  - FID (First Input Delay)

⚡ Performance Metrics:
  - Speed Index
  - Total Blocking Time
  - Max Potential FID
```

**Output:**

```bash
✅ Performance Score: 92/100
⚡ First Contentful Paint: 1.4s
🎯 Largest Contentful Paint: 2.6s
🎭 Cumulative Layout Shift: 0.08
📊 Speed Index: 2.1s
```

---

### 5. `perf:monitor` - Monitoramento Automatizado

```bash
npm run perf:monitor
```

**Comando executado:**

```bash
ng serve --optimization && node scripts/performance-monitor.js
```

**Pré-requisitos:**

```bash
# Instalar dependências opcionais
npm install --save-dev puppeteer
```

**Funcionalidades:**

- ✅ **Monitoramento contínuo** em background
- ✅ **Captura automática** de métricas
- ✅ **Relatórios JSON** timestamped
- ✅ **Memory usage** tracking
- ✅ **Core Web Vitals** reais

**Processo automatizado:**

1. Inicia servidor otimizado
2. Abre browser headless (Puppeteer)
3. Navega na aplicação
4. Captura métricas em tempo real
5. Salva relatórios em `performance-reports/`

**Relatórios gerados:**

```
performance-reports/
├── perf-report-1695853200000.json
├── perf-report-1695853260000.json
└── perf-report-1695853320000.json
```

**Estrutura do relatório:**

```json
{
  "timestamp": "2025-09-27T21:45:00.000Z",
  "coreWebVitals": {
    "FCP": 1400.2,
    "LCP": 2600.8
  },
  "browserMetrics": {
    "JSHeapUsedSize": 28.5,
    "JSHeapTotalSize": 45.2,
    "ScriptDuration": 12.3,
    "TaskDuration": 8.7,
    "LayoutCount": 15,
    "RecalcStyleCount": 23
  }
}
```

## 📖 Guia de Uso

### Workflow Completo de Performance

#### 1. **Desenvolvimento Diário**

```bash
# Desenvolvimento normal
npm start

# Quando precisar testar performance
npm run start:perf
```

#### 2. **Análise Semanal**

```bash
# Verificar tamanho do bundle
npm run build:analyze

# Identificar dependencies grandes
# Planejar otimizações
```

#### 3. **Release/Deploy**

```bash
# Audit completo antes do deploy
npm run perf:audit

# Validar Core Web Vitals
# Garantir score > 90
```

#### 4. **Monitoramento Contínuo**

```bash
# Setup de monitoramento (CI/CD)
npm run perf:monitor

# Análise de tendências
# Detecção de regressões
```

### Casos de Uso Específicos

#### **Developer Experience**

```bash
# Debug de performance lenta
npm run start:perf

# Identificar módulo pesado
npm run build:analyze

# Validar otimização
npm run perf:audit
```

#### **QA Testing**

```bash
# Teste de performance em staging
npm run perf:monitor

# Relatórios automatizados
# Comparação com baseline
```

#### **DevOps/CI Pipeline**

```bash
# Build com métricas
npm run build:stats

# Threshold de performance
# Fail builds se score < 85
```

## 📊 Outputs e Relatórios

### Bundle Analyzer - Análise Visual

**Acesso:** `npm run build:analyze` → Abre browser automaticamente

**Interface:**

- 🗺️ **Treemap interativo** com zoom
- 📏 **Tamanhos reais** vs comprimidos
- 🎯 **Click para drill-down** em módulos
- 📈 **Comparação** entre versions

**Insights típicos:**

```
📦 Total Bundle: 856.66 kB
├── 🏪 Vendors (65%): 556.83 kB
│   ├── @angular/core: 180.2 kB
│   ├── ngx-google-analytics: 95.4 kB
│   └── bootstrap: 87.6 kB
├── 📱 Application (25%): 214.17 kB
│   ├── components/: 125.3 kB
│   ├── services/: 58.7 kB
│   └── utils/: 30.17 kB
└── 🎨 Assets (10%): 85.66 kB
```

### Lighthouse Reports

**Acesso:** Relatório HTML gerado automaticamente

**Seções principais:**

1. **Performance Score** (0-100)
2. **Core Web Vitals** with thresholds
3. **Opportunities** (specific optimizations)
4. **Diagnostics** (general issues)
5. **Passed Audits** (what's working well)

**Exemplo de oportunidades:**

- "Eliminate render-blocking resources" (-0.5s)
- "Enable text compression" (-120 kB)
- "Properly size images" (-45 kB)

### Performance Monitor Reports

**Localização:** `performance-reports/perf-report-[timestamp].json`

**Frequência:** A cada execução do script

**Uso programático:**

```javascript
// Carregar e analisar relatório
const report = require('./performance-reports/perf-report-latest.json');

console.log(`FCP: ${report.coreWebVitals.FCP}ms`);
console.log(`Memory: ${report.browserMetrics.JSHeapUsedSize}MB`);

// Comparar com baseline
const isRegression = report.coreWebVitals.LCP > 2500;
```

## 🎯 Casos de Uso

### Para Desenvolvedores

**Cenário:** Performance lenta durante desenvolvimento

```bash
# 1. Identificar o problema
npm run start:perf  # Testar com otimizações

# 2. Analisar bundle
npm run build:analyze  # Ver o que está pesado

# 3. Implementar fix
# ... código ...

# 4. Validar melhoria
npm run perf:audit  # Confirmar score melhorou
```

### Para QA/Testers

**Cenário:** Validação de performance em staging

```bash
# 1. Setup de monitoramento
npm run perf:monitor  # Capturar métricas base

# 2. Executar testes funcionais
# ... testes manuais/automatizados ...

# 3. Analisar relatórios
ls performance-reports/  # Ver todos os reports

# 4. Comparar com produção
# Validar se métricas estão dentro do esperado
```

### Para DevOps/CI

**Cenário:** Pipeline de performance

```yaml
# .github/workflows/performance.yml
- name: Performance Analysis
  run: |
    npm run build:stats
    npm run perf:audit

- name: Upload Reports
  uses: actions/upload-artifact@v2
  with:
    name: performance-reports
    path: performance-reports/
```

### Para Product Owners

**Cenário:** Tracking de métricas de negócio

- **Core Web Vitals** → User Experience
- **Bundle size** → Loading time
- **Memory usage** → Device performance
- **Performance score** → SEO ranking

## 🔧 Troubleshooting

### Problema: `lighthouse` não encontrado

```bash
# Solução: Instalar globalmente
npm install -g lighthouse

# Ou usar npx (já configurado)
npx lighthouse --version
```

### Problema: `puppeteer` não instalado

```bash
# Solução: Instalar dependência
npm install --save-dev puppeteer

# Para sistemas Linux
sudo apt-get install chromium-browser
```

### Problema: Bundle analyzer não abre

```bash
# Verificar se stats.json existe
ls dist/robsonalvesdevbr-angular/stats.json

# Executar manualmente
npx webpack-bundle-analyzer dist/robsonalvesdevbr-angular/stats.json
```

### Problema: Performance baixa no `start:perf`

```bash
# Normal! Otimizações adicionam overhead inicial
# Foque nas métricas finais, não no tempo de build
```

### Problema: Lighthouse falha

```bash
# Verificar se aplicação está rodando
curl http://localhost:4200

# Executar build primeiro
npm run build:prod
```

## 📈 Próximos Passos

### Integrações Futuras

- [ ] **CI/CD Pipeline** integration
- [ ] **Slack/Teams** notifications
- [ ] **Performance budget** enforcement
- [ ] **Historical trending** dashboard
- [ ] **A/B testing** support

### Métricas Avançadas

- [ ] **User-centric metrics** (INP, TTFB)
- [ ] **Business metrics** (conversion, bounce)
- [ ] **Device-specific** performance
- [ ] **Network condition** simulation

---

## 🚀 Quick Start

```bash
# 1. Testar performance agora
npm run start:perf

# 2. Analisar bundle
npm run build:analyze

# 3. Audit completo
npm run perf:audit
```

**🎯 Meta:** Manter Performance Score > 90 e Core Web Vitals no verde!
