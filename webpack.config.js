// webpack.config.js - Configurações adicionais de otimização
const path = require('path');

module.exports = {
  // Configurações de otimização para produção
  optimization: {
    // Habilitar tree shaking
    usedExports: true,

    // Configurar divisão de chunks
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10
        },
        analytics: {
          test: /[\\/]node_modules[\\/](ngx-google-analytics|gtag)[\\/]/,
          name: 'analytics',
          chunks: 'all',
          priority: 20
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 5
        }
      }
    },

    // Minimização
    minimize: true,

    // Configurar sideEffects para melhor tree shaking
    sideEffects: false
  },

  // Configurações de performance
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },

  // Configurações de resolução para melhor performance
  resolve: {
    alias: {
      '@path-components': path.resolve(__dirname, 'src/app/components'),
      '@path-services': path.resolve(__dirname, 'src/app/services'),
      '@path-interfaces': path.resolve(__dirname, 'src/app/interfaces'),
      '@path-utils': path.resolve(__dirname, 'src/app/utils')
    },

    // Extensões em ordem de prioridade
    extensions: ['.ts', '.js', '.json'],

    // Reduzir busca em módulos
    modules: ['node_modules']
  },

  // Configurações para development
  devtool: 'eval-cheap-module-source-map',

  // Configurações do dev server
  devServer: {
    compress: true,
    hot: true,
    historyApiFallback: true
  }
};
