/*
 * @Author: sjp
 * @Date: 2021-07-15 15:46:46
 * @LastEditTime: 2021-07-16 09:04:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\store\modules\enterUrl\index.ts
 */
import { Module } from 'vuex'
import {RootStateTypes, EnterUrlStateTypes} from '@/store/interface'

const enterUrl: Module<EnterUrlStateTypes,RootStateTypes> = {
  namespaced: true,
  state:{
    realNameUrl: '', // 实名地址
    tempRealNameUrl: '', // 实名临时地址
    openWalletUrl: '', // 开通钱包地址
    tempWalletUrl: '' // 开通钱包临时地址
  },
  mutations:{
    SET_REAL_NAME_URL(state, val){
      state.realNameUrl = val
    }
  },
  actions:{
    setRealNameUrl({commit}){
      commit('SET_REAL_NAME_URL', '哈哈哈哈')
    }
  }
}

export default enterUrl