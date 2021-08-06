/*
 * @Author: sjp
 * @Date: 2021-07-16 15:57:33
 * @LastEditTime: 2021-08-06 17:58:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-ts\src\utils\index.ts
 */
import originJSONP from 'jsonp'

 /**
  * jsonp请求
  * url    => 接口
  * option => 传参 
  */
export default function jsonp(url: string,option?: any) {
  url += (url.indexOf('?')<0?'?':'&')
  return new Promise(function(resolve,reject) {
      originJSONP(url, option, function(err,data) {
          if(!err){
              resolve(data)
          }else{
              reject(err)
          }
      })
  })
}
export function parseTime(time: any, cFormat?: any) {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
        // eslint-disable-next-line radix
        time = parseInt(time)
      }
      if (typeof time === 'number' && time.toString().length === 10) {
        time *= 1000
      }
      date = new Date(time)
    }
    const formatObj:any = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result: any, key: any) => {
      let value = formatObj[key]
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value]
      }
      if (result.length > 0 && value < 10) {
        value = `0${value}`
      }
      return value || 0
    })
    return time_str
}