/*
 * @Author: sjp
 * @Date: 2021-04-12 10:44:20
 * @LastEditTime: 2021-04-25 09:25:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static\src\api\service.js
 */
import Api from '@/api'

export default {
  async testHttpGet() {
    // 第三方平台接口请求示例
    return await Api.get('/wx/home/index', {})
  },
  async testHttpPost() {
    return await Api.post('/wx/auth/logCaptcha', { mobile: '13700001111' })
  }
}
