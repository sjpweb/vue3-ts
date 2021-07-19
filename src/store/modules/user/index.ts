/*
 * @Author: sjp
 * @Date: 2021-07-15 19:00:27
 * @LastEditTime: 2021-07-16 09:40:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\store\modules\user\index.ts
 */
/*
 * @Author: sjp
 * @Date: 2021-07-15 15:46:46
 * @LastEditTime: 2021-07-15 18:58:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\store\modules\user.ts
 */
import { Module } from 'vuex'
import router from '@/router'
import api from '@/api/common'
import url from '@/config'
import {RootStateTypes, UserInfoStateTypes} from '@/store/interface'

const user: Module<UserInfoStateTypes,RootStateTypes> = {
  namespaced: true,
  state:{
    userInfo:{
      companyName: '',
      jdPin: '',
      userType: 0,
      popFlag: 0
    },
    homeFlag: false,
    serviceFlag: false
  },
  mutations:{
    GET_USER_INFO(state, {companyName,jdPin ,userType,popFlag}) {
      state.userInfo = {
        companyName,
        jdPin,
        userType,
        popFlag
      }
    },
  },
  actions:{
    async login({commit}) {
      const { code, data }:any = await api.getUserInfo()
      data && commit('GET_USER_INFO', data)
      // 网点入驻成功登录跳转后台
      if (data && data.userType === 3 && code === 1000) {
        const { baseUrl } = url
        window.location.href = baseUrl
        return
      }
      // 已入驻的用户 实名过期
      if (data.rnAuthIsOverdue) {
        router.replace('/realNameoverdue')
        return
      }
      // 账号禁用
      // code === 3002 && router.replace('/forbidden')
      // // 用户未登录
      // code === 4001 && router.replace('/login')
      // // 用户入驻未开始
      // code === 4002 && router.replace('/register')
      // // 用户入驻未完成
      // code === 4003 && router.replace('/enterProcess')
      // // 用户实名认证过期
      // code === 4004 && router.replace('/realNameoverdue')
      // // 入驻成功
      // code === 1000 && router.replace('/home')
    },
    logOut({commit}){
      router.replace('/login')
      commit('GET_USER_INFO', {})
    }
  }
}

export default user