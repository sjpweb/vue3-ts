/*
 * @Author: sjp
 * @Date: 2021-07-13 15:09:27
 * @LastEditTime: 2021-07-15 16:52:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\store\index.ts
 */
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { RootStateTypes } from './interface'
import user from './modules/user'
import enterUrl from './modules/enterUrl'

export default createStore<RootStateTypes>({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  state:{
    homeFlag: false,
    serviceFlag: false
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    enterUrl
  }
})
export const key : InjectionKey<Store<RootStateTypes>> = Symbol('vue-store')
export function useStore() {
  return baseUseStore(key)
}
