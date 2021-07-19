/*
 * @Author: sjp
 * @Date: 2021-07-16 15:57:33
 * @LastEditTime: 2021-07-16 16:48:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\utils\index.ts
 */
import originJSONP from 'jsonp'

// function param(data: any) {
//   let url = ''
//   for (var k in data) {
//     let value = data[k] !== undefined ? data[k] : ''
//     url += '&' + k + '=' + encodeURIComponent(value)
//   }
//   return url ? url.substring(1) : ''
// }
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

