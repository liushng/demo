const path = require("path");
const CompressionPlugin = require('compression-webpack-plugin');
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require("webpack");
process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'patient',
  assetsDir: 'static',
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8090,
    https: false,
    hotOnly: false,
    // proxy: 'http://192.168.0.126:7071', //开发
    // proxy: 'http://192.168.0.100:7071', //测试
    proxy: 'http://192.168.0.111:7071', //浩哥本地
    before: app => {},
    disableHostCheck: true
  },
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  //将接收ChainableConfig由webpack-chain提供支持的实例的函数。允许对内部webpack配置进行更细粒度的修改
  chainWebpack: (config) => {
    config.resolve.alias
      .set('assets', path.join(__dirname, 'src/assets'))
      .set('components', path.join(__dirname, 'src/components'))
      .set('images', path.join(__dirname, 'src/assets/images'))
      .set('@', path.join(__dirname, 'src'))
    config
      .plugin("ignore")
      .use(
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/)
      );
    const cdn = {
      // 访问https://unpkg.com/element-ui/lib/theme-chalk/index.css获取最新版本
      css: [],
      js: [
        '//cdn.staticfile.org/vue/2.6.6/vue.min.js',
        '//cdn.staticfile.org/vuex/3.0.1/vuex.js',
        '//cdn.staticfile.org/vue-router/3.0.1/vue-router.min.js',
        '//cdn.staticfile.org/axios/0.18.0/axios.min.js'
      ]
    };

    // html中添加cdn
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
  },
  /**
   * import Vue from 'vue'
   * Vue对应config.externals的value
   * vue对应config.externals的key
   * @param {*} config.externals
   */
  configureWebpack: config => {
    config.externals = {
      'vue': "Vue",
      'vuex': "Vuex",
      "vue-router": "VueRouter",
      "axios": "axios",
    }
    if (IS_PROD) {
      const plugins = [];
      // gzip压缩
      plugins.push(new CompressionPlugin({
        test: /\.js$|\.html$|\.css/,
        threshold: 204800, //200kb
        deleteOriginalAssets: false
      }))
      // 删除console  注释使用自己的log方法
      // plugins.push(
      //   new UglifyJsPlugin({
      //     uglifyOptions: {
      //       warnings: false,
      //       compress: {
      //         drop_console: true,
      //         drop_debugger: false,
      //         pure_funcs: ['console.log'] //移除console
      //       }
      //     },
      //     sourceMap: false,
      //     parallel: true
      //   })
      // );
      config.plugins = [...config.plugins, ...plugins]
    }
  },
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {},
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
}