<!--
 * @Author: sjp
 * @Date: 2021-07-16 10:10:42
 * @LastEditTime: 2021-07-28 14:53:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\register.vue
-->
<template>
  <div>
    <c-header></c-header>
    <el-form
      ref="form"
      label-width="195px"
      class="register-wrap register-step1"
    >
      <div class="tit">请选择您要入驻的用户身份</div>
      <div class="role">
        <el-radio-group v-model="region">
          <label
            class="item"
            :class="{ on: role === option.role }"
            v-for="option in options"
            :key="option.text"
            @click="onchange(option.role)"
          >
            <i :class="option.img" class="ico"></i>
            <p>{{ option.text }}</p>
            <el-radio :label="option.text"> </el-radio>
          </label>
        </el-radio-group>
      </div>
      <div class="tips">
        <i class="el-icon-warning-outline f-orgn"></i>
        一旦入驻不可更改用户身份，且同一企业只能入驻一次，不可重复入驻，请您谨慎选择
      </div>
      <el-button class="btn" type="primary" @click="onSubmit()">
        开始入驻
      </el-button>
    </el-form>
    <c-footer></c-footer>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import CHeader from "@/layout/header.vue";
import CFooter from "@/layout/footer.vue";
import { useStore } from "@/store";
import api from "@/api/common";
import { ElMessage, ElMessageBox } from "element-plus";

const store = useStore();
enum Identity {
  Purchaser = 1,
  Facilitator,
  Branch,
  Worker,
  Dismantlingplant,
}
const options = reactive([
  { text: "采购商", img: "ico1", role: Identity.Purchaser },
  { text: "服务商", img: "ico2", role: Identity.Facilitator },
  { text: "网点", img: "ico3", role: Identity.Branch },
  { text: "拆解厂", img: "ico4", role: Identity.Dismantlingplant },
]);
const role = ref<number>(0);
const region = ref<string>("");
function onSubmit() {
  if (!role.value) {
    ElMessage("请选择您要入驻的用户身份！");
    return;
  }
  ElMessageBox.confirm(`是否确认入驻身份为${region.value}，确认后不可更改`)
    .then(() => {
      api.setUserRole({ userType: role.value }).then(() => {
        store.dispatch("user/getUserInfo");
      });
    })
    .catch((cancel) => cancel);
}
function onchange(val: number) {
  role.value = val;
}
</script>
<style scoped lang="scss">
.register-wrap {
  width: 540px !important;
  .el-form-item__content {
    font-size: 12px;
  }
  &.register-step1 {
    width: 1200px !important;
    padding: 100px 0 80px;
    min-height: calc(100vh - 220px);
    text-align: center;
    margin: auto;
    .tit {
      font-size: 18px;
      font-weight: 600;
    }
    .role .item {
      width: 264px;
      height: 260px;
      border: solid 1px $bg-gray;
      font-size: 18px;
      color: $text-color;
      display: inline-block;
      margin: 30px 10px 20px;
      background: $bg-gray;
      cursor: pointer;
      &.on {
        background: #fff1f1;
        border-color: $red-color;
        color: $red-color;
      }
      .el-radio {
        display: none;
      }
      i.ico {
        width: 198px;
        height: 176px;
        background: no-repeat center;
        margin: 20px auto;
        display: block;
        &.ico1 {
          background-image: url(~@/assets/images/register-role1.png);
          background-size: 100%;
        }
        &.ico2 {
          background-image: url(~@/assets/images/register-role2.png);
          background-size: 100%;
        }
        &.ico3 {
          background-image: url(~@/assets/images/register-role3.png);
          background-size: 100%;
        }
        &.ico4 {
          background-image: url(~@/assets/images/register-role4.png);
          background-size: 100%;
        }
      }
    }
    .tips {
      font-size: 13px;
      .f-orgn {
        color: $orgn-color;
      }
    }
    .btn {
      width: 174px;
      height: 48px;
      border-radius: 2px;
      margin: 24px auto;
      display: block;
      font-size: 15px;
      border-radius: 4px;
    }
  }
}
</style>
