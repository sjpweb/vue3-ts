<!--
 * @Author: sjp
 * @Date: 2021-04-13 17:52:17
 * @LastEditTime: 2021-07-30 10:15:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\portal\index.vue
-->
<template>
  <div class="indexBox">
    <CHeader text="" :height="64" :backstage="true">
      <template #nav>
        <div class="nav">
          <div :class="{ on: $route.path == '/home' }" :key="1">
            <router-link class="item" to="/home">首页</router-link>
          </div>
          <div :class="{ on: $route.path != '/home' }" :key="2">
            <router-link class="item" to="/ispList">服务市场</router-link>
          </div>
        </div>
      </template>
    </CHeader>
    <o-main ref="mainRef"></o-main>
    <OFooter></OFooter>
  </div>
</template>

<script lang="ts" setup>
import OMain from "./common/main.vue";
import OFooter from "./common/footer.vue";
import CHeader from "@/layout/header.vue";
</script>
<style lang="scss" scoped>
.indexBox {
  background-color: #f4f5f8;
}
.nav {
  margin-left: 80px;
  display: inline-block;
  div {
    display: inline-block;
    margin-right: 74px;
    font-size: 16px;

    .item {
      position: relative;
    }

    &.on {
      .item {
        &:before {
          content: "";
          height: 4px;
          background: $red-color;
          position: absolute;
          bottom: -10px;
          left: 0;
          right: 0;
          border-radius: 12px;
        }
      }
    }
  }
}
</style>
