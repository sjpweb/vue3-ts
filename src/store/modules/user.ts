/*
 * @Author: sjp
 * @Date: 2021-07-15 15:46:46
 * @LastEditTime: 2021-07-15 16:44:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\store\modules\user.ts
 */
import { Module } from 'vuex'
import {UserInfoStateTypes, RootStateTypes} from '@/store/interface'
import router from '@/router'
import api from '@/api/common'
import url from '@/config'

const user: Module<UserInfoStateTypes,RootStateTypes> = {
  namespaced: true,
  state:{
    companyName: '',
    jdPin: '',
    userType: ''
  },
  mutations:{
    GET_USER_INFO(state, user) {
      state = user
    },
  },
  actions:{
    async getUserInfo({ commit }) {
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
      code === 3002 && router.replace('/forbidden')
      // 用户未登录
      code === 4001 && router.replace('/login')
      // 用户入驻未开始
      code === 4002 && router.replace('/register')
      // 用户入驻未完成
      code === 4003 && router.replace('/enterProcess')
      // 用户实名认证过期
      code === 4004 && router.replace('/realNameoverdue')
      // 入驻成功
      code === 1000 && router.replace('/home')
    },
  }
}

export default user