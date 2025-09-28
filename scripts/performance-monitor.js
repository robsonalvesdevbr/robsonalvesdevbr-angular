#!/usr/bin/env node

/**
 * Performance monitoring script for development
 * Run with: npm run perf:monitor
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function monitorPerformance() {
  console.log('🚀 Starting performance monitoring...');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Enable performance monitoring
  await page.setCacheEnabled(false);

  const performanceMetrics = [];

  // Listen to console logs from the application
  page.on('console', (msg) => {
    if (msg.text().includes('Performance Report')) {
      console.log('📊', msg.text());
    }
  });

  // Measure Core Web Vitals
  await page.goto('http://localhost:4200', { waitUntil: 'networkidle2' });

  const metrics = await page.evaluate(() => {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const vitals = {};

        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            vitals.FCP = entry.startTime;
          }
          if (entry.name === 'largest-contentful-paint') {
            vitals.LCP = entry.startTime;
          }
        });

        resolve(vitals);
      }).observe({ entryTypes: ['paint', 'largest-contentful-paint'] });

      // Timeout after 10 seconds
      setTimeout(() => resolve({}), 10000);
    });
  });

  const performanceData = await page.metrics();

  const report = {
    timestamp: new Date().toISOString(),
    coreWebVitals: metrics,
    browserMetrics: {
      JSHeapUsedSize: Math.round(performanceData.JSHeapUsedSize / 1024 / 1024 * 100) / 100, // MB
      JSHeapTotalSize: Math.round(performanceData.JSHeapTotalSize / 1024 / 1024 * 100) / 100, // MB
      ScriptDuration: performanceData.ScriptDuration,
      TaskDuration: performanceData.TaskDuration,
      LayoutCount: performanceData.LayoutCount,
      RecalcStyleCount: performanceData.RecalcStyleCount
    }
  };

  console.log('📊 Performance Report:', JSON.stringify(report, null, 2));

  // Save report to file
  const reportPath = path.join(__dirname, '..', 'performance-reports');
  if (!fs.existsSync(reportPath)) {
    fs.mkdirSync(reportPath, { recursive: true });
  }

  const filename = `perf-report-${Date.now()}.json`;
  fs.writeFileSync(path.join(reportPath, filename), JSON.stringify(report, null, 2));

  console.log(`💾 Report saved to: performance-reports/${filename}`);

  await browser.close();
}

// Check if the script is run directly
if (require.main === module) {
  monitorPerformance().catch((error) => {
    console.error('❌ Error monitoring performance:', error);
    process.exit(1);
  });
}

module.exports = { monitorPerformance };
