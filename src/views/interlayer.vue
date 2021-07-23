<!--
 * @Author: sjp
 * @Date: 2021-07-13 15:09:27
 * @LastEditTime: 2021-07-22 15:52:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\interlayer.vue
-->
<template>
  <div class="home">
    <c-header />
    <div class="box">
      <p>载入中...</p>
    </div>
    <c-footer />
  </div>
</template>

<script lang="ts" setup>
import CHeader from "@/layout/header.vue";
import CFooter from "@/layout/footer.vue";
import { useStore } from "@/store";
const store = useStore();
store.dispatch("user/login");
</script>
<style scoped lang="scss">
.box {
  width: 100%;
  min-height: calc(100vh - 222px);
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
