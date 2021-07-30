/*
 * @Author: sjp
 * @Date: 2021-07-13 15:09:27
 * @LastEditTime: 2021-07-30 13:46:57
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
    path: '/index',
    name: 'index',
    component: () => import('@/views/portal/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/portal/home/home.vue')
      },
      {
        path: '/ispList',
        name: 'ispList',
        component: () => import('@/views/portal/serviceMarket/ispList.vue')
      },
      // {
      //   path: '/ispSign',
      //   name: 'ispSign',
      //   component: () => import('@/views/ispSign/ispSign')
      // },
      // {
      //   path: '/protocol',
      //   name: 'protocol',
      //   component: () => import('@/views/ispSign/protocol')
      // },
      // {
      //   path: '/succeed',
      //   name: 'succeed',
      //   component: () => import('@/views/ispSign/succeed')
      // },
      // {
      //   path: '/ispIndex',
      //   name: 'ispIndex',
      //   component: () => import('@/views/ispIndex/ispIndex')
      // }
    ]
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
  },
  // 入驻流程
  {
    path: '/enterProcess',
    name: 'enterProcess',
    component: () => import('@/views/enterProcess/index.vue')
  },
  // 实名认证
  {
    path: '/realName',
    name: 'realName',
    component: () => import('@/views/enterProcess/authentication/realName.vue')
  },
  // 实名过期
  {
    path: '/realNameoverdue',
    name: 'realNameoverdue',
    component: () => import('@/views/enterProcess/modules/realNameoverdue.vue')
  },
  // 开通钱包
  {
    path: '/openWallet',
    name: 'openWallet',
    component: () => import('@/views/enterProcess/authentication/openWallet.vue')
  },
  // 网点入驻成功页面
  {
    path: '/branchSucceed',
    name: 'branchSucceed',
    component: () => import('@/views/enterProcess/modules/branch/branchSucceed.vue')
  },
  // 拆解厂入驻成功
  {
    path: '/factorySucceed',
    name: 'factorySucceed',
    component: () => import('@/views/enterProcess/modules/factory/factorySucceed.vue')
  },
  // 禁用页面
  {
    path: '/forbidden',
    name: 'forbidden',
    component: () => import('@/views/forbidden/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'error',
    component: () => import('@/views/error.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
