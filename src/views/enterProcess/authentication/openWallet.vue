<!--
 * @Author: sjp
 * @Date: 2021-07-21 15:57:00
 * @LastEditTime: 2021-07-22 10:51:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\enterProcess\authentication\openWallet.vue
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
    <iframe class="iframe" :src="openWalletUrl" frameborder="0"></iframe>
    <div class="fot">
      <CFooter></CFooter>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import CHeader from "@/layout/header.vue";
import CFooter from "@/layout/footer.vue";
import { useStore } from "@/store";
export default defineComponent({
  setup() {
    const store = useStore();
    const openWalletUrl = computed(() => store.state.enterUrl.openWalletUrl);
    return {
      openWalletUrl,
    };
  },
  components: {
    CFooter,
    CHeader,
  },
});
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
