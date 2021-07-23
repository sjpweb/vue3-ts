/*
 * @Author: sjp
 * @Date: 2021-07-13 15:09:27
 * @LastEditTime: 2021-07-21 15:07:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\store\index.ts
 */
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { RootStateTypes } from './interface'
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
export const key : InjectionKey<Store<RootStateTypes>> = Symbol()
export function useStore<T = RootStateTypes>() {
  return baseUseStore<T>(key)
}
