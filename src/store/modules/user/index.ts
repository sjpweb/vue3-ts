/*
 * @Author: sjp
 * @Date: 2021-07-15 19:00:27
 * @LastEditTime: 2021-07-22 10:55:21
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

// 后台地址
const { baseUrl } = url
const user: Module<UserInfoStateTypes,RootStateTypes> = {
  namespaced: true,
  state:{
    userInfo:{
      companyName: '',
      jdPin: '',
      userType: 0,
      popFlag: 0,
      odoUrl: '',
      rnAuthIsOverdue: false
    },
    homeFlag: false,
    serviceFlag: false
  },
  mutations:{
    GET_USER_INFO(state, val) {
      state.userInfo = val
    },
  },
  actions:{
    async login({ commit, dispatch }) {
      const { code, data }: any = await api.getUserInfo()
      data && commit('GET_USER_INFO', data)
      // entryStat 0入驻未开始 1入驻成功 2重复入驻
      switch (data.entryStat) {
        case 1:
          if (data.userType === 3) {
            // 网点入驻成功登录跳转后台
            window.location.href = baseUrl
            return
          } else if (data.userType === 5) {
            // 拆解厂入驻成功登录跳转后台
            window.location.href = data.odoUrl
            return
          } else {
            router.replace('/home')
          }
          break
        case 2:
          // 重复入驻代表公司被占用
          router.replace('/enterProcess')
          break
        default:
          break
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
    },
    logOut({commit}){
      router.replace('/login')
      commit('GET_USER_INFO', {})
    }
  }
}

export default user