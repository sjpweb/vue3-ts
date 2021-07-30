<!--
 * @Author: sjp
 * @Date: 2021-04-14 17:08:35
 * @LastEditTime: 2021-07-28 14:55:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\layout\header.vue
-->
<template>
  <div
    class="header-box"
    :style="{
      height: height + 'px',
      lineHeight: height + 'px',
    }"
  >
    <div class="box">
      <div class="logo">
        <router-link v-if="detection" to="/home">
          <img src="~@/assets/images/logo-1.png" />
        </router-link>
        <img v-else src="~@/assets/images/logo-1.png" />
        <span>{{ text }}</span>
      </div>
      <slot name="nav"></slot>
      <div class="user-name">
        <el-dropdown
          placement="bottom-end"
          trigger="click"
          @visible-change="visibleChange"
        >
          <div
            class="name"
            :style="{
              lineHeight: height + 'px',
            }"
            v-show="show"
          >
            <i class="ico-user"></i>
            <span>{{ userInfo.companyName }}</span>
            <i
              :class="isShowExit ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"
            ></i>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <div class="user-exit">
                <div v-if="backstage" class="to-shop" @click="openSystem">
                  <div class="vertical"></div>
                  <span>进入商家后台</span>
                  <i class="icon-right"></i>
                </div>
                <div @click="loginOut" class="login-out">
                  <i class="ico-exit"></i>
                  <span>退出登录</span>
                </div>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, defineProps } from "vue";
import { useStore } from "@/store";
import api from "@/api/home";
import url from "@/config";
import jsonp from "@/utils";
defineProps({
  text: {
    type: String,
    default: "欢迎入驻",
  },
  detection: {
    type: Boolean,
    default: false,
  },
  show: {
    type: Boolean,
    default: true,
  },
  height: {
    type: Number,
    default: 100,
  },
  backstage: {
    type: Boolean,
    default: false,
  },
});
const isShowExit = ref<boolean>(false);
const store = useStore();
const userInfo = computed(() => store.state.user.userInfo);
function loginOut() {
  store.dispatch("user/logOut");
}
function openSystem() {
  // 自营进入商家后台是清除合同提示
  if (userInfo.value.popFlag == 2) {
    api.updateContractState({}).then(() => {
      const { baseUrl } = url;
      window.open(baseUrl);
    });
  } else {
    const { baseUrl } = url;
    window.open(baseUrl);
  }
}
function visibleChange(val: boolean) {
  isShowExit.value = val;
}
</script>

<style scoped lang="scss">
.header-box {
  min-width: 1200px;
  background: $white-color;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.08);
  position: relative;
  border-bottom: 1px solid #ebebeb;
  .box {
    width: 1200px;
    margin: auto;
  }
  .logo {
    display: inline-block;
    img {
      height: 20px;
      vertical-align: middle;
    }
    span {
      margin-left: 32px;
      font-size: 20px;
      vertical-align: middle;
    }
  }
  .user-name {
    float: right;
    margin-right: 10px;
    .name {
      font-size: 15px;
      cursor: pointer;
      padding-right: 8px;
      i {
        margin-left: 6px;
        color: #999;
      }
      .ico-user {
        width: 15px;
        height: 15px;
        display: inline-block;
        background: url(~@/assets/images/ico-user.png) no-repeat center;
        background-size: contain;
        vertical-align: middle;
        margin-bottom: 2px;
        margin-right: 6px;
      }
    }
  }
}
.user-exit {
  width: 142px !important;
  line-height: 48px !important;
  cursor: pointer;
  font-size: 14px;

  .to-shop {
    padding: 0 4px 0 16px;
    display: flex;

    align-items: center;
    border-bottom: 1px solid rgb(240, 240, 240);
    .vertical {
      display: inline-block;
      width: 3px;
      height: 13px;
      font-weight: 400;
      font-size: 15px;
      background-color: $red-color;
      margin-right: 10px;
      margin-top: 1px;
    }
    .icon-right {
      width: 8px;
      height: 13px;
      display: inline-block;
      background: url(~@/assets/images/arrow-right.png) no-repeat center;
      background-size: contain;
      vertical-align: middle;
      margin-left: 8px;
      margin-top: 2px;
    }
  }
  .login-out {
    padding: 0 4px 0 16px;

    .ico-exit {
      width: 14px;
      height: 14px;
      display: inline-block;
      background: url(~@/assets/images/exit.png) no-repeat center;
      background-size: contain;
      vertical-align: middle;
      margin-right: 6px;
    }
  }
}
</style>
