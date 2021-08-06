<!--
 * @Author: sjp
 * @Date: 2021-07-30 11:30:08
 * @LastEditTime: 2021-08-03 16:32:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\components\CResult\index.vue
-->
<template>
  <div class="selector-top">
    <div class="crumb">
      <span>全部结果</span>
      <i style="margin: 0 4px" class="el-icon-arrow-right"></i>
      <div class="screen-keys">
        <template v-for="item in typeList" :key="item.type">
          <div class="item" v-if="item.avtiveName">
            <span>{{ item.title }}：</span>
            <el-tooltip
              :content="item.avtiveName"
              placement="bottom-start"
              effect="light"
            >
              <span class="c">{{ item.avtiveName }}</span>
            </el-tooltip>
            <button class="close">
              <i class="el-icon-close" @click="cleanType(item.title)"></i>
            </button>
          </div>
        </template>
      </div>
      <span>共{{ allCount }}个结果 </span>
    </div>
    <div class="fl">
      <slot name="search"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
const emit = defineEmits(["cleanType"]);
interface ServiceType {
  avtiveName: string;
  title: string;
}
defineProps({
  typeList: {
    default: (): ServiceType[] => [],
  },
  allCount: {
    type: Number,
    default: 0,
  },
});
function cleanType(title: string) {
  emit("cleanType", title);
}
</script>
<style scoped lang="scss">
.selector-top {
  padding: 8px 0;
  line-height: 36px;
  position: relative;

  .crumb {
    &:last-child:after {
      display: none;
    }
    display: flex;
    align-items: center;
  }

  .tit {
    font-size: 15px;
    line-height: 12px;
    height: 12px;
    border-left: solid 3px $red-color;
    padding-left: 10px;
    font-weight: 600;
    margin: 0 20px 10px 12px;
    display: inline-block;
    color: $text-color;
  }

  .el-checkbox {
    display: inline-block;
    margin: 0 20px 0 0;

    .el-checkbox__inner {
      width: 12px;
      height: 12px;

      &:after {
        left: 3px;
        top: 0;
      }
    }
  }
  .fl {
    position: absolute;
    right: 0;
    top: 8px;
  }
  .screen-keys {
    display: inline-block;
    vertical-align: middle;
    margin-top: -3px;

    .item {
      display: inline-block;
      background: $bg-gray;
      border: 1px solid $border-color;
      height: 24px;
      line-height: 17px;
      padding: 2px 3px;
      margin: 0 6px 0 0;
      position: relative;

      span {
        float: left;

        &.c {
          max-width: 110.67px;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: 3px;
          color: $red-color;
        }
      }

      .close {
        border: none;
        background: none;
        cursor: pointer;
      }
    }
  }
}
</style>
