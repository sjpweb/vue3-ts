/*
 * @Author: sjp
 * @Date: 2021-07-13 13:35:43
 * @LastEditTime: 2021-07-15 17:08:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\vue.config.js
 */
// const path = require("path");
// 代码上传插件
const WebpackScpUploadPlugin = require("webpack-scp-upload-plugin");
// gzip 压缩插件
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// 清除注释
const uglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
const selfConfig = require("./self.config");
const baseUrl = process.argv.includes("--upload-id")
  ? `//yeah.jd.com/www${url}/`
  : `/`;
const HOSTURL = process.env.VUE_APP_PREAPI === "prod" ? "/" : baseUrl;
const url = `/${selfConfig.name}`;

module.exports = {
  publicPath: HOSTURL,
  css: {
    extract: false,
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/css/style.scss";',
      },
    },
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      Object.assign(
        config.optimization.minimizer[0].options.terserOptions.compress,
        { drop_console: true }
      );
      config.plugins.push(
        // 配置gzip压缩
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.js$|\.html$|\.css$/, // 匹配文件名,J
          threshold: 10240, // 对10K以上的数据进行压缩
          minRatio: 0.8,
          deleteOriginalAssets: false, //是否删除源文件
        }),
        // 清除 所有 console 与 注释
        new uglifyjsWebpackPlugin({
          uglifyOptions: {
            // 删除注释
            output: {
              comments: false,
            },
            // 删除console debugger 删除警告
            compress: {
              warnings: true,
              drop_console: true, //console
              drop_debugger: false,
              pure_funcs: ["console.log"], //移除console
            },
          },
        })
      );
    }
    config.plugins.push(
      new WebpackScpUploadPlugin({
        host: "11.50.49.179",
        password: "Zl^Xt1Qb*D2020@yeah",
        local: "dist",
        path: `/home/www${url}`,
      })
    );
  },
  devServer: {
    disableHostCheck: true,
  },
};
