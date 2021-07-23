<!--
 * @Author: sjp
 * @Date: 2021-04-16 10:54:18
 * @LastEditTime: 2021-07-22 17:09:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\enterProcess\index.vue
-->
<template>
  <div class="bgFFF">
    <CHeader v-show="flag" :detection="detection" text="欢迎入驻"></CHeader>
    <div class="box">
      <!-- 采购商 -->
      <CPurchasing @setDetection="setDetection" v-if="userType === 1" />
      <!-- 服务商 -->
      <CServicPprovider @setDetection="setDetection" v-if="userType === 2" />
      <!-- 网点 -->
      <CBranch v-if="userType === 3" />
      <!-- 拆解厂 -->
      <CFactory v-if="userType === 5" />
    </div>
    <CFooter v-show="flag"></CFooter>
  </div>
</template>
<script setup lang="ts">
import CBranch from "./modules/branch/branch.vue";
import CPurchasing from "./modules/purchasing/purchasing.vue";
import CServicPprovider from "./modules/servicPprovider/servicPprovider.vue";
import CFactory from "./modules/factory/factory.vue";
import { ref, computed } from "vue";
import CHeader from "@/layout/header.vue";
import CFooter from "@/layout/footer.vue";
import { useStore } from "@/store";
const flag = ref<boolean>(true);
const detection = ref<boolean>(false);
const store = useStore();
const userType = computed(() => store.state.user.userInfo.userType);
flag.value = window.self === window.top;
function setDetection() {
  detection.value = true;
}
</script>
<style scoped lang="scss">
.box {
  min-height: calc(100vh - 100px);
}
</style>
