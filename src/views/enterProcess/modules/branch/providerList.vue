<!--
 * @Author: sjp
 * @Date: 2021-04-20 10:41:25
 * @LastEditTime: 2021-07-22 17:10:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\enterProcess\modules\branch\providerList.vue
-->
<template>
  <div class="providerList">
    <p class="tit">请选择确认签署协议的服务商</p>
    <div class="box">
      <el-radio-group v-model="radio">
        <el-radio
          v-for="item in list"
          :key="item.userCode"
          :label="item.userCode"
        >
          <span>{{ item.companyName }}</span>
          <span class="timer">{{ parseTime(item.createTime) }}</span>
        </el-radio>
      </el-radio-group>
    </div>
    <el-checkbox v-model="checked">我已阅读并同意</el-checkbox
    ><span class="protocol" @click="dialogVisible = true"
      >《网点入驻协议》</span
    >
    <div class="btns">
      <button type="button" class="btn-red btn" @click="sign">签署协议</button>
    </div>
    <el-dialog
      class="providerProtocol"
      title="网点入驻协议"
      v-model="dialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
      width="900px"
    >
      <CAgreement></CAgreement>
      <template #footer>
        <span class="dialog-footer">
          <button
            type="button"
            class="btn-red notarize"
            @click="dialogVisible = false"
          >
            确认
          </button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import api from "@/api/common";
import { parseTime } from "@/utils";
import { ref } from "vue";
import CAgreement from "./agreement.vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
interface ServiceProviderItem {
  userCode: number;
  createTime: number;
  companyName: string;
}
const router = useRouter();
const list = ref<ServiceProviderItem[]>([]);
const radio = ref<null>(null);
const dialogVisible = ref<boolean>(false);
const checked = ref<boolean>(false);
api.getProviderList().then((res: any) => {
  list.value = res.data.serviceProviderList;
});
function sign() {
  if (checked.value) {
    ElMessage({
      center: true,
      duration: 2000,
      message: "请选择阅读并勾选同意协议！",
    });
    return;
  }
  if (radio.value) {
    ElMessage({
      center: true,
      duration: 2000,
      message: "请选择确认签署协议的服务商！",
    });
    return;
  }
  api.isCheckProvices({ serviceProviderUserCode: radio.value }).then(() => {
    router.push("/branchSucceed");
  });
}
</script>
<style scoped lang="scss">
.providerList {
  padding: 40px 160px 46px;
  .tit {
    font-size: 18px;
    font-weight: 600;
  }
}
.providerProtocol {
  /deep/ .el-dialog__header {
    height: 32px;
    background-color: #f2f2f2;
    padding: 0 24px;
  }
  /deep/ .el-dialog__title {
    font-size: 12px;
    line-height: 32px;
  }
}
.box {
  margin: 24px 0;
  max-height: 358px;
  min-width: 1200px;
  overflow-y: auto;
  /deep/ .el-radio-group {
    display: block;
  }
  /deep/ .el-radio {
    display: block;
    padding: 30px 0px;
    background: #f8f8f8;
    margin-bottom: 6px;
    margin-right: 0px;
  }
  /deep/ .el-radio__input {
    margin: 0 30px;
  }
  /deep/ .el-radio__label {
    padding: 0;
  }
  /deep/ .is-checked > .el-radio__inner {
    background-color: #fff !important;
    border-color: #e1251b !important;
    box-shadow: none;
  }
  /deep/ .is-checked > .el-radio__inner::after {
    width: 8px;
    height: 8px;
    background-color: #e1251b !important;
  }
  .timer {
    float: right;
    margin-right: 40px;
  }
}
.box::-webkit-scrollbar {
  width: 8px;
}
.box::-webkit-scrollbar-track {
  background-color: #f2f2f2;
}
.box::-webkit-scrollbar-thumb {
  background-color: #999999;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
.box::-moz-scrollbar {
  width: 8px;
}
.box::-moz-scrollbar-track {
  background-color: #f2f2f2;
}
.box::-moz-scrollbar-thumb {
  background-color: #999999;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
.protocol {
  cursor: pointer;
  color: #1c77d2;
}
.btns {
  text-align: center;
}
.btn {
  margin-top: 12px;
  width: 142px;
  height: 46px;
}
.notarize {
  width: 144px;
  height: 46px;
}

/deep/ .el-dialog__footer {
  text-align: center;
}
</style>
