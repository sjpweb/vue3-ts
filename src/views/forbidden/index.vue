<!--
 * @Author: sjp
 * @Date: 2021-04-16 10:54:18
 * @LastEditTime: 2021-07-28 13:59:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\forbidden\index.vue
-->
<template>
  <div class="bgFFF">
    <CHeader text=""></CHeader>
    <div class="box">
      <CState :presentState="forbiddenState" :state="0"></CState>
    </div>
    <CFooter></CFooter>
  </div>
</template>
<script lang="ts" setup>
import CFooter from "@/layout/footer.vue";
import CHeader from "@/layout/header.vue";
import CState from "@/components/CState/index.vue";
import { forbiddenState } from "@/config/state";
import { useStore } from "@/store";
import { computed } from "vue";
const store = useStore();
const userType = computed(() => store.state.user.userInfo.userType);
forbiddenState[0].text = "抱歉，您的账号被禁用，无法在京致·云服签约新订单";
// 网点
if (userType.value === 3) {
  forbiddenState[0].text = "抱歉，您的账号被禁用，无法在京致·云服接单";
}
</script>
<style scoped lang="scss">
.box {
  min-height: calc(100vh - 220px);
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
