<!--
 * @Author: sjp
 * @Date: 2021-04-16 19:59:22
 * @LastEditTime: 2021-07-27 15:40:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\enterProcess\components\verifyForm.vue
-->
<template>
  <div>
    <el-form
      ref="formDome"
      class="contractForm"
      :rules="rules"
      label-width="136px"
      style="width:526px;"
      :model="form"
    >
      <div class="tit">协议补充信息</div>
      <div class="cont">
        <el-form-item label="签署人手机号：" class="tel" prop="mobile">
          <el-input
            v-model="form.mobile"
            placeholder="请输入常用手机号"
            :disabled="true"
          >
            <template #prepend>中国 +86</template>
          </el-input>
        </el-form-item>
        <el-form-item label="短信验证码：" prop="authCode">
          <el-input
            v-model="form.authCode"
            placeholder="请输入短信验证码："
            style="width:calc(100% - 148px)"
          ></el-input>
          <button
            type="button"
            :disabled="telDisable"
            class="send-btn"
            @click="getTelCode"
          >
            {{ telCode }}
          </button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import {
  ref,
  reactive,
  nextTick,
  onDeactivated,
  defineProps,
  defineEmits,
} from "vue";
import { checkPhone } from "@/utils/validate";
import { ElMessage } from "element-plus";
import api from "@/api/common";
defineProps({
  mobile: {
    type: String,
    default: "",
  },
  isSendPhone: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["updateSend"]);
const telDisable = ref<boolean>(false);
interface FormTypes {
  mobile: string;
  authCode: string;
}
const form = reactive<FormTypes>({
  mobile: "",
  authCode: "",
});
const formDome = ref(null as HTMLFormElement | null);
const telCode = ref<string>("获取验证码");
// eslint-disable-next-line
let timer: NodeJS.Timeout;
const isSendPhoneCopy = ref<boolean>(false);
const rules = {
  tel: [{ required: true, trigger: "blur", validator: checkPhone }],
  authCode: [{ required: true, message: "请输入手机验证码", trigger: "blur" }],
};
// 定时器
function timeEvent() {
  let sec = 120;
  telDisable.value = true;
  // 定时器启动需要1秒时间先改变文字
  telCode.value = "120s后重新获取";
  timer = setInterval(() => {
    sec--;
    telCode.value = sec + "s后重新获取";
    if (sec < 0) {
      telDisable.value = false;
      telCode.value = "获取验证码";
      clearInterval(timer);
    }
  }, 1000);
}
// 获取手机验证码
function getTelCode() {
  const obj = {
    mobile: form.mobile,
  };
  api.getSecondAuthCode(obj).then(() => {
    timeEvent();
    ElMessage({
      center: true,
      duration: 2000,
      message: "短信已发送成功",
    });
    isSendPhoneCopy.value = true;
    emit("updateSend", isSendPhoneCopy.value);
  });
}
function validate() {
  return new Promise((resolve, reject) => {
    nextTick(() => {
      if (formDome.value) {
        formDome.value.validate((valid: boolean) => {
          if (valid) resolve(form);
          else reject();
        });
      }
    });
  });
}
// 离开清除定时器
onDeactivated(() => {
  clearInterval(timer);
});
</script>
<style scoped lang="scss">
.contractForm {
  margin: auto;
  .btns {
    margin-top: 20px;
    text-align: center;
    .btn {
      margin: 0 8px;
      &.btn-red {
        width: 224px;
        height: 44px;
        font-size: 16px;
      }
    }
  }
  .tit {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }
  .cont {
    margin: 28px 0 0px;
    .el-form-item {
      margin-top: 28px;
    }
  }
}
</style>
