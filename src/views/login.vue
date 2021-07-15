<!--
 * @Author: sjp
 * @Date: 2021-07-13 15:09:27
 * @LastEditTime: 2021-07-15 13:32:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\login.vue
-->
<template>
  <div class="login-box">
    <c-header :show="false" text="欢迎登录"></c-header>
    <div class="login-main">
      <div class="login-banner">
        <img src="~@/assets/images/login-banner.png" />
      </div>
      <div class="box-form">
        <h2>账户登录</h2>
        <div class="login">
          <iframe id="iframe" :src="src" frameborder="0"></iframe>
          <div v-show="show" class="go-register" @click="goRegister">
            <img src="~@/assets/images/ico-arrow_W.png" alt="" />
            <span>立即注册</span>
          </div>
        </div>
      </div>
    </div>
    <c-footer></c-footer>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import CHeader from "@/layout/header.vue";
import CFooter from "@/layout/footer.vue";
import jdUrl from "@/config";
export default defineComponent({
  components: {
    CHeader,
    CFooter,
  },
  setup() {
    const src = ref<string>("");
    const { protocol, host, pathname } = location;
    const url = `${protocol}//${host}${pathname}#/home`;
    src.value = jdUrl.jdUrl.login.replace("{URL}", url);
    return {
      src,
    };
  },
});
</script>
<style scoped lang="scss">
.login-box {
  background: #f4f5f8;
}
.login-main {
  overflow: hidden;
  padding: 80px 0 120px;
  min-height: calc(100vh - 222px);
  width: 1200px;
  margin: auto;
  .login-banner {
    width: 534px;
    float: left;
    margin-left: 100px;

    img {
      width: 100%;
    }
  }
}
.box-form {
  margin-top: 72px;
  margin-left: 100px;
  display: inline-block;
  height: 320px;
  background: $white-color;
  h2 {
    font-size: 25px;
    margin-top: 28px;
    margin-bottom: 14px;
    color: $red-color;
    text-align: center;
  }
}
.login {
  width: 380px;
  height: 260px;
  position: relative;
}

#iframe {
  width: 100%;
  height: 100%;
}
.go-register {
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  left: 36px;
  background: #fdfdfd;
  z-index: 0;
  color: $red-color;
  font-size: 14px;
  line-height: 20px;
  img {
    width: 16px;
    height: 16px;
    vertical-align: middle;
    margin-right: 6px;
    margin-bottom: 2px;
  }
}
</style>
