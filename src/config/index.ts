/*
 * @Author: sjp
 * @Date: 2021-07-14 14:09:43
 * @LastEditTime: 2021-07-15 09:40:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\config\index.ts
 */
/*
 * @Author: sjp
 * @Date: 2021-04-15 17:44:56
 * @LastEditTime: 2021-06-15 17:57:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static\src\config\index.js
 */



const env = process.env.VUE_APP_PREAPI as string
const apiBaseUrl:ApiBaseUrlType = {
  pre: "https://votetest.jd.com", //预发环境  也是后台的路径
  ebs: "https://sharecarefree.jd.com", // ebs环境
  prod: "//jzyfapi.jd.com", // 线上环境
};
// 接口也是后台地址
const baseUrl  = apiBaseUrl[env];

// 京东url
const jdUrl = {
  // 登录组件
  login:
    "https://passport.jd.com/common/loginPage?from=uc_jcloud&regTag=2&pwdTag=2&btnTag=&ReturnUrl={URL}",
  // 注册组件
  enroll:
    "https://reg.jd.com/e/common/regPage?source=jingzhi_pc&ReturnUrl={URL}",
};
export default {
  baseUrl,
  jdUrl,
};
