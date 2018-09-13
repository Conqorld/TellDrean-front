module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      '/tellDream': {target: 'http://localhost:3000'},
    }, // 设置代理
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}
