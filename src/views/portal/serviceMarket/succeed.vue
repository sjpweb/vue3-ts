<!--
 * @Author: sjp
 * @Date: 2021-08-04 17:22:20
 * @LastEditTime: 2021-08-06 16:57:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\portal\serviceMarket\succeed.vue
-->
<template>
  <div>
    <div class="box">
      <CState :top="90" :presentState="contractState" :state="state"></CState>
    </div>
    <CFooter></CFooter>
  </div>
</template>
<script lang="ts" setup>
import CState from "@/components/CState/index.vue";
import CFooter from "@/layout/footer.vue";
import { contractState } from "@/config/state";
import { useRoute } from "vue-router";
import { ref } from "vue";
const state = ref<number>(0);
const route = useRoute();
const userType = route.query.userType as string | null;
const popFlag = route.query.popFlag as string | null;
if (popFlag == "1") state.value = 0;
if (popFlag == "2" || userType == "2") state.value = 1;
</script>
<style scoped lang="scss">
.box {
  height: 900px;
  background-color: #fff;
}
</style>
