/*
 * @Author: sjp
 * @Date: 2021-04-16 15:16:12
 * @LastEditTime: 2021-07-15 11:34:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\config\state.ts
 */
// import api from '@/api/common'
// import icon from '@/assets/images/ico-shenhe.png'
// import icon1 from '@/assets/images/ico-welcome.png'
// import icon2 from '@/assets/images/ico-realName.png'
// import url from '@/config'
// import store from '@/store/index'
// const { baseUrl } = url
// const userType = store.state.user.userInfo.userType // 用户身份
// const step = (userType === 2 && 4) || (userType === 1 && 3)
// const show = (userType === 2 && 3) || (userType === 1 && 2)
// /*
//  * img  状态图标
//  * icon  状态图标
//  * text  状态文本
//  * reason  状态解释
//  * btn  按钮
//  * url  点击按钮调整路径
//  * state  点击按钮调整组件
//  * btns  按钮列表
//  * event  按钮事件
//  */

// var that = this
// // 跳转实名认证或开通钱包页面
// // function eventTO(_vm, { url }) {
// //   _vm.$http.jsonp('https://sso.jd.com/setCookie?t=sso.jdpay.com').then(function() {
// //     _vm.$router.push(url)
// //   })
// // }
// function eventToRealName(_vm, { url }) {
//   // 获取实名地址 实名认证会回跳然后携带参数s=3cs url1为返回后跳转的地址  url2为直接跳转的地址
//   api.getRealNameUrl().then(res => {
//     if (res && res.code === 1000) {
//       const {
//         realNameUrl: { url1, url2 }
//       } = res.data
//       _vm.$http.jsonp('https://sso.jd.com/setCookie?t=sso.jdpay.com').then(function() {
//         if (_vm.$route.query.s === '3cs') {
//           _vm.$store.dispatch('process/setRealNameUrl', url2)
//           _vm.$router.push(url)
//         } else {
//           _vm.$store.dispatch('process/setTempRealNameUrl', url2)
//           _vm.$store.dispatch('process/setRealNameUrl', url1)
//           _vm.$router.push(url)
//         }
//       })
//     }
//   })
// }
// // 点击开通钱包时修改步骤
// function openWallet(_vm) {
//   api.updateEntrySteps().then(() => {
//     // 获取钱包地址
//     const { protocol, host, pathname } = location
//     const url = `${protocol}//${host}${pathname}#/enterProcess`
//     api.openWallet({ returnUrl: url }).then(res => {
//       const {
//         code,
//         data: { openUrl, callBackUrl, walletOpenStat }
//       } = res
//       if (code == 1000) {
//         _vm.$http.jsonp('https://sso.jd.com/setCookie?t=sso.jdpay.com').then(function() {
//           if (_vm.$route.query.s === '3cs') {
//             _vm.$store.dispatch('process/setOpenWalletUrl', openUrl)
//             _vm.$router.push('/openWallet')
//           } else {
//             _vm.$store.dispatch('process/setOpenWalletUrl', callBackUrl)
//             _vm.$store.dispatch('process/setTempWalletUrl', openUrl)
//             _vm.$router.push('/openWallet')
//           }
//         })
//         // 设置钱包状态
//         this.state = walletOpenStat
//       }
//     })
//   })
// }

// // 查看钱包详情及进度
// function walletDetail(_vm) {
//   const { protocol, host, pathname } = location
//   const str = `${protocol}//${host}${pathname}`
//   const url = `${str}#/enterProcess`
//   api.openWallet({ returnUrl: url }).then(res => {
//     const {
//       data: { openUrl, walletOpenStat, callBackUrl }
//     } = res

