/*
 * @Author: sjp
 * @Date: 2021-07-13 15:09:27
 * @LastEditTime: 2021-07-15 16:24:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\main.ts
 */
import { createApp } from 'vue'
import ElementPlus  from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store, { key } from './store'

createApp(App).use(store, key).use(router).use(ElementPlus).mount('#app')
