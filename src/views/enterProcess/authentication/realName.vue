<!--
 * @Author: sjp
 * @Date: 2021-07-21 15:57:00
 * @LastEditTime: 2021-07-22 17:17:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\enterProcess\authentication\realName.vue
-->
<!--
 * @Author: sjp
 * @Date: 2021-04-16 10:54:18
 * @LastEditTime: 2021-07-22 09:30:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\enterProcess\index.vue
-->
<template>
  <div class="authenticationBox">
    <div class="hed">
      <CHeader></CHeader>
    </div>
    <iframe class="iframe" :src="realNameUrl" frameborder="0"></iframe>
    <div class="fot">
      <span class="goback" @click="goback">
        <i class="el-icon-arrow-left"></i>
        返回上一页
      </span>
      <CFooter />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import CHeader from "@/layout/header.vue";
import CFooter from "@/layout/footer.vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();
const realNameUrl = computed(() => store.state.enterUrl.realNameUrl);
const rnAuthIsOverdue = computed(
  () => store.state.user.userInfo.rnAuthIsOverdue
);
function goback() {
  rnAuthIsOverdue.value
    ? router.push("/realNameoverdue")
    : router.push("/enterProcess");
}
</script>
<style scoped lang="scss">
.authenticationBox {
  position: relative;
  background: #f6f8fc;
}
.iframe {
  width: 100%;
  height: 100%;
  margin-top: 100px;
  height: calc(100vh - 100px);
  overflow: auto;
}
.hed {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.fot {
  width: 100%;
}
</style>
