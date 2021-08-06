<!--
 * @Author: sjp
 * @Date: 2021-08-04 17:22:20
 * @LastEditTime: 2021-08-04 17:26:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\portal\serviceMarket\components\listLoading.vue
-->
<template>
  <div class="loading-box">
    <div>
      <img :src="logingImg" alt="" />
      <p>努力加载中...</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import logingImg from "@/assets/images/loading.gif";
</script>
<style scoped lang="scss">
.loading-box {
  background: #fff;
  height: 540px;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    img {
      width: 100px;
      height: 100px;
    }
    p {
      text-align: center;
    }
  }
}
</style>
