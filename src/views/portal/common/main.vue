<!--
 * @Author: sjp
 * @Date: 2021-07-26 09:16:50
 * @LastEditTime: 2021-07-28 13:39:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\portal\common\main.vue
-->
<template>
  <section class="main">
    <div class="main-wrapper">
      <div class="main-content">
        <router-view :key="$route.fullPath" />
      </div>
    </div>
  </section>
</template>
