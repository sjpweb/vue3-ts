<!--
 * @Author: sjp
 * @Date: 2021-07-30 11:30:08
 * @LastEditTime: 2021-07-30 16:06:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\components\CSearch\index.vue
-->
<template>
  <div class="s-search">
    <input
      type="text"
      class="t"
      v-model="facilitatorName"
      placeholder="搜索"
      v-on:keyup.enter="search"
    />
    <input id="se" type="submit" class="b" @click="search" value=" " />
  </div>
</template>
<script lang="ts" setup>
function search() {
  console.log(1);
}
</script>
<style scoped lang="scss">
.s-search {
  display: inline-block;
  border: solid 1px $border-color;
  height: 36px;
  margin-left: 14px;
  vertical-align: middle;

  .t {
    border: none;
    width: 164px;
    background: none;
    padding: 0 12px;
    height: 34px;
    float: left;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    outline: none;
    &::placeholder {
      color: #888;
    }
  }

  .b {
    background: url(~@/assets/images/ico-search.png) no-repeat center;
    border: none;
    height: 32px;
    width: 36px;
    cursor: pointer;
    background-size: 58%;
    float: right;
  }
}
</style>
