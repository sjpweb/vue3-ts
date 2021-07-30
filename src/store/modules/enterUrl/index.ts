/*
 * @Author: sjp
 * @Date: 2021-07-15 15:46:46
 * @LastEditTime: 2021-07-27 14:26:52
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
    SET_REAL_NAME_URL(state, url) {
      state.realNameUrl = url
    },
    SET_OPEN_WALLET_URL(state, url) {
      state.openWalletUrl = url
    },
    SET_TEMP_REAL_NAME_URL(state, url) {
      state.tempRealNameUrl = url
    },
    SET_TEMP_WALLET_URL(state, url) {
      state.tempWalletUrl = url
    }
  },
  actions:{
    setRealNameUrl({ commit }, url) {
      commit('SET_REAL_NAME_URL', url)
    },
    setOpenWalletUrl({ commit }, url) {
      commit('SET_OPEN_WALLET_URL', url)
    },
    setTempRealNameUrl({ commit }, url) {
      commit('SET_TEMP_REAL_NAME_URL', url)
    },
    setTempWalletUrl({ commit }, url) {
      commit('SET_TEMP_WALLET_URL', url)
    }
  }
}

export default enterUrl