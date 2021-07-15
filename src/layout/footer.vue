<!--
 * @Author: sjp
 * @Date: 2021-07-14 09:42:08
 * @LastEditTime: 2021-07-14 10:00:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\layout\footer.vue
-->
<!--
 * @Author: sjp
 * @Date: 2021-04-14 17:09:20
 * @LastEditTime: 2021-05-15 10:18:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static\src\layout\footer.vue
-->
<template>
  <div class="footer">
    <div class="copyright">
      Copyright © 2004-2021 京东JD.com 版权所有
    </div>
  </div>
</template>
<style scoped lang="scss">
.footer {
  border-top: solid 1px $border-line-color;
  background: $bg-gray;
  color: $text-ngray-color;
  text-align: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;
  height: 120px;
  .copyright {
    width: 100%;
  }
}
</style>
