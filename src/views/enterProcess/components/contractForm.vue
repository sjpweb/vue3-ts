<!--
 * @Author: sjp
 * @Date: 2021-04-16 19:59:22
 * @LastEditTime: 2021-07-23 16:30:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\enterProcess\components\contractForm.vue
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
        <el-form-item label="签署人姓名：" prop="transactorName">
          <el-input
            maxlength="15"
            v-model="form.transactorName"
            placeholder="请输入签署人姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="签署人身份证号：" prop="idCardNum">
          <el-input
            maxlength="18"
            v-model="form.idCardNum"
            placeholder="请输入签署人身份证号"
          ></el-input>
        </el-form-item>
        <el-form-item label="签署人手机号：" class="tel" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入常用手机号">
            <template #prepend>中国 +86</template>
          </el-input>
        </el-form-item>
        <el-form-item label="短信验证码：" prop="authCode">
          <el-input
            v-model="form.authCode"
            placeholder="请输入短信验证码"
            style="width:calc(100% - 148px)"
          ></el-input>
          <button
            type="button"
            :disabled="telDisable"
            class="lbtn-red btn-send"
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
import { checkPhone } from "@/utils/validate";
import api from "@/api/common";
import { reactive, ref, onDeactivated } from "vue";
import { ElMessage } from "element-plus";
const formDome = ref(null as HTMLFormElement | null);
const telDisable = ref<boolean>(false);
const telCode = ref<string>("获取验证码");
interface FormType {
  transactorName: string;
  idCardNum: string;
  mobile: string;
  authCode: string;
}
const form = reactive<FormType>({
  transactorName: "",
  idCardNum: "",
  mobile: "",
  authCode: "",
});
const rules = {
  transactorName: [
    { required: true, message: "请输入联系人姓名", trigger: "blur" },
  ],
  idCardNum: [
    { required: true, message: "请输入盖章人身份证号", trigger: "blur" },
  ],
  mobile: [{ required: true, trigger: "blur", validator: checkPhone }],
  authCode: [{ required: true, message: "请输入手机验证码", trigger: "blur" }],
};
// eslint-disable-next-line
let timer: NodeJS.Timeout;
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
  api.getAuthCode({ mobile: form.mobile }).then(() => {
    timeEvent();
    ElMessage({
      center: true,
      duration: 2000,
      message: "短信已发送成功",
    });
  });
}
function validate() {
  return new Promise((resolve, reject) => {
    if (formDome.value)
      formDome.value.validate((valid: boolean) => {
        if (valid) resolve(form);
        else reject();
      });
  });
}
// 离开清除定时器
onDeactivated(() => {
  clearInterval(timer);
});
//   methods: {
//     // 定时器
//     timeEvent() {
//       let sec = 120;
//       this.telDisable = true;
//       // 定时器启动需要1秒时间先改变文字
//       this.telCode = "120s后重新获取";
//       this.timer = setInterval(() => {
//         sec--;
//         this.telCode = sec + "s后重新获取";
//         if (sec < 0) {
//           this.telDisable = false;
//           this.telCode = "获取验证码";
//           clearInterval(this.timer);
//         }
//       }, 1000);
//     },
//     // 获取手机验证码
//     getTelCode() {

//       api.getAuthCode({ mobile: this.form.mobile }).then(() => {
//         this.timeEvent();
//         this.$warning("短信已发送成功");
//       });
//     },
//     validate() {
//       return new Promise((resolve, reject) => {
//         this.$refs.form.validate((valid) => {
//           if (valid) resolve(this.form);
//           else reject();
//         });
//       });
//     },
//   },
//   destroyed() {
//     // 离开清除定时器
//     clearInterval(this.timer);
//   },
// };
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
