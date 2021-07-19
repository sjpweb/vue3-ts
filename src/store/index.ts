/*
 * @Author: sjp
 * @Date: 2021-07-13 15:09:27
 * @LastEditTime: 2021-07-16 09:39:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\store\index.ts
 */
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { RootStateTypes, AllStateTypes } from './interface'
import user from './modules/user/index'
import enterUrl from './modules/enterUrl/index'

export default createStore<RootStateTypes>({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  modules: {
    user,
    enterUrl
  }
})
export const key : InjectionKey<Store<RootStateTypes>> = Symbol('vue-store')
export function useStore<T = AllStateTypes>() {
  return baseUseStore<T>(key)
}
