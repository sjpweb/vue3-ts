<!--
 * @Author: sjp
 * @Date: 2021-08-04 17:22:20
 * @LastEditTime: 2021-08-06 16:52:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\portal\serviceMarket\protocol.vue
-->
<template>
  <div>
    <div class="box">
      <CProtocol
        :height="680"
        v-if="show == 0"
        :list="list"
        :disabled="disabled"
        @seal="seal"
      />
      <CState
        v-if="show == 1"
        :top="90"
        :presentState="contractState"
        :state="0"
      ></CState>
    </div>
    <CFooter></CFooter>
  </div>
</template>
<script lang="ts" setup>
import CProtocol from "@/components/CProtocol/index.vue";
import CState from "@/components/CState/index.vue";
import CFooter from "@/layout/footer.vue";
import api from "@/api/ispSign";
import apis from "@/api/common";
import { contractState } from "@/config/state";
import { ElLoading } from "element-plus";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/store";
const route = useRoute();
const router = useRouter();
const store = useStore();
const userType = route.query.userType as number | null;
const userCode = route.query.userCode as number | null;
const contractId = route.query.contractId;
const list = ref<string[]>([]);
const show = ref<number>(0);
const disabled = ref<boolean>(true);
onMounted(() => {
  getUserInfo();
  const obj = {
    userCode,
    userType,
    contractId,
  };
  api
    .viewContractPdf(obj)
    .then((res: any) => {
      list.value = res.data.pdfImage;
      disabled.value = false;
    })
    .catch(() => {
      disabled.value = false;
    });
});
function getUserInfo() {
  apis.getUserInfo().then((res: any) => {
    store.dispatch("user/setUserInfo", res.data);
  });
}
function seal() {
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.2)",
  });
  const obj = {
    userCode,
    contractId,
  };
  if (userCode == 1) {
    api
      .buyerEleSign(obj)
      .then(() => {
        loading.close();
        router.push({
          path: "/succeed",
          query: {
            userType,
          },
        });
      })
      .catch(() => {
        loading.close();
      });
    return;
  }
  if (userType == 2) {
    api
      .providerEleSign(obj)
      .then(() => {
        loading.close();
        router.push({
          path: "/succeed",
          query: {
            userType,
          },
        });
      })
      .catch(() => {
        loading.close();
      });
  }
}
</script>
<style scoped lang="scss">
.box {
  height: 900px;
  background-color: #fff;
}
</style>
