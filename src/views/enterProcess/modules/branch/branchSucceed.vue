<!--
 * @Author: sjp
 * @Date: 2021-04-16 10:54:18
 * @LastEditTime: 2021-07-22 16:12:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\enterProcess\modules\branch\branchSucceed.vue
-->
<template>
  <div class="bgFFF">
    <CHeader :detection="true" text="欢迎入驻"></CHeader>
    <div class="box">
      <CState :top="90" :presentState="branchState" :state="2"></CState>
    </div>
    <CFooter></CFooter>
  </div>
</template>
<script lang="ts" setup>
import CFooter from "@/layout/footer.vue";
import CHeader from "@/layout/header.vue";
import CState from "@/components/CState/index.vue";
import { branchState } from "@/config/state";
</script>
<style scoped lang="scss">
.box {
  min-height: calc(100vh - 220px);
}
</style>