//     _vm.$http.jsonp('https://sso.jd.com/setCookie?t=sso.jdpay.com').then(function() {
//       if (_vm.$route.query.s === '3cs') {
//         _vm.$store.dispatch('process/setOpenWalletUrl', openUrl)
//         _vm.$router.push('/openWallet')
//       } else {
//         _vm.$store.dispatch('process/setOpenWalletUrl', callBackUrl)
//         _vm.$store.dispatch('process/setTempWalletUrl', openUrl)
//         _vm.$router.push('/openWallet')
//       }
//       _vm.state = walletOpenStat
//     })
//   })
// }
// // 通过父子组件修改展示组件与组件状态
// function setParentState(_vm, { state }) {
//   const { show } = state
//   _vm.$parent.artificialCheck && _vm.$parent.artificialCheck(show)
// }
// // 打开新页面
// function openPage(_vm, { isOpen, url }) {
//   if (isOpen) {
//     window.open(url)
//     return
//   }
//   _vm.$router.push(url)
// }
// export const tacitlyState = {
//   '0': {
//     img: icon,
//     text: '加载中...',
//     reason: ['正在获取当前状态，请耐心等待']
//   }
// }
// // 实名状态
// export const realNameState = {
//   '0': {
//     img: icon2,
//     text: '实名认证',
//     reason: ['请进行实名认证，保证企业信息真实有效'],
//     btn: '去实名',
//     url: '/realName',
//     event: eventToRealName
//   },
//   '1': {
//     icon: 'el-icon-success',
//     color: '#41c558',
//     text: '恭喜，实名认证通过',
//     reason: ['恭喜，您的企业实名认证已通过，请开通企业钱包，用于后续结算'],
//     btn: '开通钱包',
//     url: '/openWallet',
//     event: openWallet
//   },
//   '2': {
//     icon: 'el-icon-warning',
//     color: '#f81938',
//     text: '抱歉，您的实名认证已过期，请重新进行认证',
//     btn: '去认证',
//     url: '/realName',
//     event: eventToRealName
//   },
//   '3': {
//     img: icon,
//     text: '审核中...',
//     reason: ['您的实名认证正在审核中，可点击查看进度'],
//     btn: '查看进度',
//     url: '/realName',
//     event: eventToRealName
//   },
//   '4': {
//     icon: 'el-icon-warning',
//     color: '#f81938',
//     text: '抱歉，审核未通过',
//     reason: ['抱歉，您的企业实名认证未通过，请点击查看详情'],
//     btn: '点击查看详情',
//     url: '/realName',
//     event: eventToRealName
//   },
//   '5': {
//     icon: 'el-icon-warning',
//     color: '#f81938',
//     text: '抱歉，检测到您的企业已在京致·云服中入驻过，不可再次入驻'
//   }
// }
// // 钱包状态
// export const walletState = {
//   '0': {
//     icon: 'el-icon-success',
//     color: '#41c558',
//     text: '恭喜，实名认证通过',
//     reason: ['恭喜，您的企业实名认证已通过，请开通企业钱包，用于后续结算'],
//     btn: '开通钱包',
//     url: '/openWallet',
//     event: walletDetail
//   },
//   '1': {
//     img: icon,
//     text: '审核中...',
//     reason: ['您开通的企业钱包正在审核中，可点击查看进度'],
//     btn: '查看进度',
//     url: '/openWallet',
//     event: walletDetail
//   },
//   '2': {
//     icon: 'el-icon-success',
//     color: '#41c558',
//     text: '恭喜，企业钱包已开通成功',
//     reason: ['恭喜，您的企业钱包已开通成功，请填写联系方式'],
//     btn: '去填写',
//     state: {
//       step: 3,
//       show: 2
//     },
//     event: function(_vm, val) {
//       api.updateEntrySteps().then(() => {
//         setParentState(_vm, val)
//       })
//     }
//   },
//   '3': {
//     icon: 'el-icon-warning',
//     color: '#f81938',
//     text: '抱歉，企业钱包未开通成功',
//     reason: ['抱歉，您的企业钱包未开通成功，可点击查看详情'],
//     btn: '查看详情',
//     url: '/openWallet',
//     event: walletDetail
//   },
//   '4': {
//     icon: 'el-icon-warning',
//     color: '#f81938',
//     text: '抱歉，检测到您的企业已在京致·云服中入驻过，不可再次入驻'
//   }
// }
// // 人工审核状态
// export const manpowerState = {
//   '0': {
//     img: icon,
//     text: '审核中...',
//     reason: ['正在进行人工审核，请耐心等待...']
//   },
//   '1': {
//     img: icon,
//     text: '审核中...',
//     reason: ['正在进行人工审核，请耐心等待...']
//   },
//   '5': {
//     icon: 'el-icon-warning',
//     color: '#f81938',
//     text: '抱歉，您的人工审核未通过，原因如下：',
//     reason: ['1.企业资质未通过审核', '请完善信息后重新提交，否则无法进行新的合作'],
//     btn: '继续完善',
//     state: {
//       step: step,
//       show: show
//     },
//     event: function(_vm, { state }) {
//       api.updateLastEntrySteps().then(res => {
//         if (res.code === 1000) {
//           const { show } = state
//           _vm.$parent.artificialCheck && _vm.$parent.artificialCheck(show)
//         }
//       })
//     }
//   }
// }
// // 合同签署状态
// export const completeState = {
//   '0': {
//     icon: 'el-icon-success',
//     color: '#41c558',
//     text: '恭喜，您已完成入驻流程',
//     btns: [
//       {
//         text: '去门户首页',
//         url: '/home',
//         class: 'btn-red btn',
//         event: openPage
//       },
//       {
//         text: '进入商家后台',
//         class: 'lbtn-red btn',
//         isOpen: true,
//         url: baseUrl,
//         event: openPage
//       }
//     ]
//   }
// }
// // 账号禁用状态
// export const forbiddenState = {
//   '0': {
//     icon: 'el-icon-warning',
//     color: '#f81938',
//     text: ''
//   }
// }
// // 网点状态
// export const branchState = {
//   '0': {
//     img: icon1,
//     text: '尊敬的服务网点，欢迎来到京致·云服',
//     reason: ['您好，已有服务商邀请您加入平台，完成入驻即可开始接单啦~'],
//     btn: '立即入驻',
//     url: '/realName',
//     event: eventToRealName
//   },
//   '1': {
//     img: icon1,
//     text: '尊敬的服务网点，欢迎来到京致·云服',
//     reason: ['抱歉，暂无服务商录入您的信息']
//   },
//   '2': {
//     icon: 'el-icon-success',
//     color: '#41c558',
//     text: '恭喜，您已完成入驻流程',
//     btn: '进入商家后台',
//     url: baseUrl,
//     isOpen: true,
//     event: openPage
//   }
// }
// // 网点实名状态
// export const branchRealNameState = {
//   '0': {
//     img: icon2,
//     text: '实名认证',
//     reason: ['请进行实名认证，保证企业信息真实有效'],
//     btn: '去实名',
//     url: '/realName',
//     event: eventToRealName
//   },
//   '1': {
//     icon: 'el-icon-success',
//     color: '#41c558',
//     text: '恭喜，实名认证通过',
//     reason: ['恭喜，您的企业实名认证已通过，请提报网点信息'],
//     btn: '提报信息',
//     url: '/openWallet',
//     event: function(_vm) {
//       // 网点提报信息 需要修改步骤
//       if (userType === 3) {
//         api.updateEntrySteps().then(() => {
//           _vm.$parent.artificialCheck && _vm.$parent.artificialCheck(2, 2)
//         })
//       }
//     }
//   },
//   '2': {
//     icon: 'el-icon-warning',
//     color: '#f81938',
//     text: '抱歉，您的实名认证已过期，请重新进行认证',
//     btn: '去认证',
//     url: '/realName',
//     event: eventToRealName
//   },
//   '3': {
//     img: icon,
//     text: '审核中...',
//     reason: ['您的实名认证正在审核中，可点击查看进度'],
//     btn: '查看进度',
//     url: '/realName',
//     event: eventToRealName
//   },
//   '4': {
//     icon: 'el-icon-warning',
//     color: '#f81938',
//     text: '抱歉，审核未通过',
//     reason: ['抱歉，您的企业实名认证未通过，请点击查看详情'],
//     btn: '查看详情',
//     url: '/realName',
//     event: eventToRealName
//   }
// }
// // 电子签章
// export const contractState = {
//   '0': {
//     img: icon,
//     text: '您的盖章合同已发送至服务商进行确认签署',
//     reason: ['您的盖章合同已发送至服务商进行确认签署，请耐心等待，双方服务合同均签署成功后即可生成合同'],
//     btn: '返回首页',
//     url: '/interlayer',
//     event: function(_vm, { url }) {
//       _vm.$router.push(url)
//     }
//   },
//   '1': {
//     icon: 'el-icon-success',
//     color: '#41c558',
//     text: '恭喜，签署成功',
//     reason: ['恭喜，服务合同已签署成功'],
//     btns: [
//       {
//         text: '查看合同',
//         url: baseUrl,
//         isOpen: true,
//         class: 'btn-red btn',
//         event: openPage
//       },
//       {
//         text: '去门户首页',
//         class: 'lbtn-red btn',
//         url: '/interlayer',
//         event: function(_vm, { url }) {
//           _vm.$router.push(url)
//         }
//       }
//     ]
//   }
// }
