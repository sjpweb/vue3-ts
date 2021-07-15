/*
 * @Author: sjp
 * @Date: 2021-07-15 15:46:46
 * @LastEditTime: 2021-07-15 16:41:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\store\modules\enterUrl.ts
 */
import { Module } from 'vuex'
import {EnterUrlStateTypes, RootStateTypes} from '@/store/interface'

const enterUrl: Module<EnterUrlStateTypes,RootStateTypes> = {
  namespaced: true,
  state:{
    realNameUrl: '', // 实名地址
    tempRealNameUrl: '', // 实名临时地址
    openWalletUrl: '', // 开通钱包地址
    tempWalletUrl: '' // 开通钱包临时地址
  },
  mutations:{

  },
  actions:{
    
  }
}

export default enterUrl