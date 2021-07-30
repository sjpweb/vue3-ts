<!--
 * @Author: sjp
 * @Date: 2021-07-30 10:10:31
 * @LastEditTime: 2021-07-30 10:12:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\portal\common\footer.vue
-->
<template>
  <div class="footer">
    <p class="f-logo"><img src="~@/assets/images/logo-2.png" /></p>
    <p>Copyright © 2004-2021 京东 JD.COM 版权所有</p>
    <p>合作咨询：jzyf@jd.com</p>
  </div>
</template>
<style scoped lang="scss">
.footer {
  min-width: 1200px;
  text-align: center;
  background: $footer-color;
  color: #949494;
  padding: 48px 0;

  .f-logo {
    margin-bottom: 12px;

    img {
      height: 18px;
    }
  }
}
</style>
