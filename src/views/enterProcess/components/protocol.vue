<!--
 * @Author: sjp
 * @Date: 2021-04-16 10:54:18
 * @LastEditTime: 2021-07-23 16:12:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\enterProcess\components\protocol.vue
-->
<template>
  <div class="protocol">
    <div class="box">
      <iframe class="iframe" :src="pdfUrl" frameborder="0"></iframe>
      <div>
        <el-checkbox v-model="checked">我已阅读并同意</el-checkbox>
        <div class="btns">
          <button
            type="button"
            :disabled="disableds"
            class="btn-red btn"
            @click="seal"
          >
            签署协议
          </button>
        </div>
      </div>
    </div>
    <el-dialog
      title="请完善信息"
      v-model="dialogVisible"
      :show-close="true"
      :close-on-click-modal="false"
      width="672px"
      class="stampInfo"
    >
      <ContractForm ref="formDome" v-show="show"></ContractForm>
      <VerifyForm
        :mobile="mobile"
        ref="verifyFormDome"
        v-if="!show"
        @updateSend="updateSend"
      ></VerifyForm>
      <template #footer>
        <span class="dialog-footer">
          <button
            type="button"
            :class="show ? 'btn-red notarize' : 'btn-red mill'"
            @click="onSubmit"
          >
            {{ btnText }}
          </button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import ContractForm from "./contractForm.vue";
import VerifyForm from "./verifyForm.vue";
import api from "@/api/common";
import { ref, reactive, defineEmits } from "vue";
import { ElMessage } from "element-plus";
const emit = defineEmits(["succeedState"]);
let userInfo = reactive({});
const checked = ref<boolean>(false);
const show = ref<boolean>(true);
const dialogVisible = ref<boolean>(false);
const disableds = ref<boolean>(true);
const btnText = ref<string>("下一步，二次验证");
const mobile = ref<string>("");
const pdfUrl = ref<string>("");
const isSendPhone = ref<boolean>(false);
const formDome = ref(null as HTMLFormElement | null);
const verifyFormDome = ref(null as HTMLFormElement | null);
api.getContract().then((res: any) => {
  pdfUrl.value = res.data.agreementUrl;
  disableds.value = false;
});
function updateSend(data: boolean) {
  isSendPhone.value = data;
}
function seal() {
  if (!checked.value) {
    ElMessage({
      center: true,
      duration: 2000,
      message: "请选择阅读并勾选同意协议！",
    });
    return;
  }
  dialogVisible.value = true;
}
async function onSubmit() {
  if (btnText.value === "下一步，二次验证" && formDome.value) {
    formDome.value.validate().then((obj) => {
      userInfo = obj;
      api.upUser(obj).then((res: any) => {
        if (res.code === 1000) {
          mobile.value = obj.mobile;
          show.value = false;
          btnText.value = "确认签署";
        }
      });
    });
  }
  if (btnText.value === "确认签署") {
    if (isSendPhone.value && verifyFormDome.value) {
      verifyFormDome.value.validate().then((obj) => {
        const upObj = {
          idCardNum: userInfo.idCardNum,
          mobile: obj.mobile,
          transactorName: userInfo.transactorName,
          authCode: obj.authCode,
        };
        api.signContract(upObj).then(() => {
          dialogVisible.value = false;
          emit("succeedState");
        });
      });
    } else {
      ElMessage({
        center: true,
        duration: 2000,
        message: "请发送签署协议短信验证码！",
      });
    }
  }
}
</script>
<style scoped lang="scss">
.protocol {
  padding: 46px 0;
  .box {
    width: 980px;
    margin: auto;
  }
  .iframe {
    width: 100%;
    height: 500px;
  }
  .dialog-footer {
    .notarize {
      width: 144px;
      height: 32px;
    }
    .mill {
      width: 90px;
      height: 32px;
    }
    .cancel {
      border: 1px solid #e0e0e0;
      margin-right: 16px;
      background: #fff;
      cursor: pointer;
      &:hover {
        border-color: #e75048;
        color: #e75048;
      }
      &:active {
        border-color: #ca2118;
        color: #ca2118;
      }
    }
  }
  /deep/ .el-dialog {
    height: 480px;
  }
  /deep/ .el-dialog__body {
    padding-top: 28px;
  }
  /deep/ .el-dialog__footer {
    padding-bottom: 40px;
    text-align: center;
    .lbtn-gray {
      margin-right: 10px;
    }
  }
}
.stampInfo {
  /deep/ .el-dialog__header {
    height: 44px;
    background-color: #f2f2f2;
    padding: 0 24px;
  }
  /deep/ .el-dialog__title {
    font-size: 12px;
    line-height: 44px;
  }
  /deep/ .el-dialog__headerbtn {
    top: 14px;
  }
}
.btns {
  text-align: center;
}
.btn {
  margin-top: 12px;
  width: 128px;
  height: 44px;
}
</style>
