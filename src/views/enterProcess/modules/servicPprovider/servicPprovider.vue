<!--
 * @Author: sjp
 * @Date: 2021-07-20 09:32:05
 * @LastEditTime: 2021-07-22 18:49:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\enterProcess\modules\servicPprovider\servicPprovider.vue
-->
<template>
  <div>
    <CSteps v-if="isShow" :step="step" :list="stepList"></CSteps>
    <CState
      :top="top"
      v-if="show === 1"
      :presentState="presentState"
      :state="state"
      @artificialCheck="artificialCheck"
    ></CState>
    <ContactsForm v-if="show == 2"></ContactsForm>
    <ServiceAbilityForm v-if="show == 3"></ServiceAbilityForm>
    <Protocol v-if="show == 4"></Protocol>
  </div>
</template>
<script lang="ts" setup>
import { defineEmits, ref } from "vue";
import {
  tacitlyState,
  manpowerState,
  realNameState,
  completeState,
} from "@/config/state";
import CSteps from "@/components/CSteps/index.vue";
import CState from "@/components/CState/index.vue";
import api from "@/api/common";
import { useStore } from "@/store";
import { useRouter, useRoute } from "vue-router";
import jsonp from "@/utils";
const isShow = ref<boolean>(false);
// eslint-disable-next-line
const stepList = ref<StepsItemType[]>([]);
const state = ref<number>(0);
// eslint-disable-next-line
const presentState = ref<StateObjTypes>(tacitlyState);
const step = ref<number>(10);
const show = ref<number>(1);
const top = ref<number>(52);
const store = useStore();
const router = useRouter();
const route = useRoute();
const emit = defineEmits(["setDetection"]);
init();
async function init() {
  const {
    data: {
      entrySteps,
      authenticationStat,
      walletState,
      walletOpenStat,
      entryInfo,
      entryStat,
      stat,
    },
  }: any = await api.getUserState();
  if (entrySteps !== 70) {
    stepList.value = entryInfo.entrySteps;
    isShow.value = true;
    // 步骤条
    step.value = entryInfo.currentStep;
  }

  // 重复入驻代表公司被占用
  if (entryStat === 2) {
    presentState.value = realNameState;
    state.value = 5;
    return;
  }
  // 实名认证
  if (entrySteps === 10) {
    presentState.value = realNameState;
    state.value = authenticationStat;
    show.value = 1;
    realNameUrl();
    return;
  }
  // 开通钱包
  if (entrySteps === 20) {
    presentState.value = walletState;
    state.value = walletOpenStat;
    show.value = 1;
    openWallet();
    return;
  }
  // 填写联系方式
  if (entrySteps === 30) {
    show.value = 2;
    return;
  }
  // 提交服务能力
  if (entrySteps === 40) {
    show.value = 3;
    return;
  }
  // 人工审核
  if (entrySteps === 50) {
    // 使用人工审核状态
    presentState.value = manpowerState;
    // 获取驳回理由
    if (stat === 5) {
      show.value = 1;
      state.value = stat;
      api.getRejectInfo().then((res: any) => {
        const textList = res.data.rejectInfo
          ? res.data.rejectInfo.split("\n")
          : [];
        textList.push("请完善信息后重新提交，否则无法进行新的合作");
        presentState.value[stat].reason = textList;
      });
    }
    if (stat === 2) {
      state.value = 1;
      show.value = 3;
    }
    if (stat === 1 || stat === 0) {
      show.value = 1;
      state.value = stat;
    }
    show.value = 1;
    return;
  }
  // 入驻协议
  if (entrySteps === 60) {
    show.value = 4;
  }
  // 入驻完成
  if (entrySteps === 70) {
    succeedState();
  }
}
// 设置签署成功状态
function succeedState() {
  // 允许点击logo跳转首页
  emit("setDetection");
  isShow.value = false;
  top.value = 90;
  presentState.value = completeState;
  state.value = 0;
  show.value = 1;
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
async function openWallet() {
  if (store.state.enterUrl.tempWalletUrl) {
    const url = store.state.enterUrl.tempWalletUrl;
    store.dispatch("process/setOpenWalletUrl", url);
    if (route.query.s === "3cs") {
      jsonp("https://sso.jd.com/setCookie?t=sso.jdpay.com").then(function() {
        router.push("/openWallet");
      });
    }
  }
}
// 控制当前展示
async function artificialCheck(showValue: number, stateValue: number) {
  // 对应组件
  show.value = showValue;
  // 人工审核状态
  if (stateValue) {
    presentState.value = manpowerState;
    state.value = stateValue;
  }
  // 更新步骤条
  const {
    data: { entrySteps, entryInfo },
  }: any = await api.getUserState();
  if (entrySteps !== 70) {
    stepList.value = entryInfo.entrySteps;
    isShow.value = true;
    // 步骤条
    step.value = entryInfo.currentStep;
  }
}
</script>
<style scoped lang="scss">
.box {
  min-height: calc(100vh - 100px);
}
</style>
