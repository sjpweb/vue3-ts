/*
 * @Author: sjp
 * @Date: 2021-07-13 15:09:27
 * @LastEditTime: 2021-07-15 11:49:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\router\index.ts
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/interlayer'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
   // 中间页
   {
    path: '/interlayer',
    name: 'interlayer',
    component: () => import('@/views/interlayer.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
