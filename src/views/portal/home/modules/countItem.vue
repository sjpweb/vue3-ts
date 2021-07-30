<!--
 * @Author: sjp
 * @Date: 2021-07-28 09:11:49
 * @LastEditTime: 2021-07-30 09:22:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\portal\home\modules\countItem.vue
-->
<template>
  <div class="item">
    <i class="ico" :style="{ backgroundImage: 'url(' + iconUrl + ')' }"></i>
    <div class="txt">
      <b class="jdfont">{{ countNumber.toFixed(0) }}</b>
      <span>{{ labelName }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
defineProps({
  labelName: {
    type: String,
    default: "",
  },
  iconUrl: {
    type: String,
    default: "",
  },
  countNumber: {
    type: Number,
    default: 0,
  },
});
</script>
<style scoped lang="scss">
.item {
  flex: 1;
  padding: 0;
  margin: 22px 0;
  line-height: 1.6;
  text-align: center;
  border-right: solid 1px $border-color;
  &:last-child {
    border: none;
  }
  i {
    &.ico {
      display: inline-block;
      width: 70px;
      height: 70px;
      background-repeat: no-repeat;
      background-position: center;
      border-radius: 50%;
      background-size: cover;
      margin-right: 14px;
      margin-top: 5px;
      vertical-align: middle;
    }
  }
  b {
    min-width: 100px;
    display: block;
    font-size: 36px;
    font-family: "JDZhengHei";
    line-height: 1.2;
  }
  .txt {
    display: inline-block;
    vertical-align: middle;
    text-align: left;
    font-size: 15px;
  }
}
</style>
