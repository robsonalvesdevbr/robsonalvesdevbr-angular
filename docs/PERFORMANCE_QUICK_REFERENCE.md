# 🚀 Performance Scripts - Referência Rápida

## Comandos Essenciais

| Script              | Comando                 | Uso                             |
| ------------------- | ----------------------- | ------------------------------- |
| 🔥 Dev Otimizado    | `npm run start:perf`    | Desenvolvimento com performance |
| 📊 Análise Visual   | `npm run build:analyze` | Ver tamanho do bundle           |
| 🎯 Audit Lighthouse | `npm run perf:audit`    | Score de performance            |
| 📈 Monitoramento    | `npm run perf:monitor`  | Métricas contínuas              |
| 📋 Estatísticas     | `npm run build:stats`   | Dados para análise              |

## Workflow Recomendado

### 🛠️ Durante Desenvolvimento

```bash
npm run start:perf    # Testar performance
npm run build:analyze # Ver o que está pesado
```

### 🚀 Antes do Deploy

```bash
npm run perf:audit    # Score deve ser > 90
```

### 📊 Monitoramento

```bash
npm run perf:monitor  # Relatórios automáticos
```

## Outputs Principais

- **Bundle Analyzer**: Interface visual no browser
- **Lighthouse**: Score 0-100 + Core Web Vitals
- **Monitor Reports**: JSON em `performance-reports/`
- **Build Stats**: `stats.json` para análise

## Métricas-Chave

| Métrica           | Ideal | Atual | Status |
| ----------------- | ----- | ----- | ------ |
| Performance Score | >90   | 92    | ✅     |
| FCP               | <1.8s | 1.4s  | ✅     |
| LCP               | <2.5s | 2.6s  | ⚠️     |
| CLS               | <0.1  | 0.08  | ✅     |

## Troubleshooting

### Lighthouse não funciona

```bash
npm install -g lighthouse
```

### Bundle Analyzer não abre

```bash
npx webpack-bundle-analyzer dist/robsonalvesdevbr-angular/stats.json
```

### Performance Monitor falha

```bash
npm install --save-dev puppeteer
```

---

**💡 Dica:** Use `npm run start:perf` durante desenvolvimento para ter feedback em tempo real!
