const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  publicPath: './',
  outputDir: 'vue_login',
  assetsDir: './static',
  filenameHashing:true,
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 8082,
    proxy: {
      '/api': {
          target: 'http://localhost:8081',
          ws: true, // 是否启用websockets
          changeOrigin: true,  // 代理时是否更改host
          pathRewrite: {
              '^/api': '' //这里理解成用'/api'代替target里面的地址
          }
      }
    }
  }
})

