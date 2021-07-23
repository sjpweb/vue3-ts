<!--
 * @Author: sjp
 * @Date: 2021-04-16 11:01:40
 * @LastEditTime: 2021-07-22 18:19:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\components\CSteps\index.vue
-->
<template>
  <div class="bgFFF">
    <div class="steps">
      <div class="box">
        <div class="item" v-for="(item, index) in list" :key="index">
          <p :class="item.entrySteps <= step ? 'activeIndex' : 'index'">
            <span class="num">{{ index + 1 }}</span>
          </p>
          <img
            v-if="index < list.length - 1"
            :src="item.entrySteps < step ? lineOn : line"
            alt=""
          />
          <p :class="item.entrySteps <= step ? 'activeText' : 'text'">
            {{ item.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
import line from "@/assets/images/line.png";
import lineOn from "@/assets/images/line-on.png";
interface ListItemType {
  entrySteps: number;
  title: string;
}
defineProps({
  list: {
    default: (): ListItemType[] => [],
  },
  step: {
    type: Number,
    default: 0,
  },
});
</script>
<style scoped lang="scss">
.steps {
  background: $bg-gray;
  .box {
    width: 100%;
    display: flex;
    justify-content: center;
    height: 114px;
    padding-top: 33px;
  }
  .item {
    .activeIndex {
      display: inline-block;
      vertical-align: middle;
      width: 24px;
      height: 24px;
      margin: 0 10px;
      border-radius: 50%;
      background: #33bd4e;
      text-align: center;
      position: relative;
      .num {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
      }
    }
    .index {
      display: inline-block;
      vertical-align: middle;
      width: 24px;
      height: 24px;
      margin: 0 10px;
      border-radius: 50%;
      border: 2px solid #cdcdcd;
      text-align: center;
      position: relative;
      color: #999;
      .num {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .activeText {
      color: #33bd4e;
      text-indent: -14px;
    }
    .text {
      color: #666;
      text-indent: -14px;
    }
  }
}
</style>
