<!--
 * @Author: sjp
 * @Date: 2021-07-20 09:32:05
 * @LastEditTime: 2021-07-22 18:50:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\enterProcess\modules\factory\factory.vue
-->
<template>
  <div>
    <CSteps v-if="isShow" :step="step" :list="stepList"></CSteps>
    <CState
      :top="52"
      v-if="show == 1"
      :presentState="presentState"
      :state="state"
      @artificialCheck="artificialCheck"
    ></CState>
    <ContactsForm v-if="show == 2"></ContactsForm>
    <ProviderList v-if="show === 3"></ProviderList>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import {
  tacitlyState,
  realNameState,
  branchRealNameState,
  factoryManpowerState,
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
const store = useStore();
const router = useRouter();
const route = useRoute();
init();
async function init() {
  const {
    data: { entrySteps, authenticationStat, entryInfo, entryStat, stat },
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
    presentState.value = branchRealNameState;
    state.value = authenticationStat;
    realNameUrl();
    return;
  }
  // 填写联系方式
  if (entrySteps === 30) {
    show.value = 2;
    return;
  }
  // 人工审核
  if (entrySteps === 50) {
    presentState.value = factoryManpowerState;

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
    } else if (stat === 2) {
      // 审核成功 通过请求getUserState接口，后台根据stat=2和entrySteps=50的值自动改变entrySteps的值位70
      init();
    } else if (stat === 1 || stat === 0) {
      // 审核中
      show.value = 1;
      state.value = stat;
    }
    return;
  }
  // 网点入驻完成
  if (entrySteps === 70) {
    router.push("/factorySucceed");
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
// 控制当前展示
function artificialCheck() {
  init();
}
</script>
<style scoped lang="scss">
.box {
  min-height: calc(100vh - 100px);
}
</style>
