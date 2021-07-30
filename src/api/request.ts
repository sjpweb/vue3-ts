/*
 * @Author: sph
 * @Date: 2021-02-24 17:39:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-28 13:07:26
 * @Description: 
 */

/*
 * 接口返回注释1
 * 200	 "成功"
 * 201	 "重复操作"
 * 302	 "未登录"
 * 400	 "请求参数不合规，传参异常"
 * 500	 "内部错误，服务器端抛出异常"
*/

import axios from 'axios'
import router from '../router'
import config from '@/config'
import { ElMessage } from 'element-plus'
import store from '@/store'

// 接口配置
const PLATFORM_HOST = config.baseUrl
type Method = 'get' | 'GET'  | 'delete' | 'Delete'  | 'head' | 'HEAD'  | 'options' | 'OPTIONS'  | 'post' | 'POST'  | 'put' | 'PUT' | 'patch' | 'PATCH'
interface AxiosRequestConfig {
  url: string
 type: Method
 options?: any
 isLogin?: boolean
 others?: any
}

const handlerResult = (resolve: any, reject: any, result: any, isLogin:boolean|undefined) => {
  const { data, status } = result
  // 账号禁用
  if (data.code === 3002) {
    store.dispatch('user/setUserInfo', data.data)
    router.replace('/forbidden')
    return
  }
  // 实名过期
  if (data.code === 4004) {
    router.replace('/realNameoverdue')
    return
  }
  // 未登录，直接到登录页面
  const loginCode = [
    1005, //失效的userCode
    3001, //PIN与手机不匹配
    4000, //跳转
    4001, //用户未登录
    // 3004,  //手机号码格式不正确
    // 3005,  //手机验证码已过期!
    // 3006,  //手机验证码不正确!
    // 3007,  //邮箱格式不正确
    // 3008,  //邮箱验证码已过期!
    // 3009,  //邮箱验证码不正确！
    // 4005,  //工程师未实名
    // 4006,  //工程师确认服务商
    // 4007,  //工程师认证成功
    4008, //非本站企业用户
    4009 //不是企业用户
  ]
  if (loginCode.includes(data.code)) {
    store.dispatch('user/logOut')
    router.replace('/login')
    return
  }

  const errorCode = [
    1001, //参数中存在空值
    1002, //参数异常
    1004, //接口异常
    2000, //业务原因异常
    2020, //业务异常
    2100, //采购商还未实名认证，无法签约！
    2101, //采购商还未缴纳质保金，无法签约！
    2102, //服务商还未实名认证，无法签约！
    2103, //服务商未缴纳质保金，无法签约！
    2104, //采购商钱包余额不足，无法签约！
    2105, //采购商还未入驻完成，无法签约！
    2106, //服务商还未入驻完成，无法签约！
    2107, //当前选择时间段与合同号[{0}]的时间段存在重叠，无法签约！
    2109, //服务[{0}]已经失效，无法签约！
    2110, //服务[{0}]与合同[{1}]中的服务[{2}]属性重叠，无法签约！
    2111, //合同号不存在，无法查看！
    2112, //文件转图片失败，无法查看！
    2113, //合同已确认，无法操作！
    2114, //合同已盖章，无法操作！
    2115, //您后台有正在进行的合同保存操作，请稍后尝试！
    3000, //提示
    3003, //您已选择过入驻身份，暂不可更改。
    5000 //服务不可用,请重试！
  ]
  // 错误
  if (errorCode.includes(data.code)) {
    ElMessage({
      center: true,
      duration: 2000,
      message: data.msg
    })
    reject(data)
    isLogin && store.dispatch('user/logOut')
    return
  }
  if (status === 200) {
    resolve(data)
  } else {
    reject(data)
  }
}

const ajax = ({url, type, options, isLogin, others = {}}: AxiosRequestConfig) => {
  const jdPin = store.state.user.userInfo.jdPin
  const headers: any = {
    'X-Requested-With': 'XMLHttpRequest'
  }
  if (jdPin) headers.jdpin = encodeURIComponent(jdPin)
  const HOSTUrl = PLATFORM_HOST + url
  return new Promise((resolve, reject) => {
    //解决http get请求缓存问题
    if (type === 'get') {
      options = options ? options : {}
      options.t = new Date().getTime()
    }
    axios({
      ...others,
      method: type,
      url: HOSTUrl,
      params: type === 'get' ? options : null,
      data: type !== 'get' ? options : null,
      //CORS跨域是否携带cookie
      withCredentials: true,
      headers: headers
    })
      .then(result => handlerResult(resolve, reject, result, isLogin ))
      .catch(() => {
        // 获取角色接口报错 回到登录
        if (isLogin) {
          store.dispatch('user/logOut')
        }
        ElMessage({
          center: true,
          duration: 2000,
          message: '服务器开小差了~'
        })
        reject()
      })
  })
}

export default {
  async get(url: string, options?: any, isLogin?: boolean) {
    return await ajax({url, type:'get', options, isLogin})
  },
  // post请求，参数类型为json格式
  async post(url: string, options?: any, isLogin?: boolean) {
    return await ajax({url, type:'post', options, isLogin})
  },
  // post请求，参数为form格式
  async postForm(url: string, options?: any, isLogin?: boolean) {
    let paramsStr = ''
    const keys = options ? Object.keys(options) : [],
      requestHeader = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    keys.forEach((key, index) => {
      paramsStr += `${index == 0 ? '' : '&'}${key}=${options[key]}`
    })
    return await ajax({url, type:'post', options: paramsStr, isLogin, others: requestHeader})
  }
}
