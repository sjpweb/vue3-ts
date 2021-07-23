<!--
 * @Author: sjp
 * @Date: 2021-04-16 10:54:18
 * @LastEditTime: 2021-07-22 15:55:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\enterProcess\modules\realNameoverdue.vue
-->
<template>
  <div class="bgFFF">
    <CHeader text="欢迎入驻" v-show="flag"></CHeader>
    <div class="box">
      <CState :top="90" :presentState="realNameState" :state="state"></CState>
    </div>
    <CFooter v-show="flag"></CFooter>
  </div>
</template>
<script lang="ts" setup>
import CFooter from "@/layout/footer.vue";
import CHeader from "@/layout/header.vue";
import CState from "@/components/CState/index.vue";
import { realNameState } from "@/config/state";
import { ref, onMounted } from "vue";
import url from "@/config";
import { useStore } from "@/store";
import { useRouter, useRoute } from "vue-router";
import jsonp from "@/utils";
const state = ref<number>(2);
const flag = ref<boolean>(true);
const store = useStore();
const router = useRouter();
const route = useRoute();
// eslint-disable-next-line
function openPage({ isOpen, url }: BtnStateTypes) {
  if (isOpen) {
    window.open(url);
    return;
  }
  router.push(url);
}
setState();
realNameUrl();
function setState() {
  const { userType, odoUrl } = store.state.user.userInfo;
  realNameState[1] = {
    icon: "el-icon-success",
    color: "#41c558",
    text: "恭喜，认证成功",
    reason: ["恭喜，您的实名认证已通过"],
    btns: [
      {
        text: "去门户首页",
        url: "/home",
        type: "primary",
        event: openPage,
      },
      {
        text: "返回商家后台",
        type: "default",
        isOpen: true,
        url: url.baseUrl,
        event: openPage,
      },
    ],
  };
  // 网点不允许去首页
  if (userType === 3) {
    realNameState[1] = {
      icon: "el-icon-success",
      color: "#41c558",
      text: "恭喜，认证成功",
      reason: ["恭喜，您的实名认证已通过"],
      btn: "返回商家后台",
      isOpen: true,
      url: url.baseUrl,
      event: openPage,
    };
    return;
  }
  // 拆解厂打开接口返回的地址
  if (userType === 5) {
    realNameState[1] = {
      icon: "el-icon-success",
      color: "#41c558",
      text: "恭喜，认证成功",
      reason: ["恭喜，您的实名认证已通过"],
      btn: "返回后台",
      isOpen: true,
      url: odoUrl,
      event: openPage,
    };
  }
}
async function realNameUrl() {
  if (store.state.enterUrl.tempRealNameUrl) {
    const url = store.state.enterUrl.tempRealNameUrl;
    await store.dispatch("process/setRealNameUrl", url);
    if (route.query.s === "3cs") {
      jsonp("https://sso.jd.com/setCookie?t=sso.jdpay.com").then(() => {
        router.push("/realName");
      });
    }
  }
}
onMounted(() => {
  // 判断是否被嵌入iframe
  flag.value = window.self === window.top;
});
</script>
<style scoped lang="scss">
.box {
  min-height: calc(100vh - 220px);
}
</style>
