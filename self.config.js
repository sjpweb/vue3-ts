/*
 * @Author: sjp
 * @Date: 2021-07-14 09:15:22
 * @LastEditTime: 2021-07-14 09:15:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\self.config.js
 */
const config = {
  name: "3cs-ebs", // 项目名称及项目在服务器上的文件名
  htmlTitle: "京东服务商平台", // 网页标题
  apiDomain: "jzyfapi.jd.com", // 线上接口域名
  preAPIDomain: "jzyfapi.jd.com", // 预发接口域名,为''时：认为与线上接口域名一致http://114.67.215.252
  platformApiDomain: [], // 第三方平台接口域名，若无则为空数组,支持多个平台接口
  devApiPort: "80", // 本地数据mock的端口号
};
module.exports = config;
