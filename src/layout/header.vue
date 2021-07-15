<!--
 * @Author: sjp
 * @Date: 2021-04-14 17:08:35
 * @LastEditTime: 2021-07-14 13:52:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\layout\header.vue
-->
<template>
  <div class="header-box">
    <div class="logo">
      <router-link v-if="detection" to="/home">
        <img src="~@/assets/images/logo-1.png" />
      </router-link>
      <img v-else src="~@/assets/images/logo-1.png" />
      <span>{{ text }}</span>
    </div>
    <div class="user-name">
      <el-dropdown
        placement="bottom-end"
        trigger="click"
        @visible-change="visibleChange"
      >
        <div class="name" v-show="show">
          <i class="ico-user"></i>
          <span id="toggler-btn">哈哈哈哈</span>
          <i
            :class="isShowExit ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"
          ></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <div class="user-exit">
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
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

export default defineComponent({
  props: {
    text: {
      type: String as PropType<string>,
      default: "欢迎入驻",
    },
    detection: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    show: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  setup() {
    const isShowExit = ref<boolean>(false);
    const methods = {
      loginOut() {
        // this.$http.jsonp("https://sso.jd.com/exit").then(() => {
        //   this.$store.dispatch("user/clearUserInfo");
        //   // 钱包退出
        //   this.$http.jsonp("https://passport.jdpay.com/user/exit.do");
        // });
      },
      visibleChange(val: boolean) {
        isShowExit.value = val;
      },
    };
    return {
      isShowExit,
      ...methods,
    };
  },
});
</script>

<style scoped lang="scss">
.header-box {
  background: $white-color;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.08);
  position: relative;
  height: 100px;
  line-height: 100px;
  border-bottom: 1px solid #ebebeb;
  padding: 0 100px;
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
    .name {
      font-size: 15px;
      cursor: pointer;
      line-height: 100px;
      i {
        margin-left: 8px;
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
        margin-right: 8px;
      }
    }
  }
}
.user-exit {
  width: 142px !important;
  line-height: 48px !important;
  cursor: pointer;
  font-size: 14px;
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
