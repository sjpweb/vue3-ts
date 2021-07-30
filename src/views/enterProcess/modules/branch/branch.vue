<!--
 * @Author: sjp
 * @Date: 2021-07-20 09:32:05
 * @LastEditTime: 2021-07-27 14:15:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\enterProcess\modules\branch\branch.vue
-->
<template>
  <div>
    <CSteps v-if="isShow" :step="step" :list="stepList"></CSteps>
    <CState
      :top="top"
      v-if="show == 1"
      :presentState="presentState"
      :state="state"
      @artificialCheck="artificialCheck"
    ></CState>
    <ContactsForm v-if="show == 2"></ContactsForm>
    <CProviderList v-if="show === 3"></CProviderList>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import {
  tacitlyState,
  manpowerState,
  realNameState,
  branchRealNameState,
  branchState,
} from "@/config/state";
import CSteps from "@/components/CSteps/index.vue";
import CState from "@/components/CState/index.vue";
import ContactsForm from "../../components/contactsForm.vue";
import CProviderList from "./providerList.vue";
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
// 获取网点状态
presentState.value = branchState;
api.isMatchingService().then(({ data }: any) => {
  if (data.matchingResult) {
    state.value = 0;
    isShow.value = false;
    top.value = 90;
    init();
    getProviderList();
    return;
  }
  state.value = 1;
  isShow.value = false;
  top.value = 90;
});
async function init() {
  const {
    data: { entrySteps, authenticationStat, entryInfo, entryStat },
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
    getProviderList();
    if (authenticationStat !== 0) {
      presentState.value = branchRealNameState;
      isShow.value = true;
      top.value = 52;
      state.value = authenticationStat;
      realNameUrl();
    }
    return;
  }
  // 填写联系方式
  if (entrySteps === 30) {
    isShow.value = true;
    top.value = 52;
    show.value = 2;
    return;
  }
  // 入驻协议
  if (entrySteps === 60) {
    isShow.value = true;
    top.value = 52;
    show.value = 3;
  }
  // 网点入驻完成
  if (entrySteps === 70) {
    router.push("/branchSucceed");
  }
}
function getProviderList() {
  // 获取服务商列表 并拼接
  api.getProviderList().then((res: any) => {
    const arr = res.data.serviceProviderList.map(
      (item: { companyName: string }) => item.companyName
    );
    let text = "";
    // 服务商超过3个时后面省略号
    if (arr.length > 3) {
      const list = arr.slice(0, 3);
      const name = list.join(" | ");
      text = name + "...";
    } else {
      text = arr.join(" | ");
    }
    presentState.value[0].reason = [
      "您好，已有服务商邀请您加入平台，完成入驻即可开始接单啦~",
      text,
    ];
  });
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
// 控制当前展示
async function artificialCheck(showValue: number, stateValue: number) {
  // 对应组件
  show.value = showValue;
  // 人工审核状态
  if (stateValue) {
    presentState.value = manpowerState;
    state.value = stateValue;
  }
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
