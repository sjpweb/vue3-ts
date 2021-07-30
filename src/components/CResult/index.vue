<!--
 * @Author: sjp
 * @Date: 2021-07-30 11:30:08
 * @LastEditTime: 2021-07-30 16:11:26
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
        <div class="item" v-if="serviceTypeIdItem.length != 0">
          <span>服务类型：</span>
          <el-tooltip
            :content="serviceName"
            placement="bottom-start"
            effect="light"
          >
            <span class="c">{{ serviceName }}</span>
          </el-tooltip>
          <button class="close">
            <i class="el-icon-close" @click="cleanType()"></i>
          </button>
        </div>
        <div class="item" v-if="itemCatIdItem.length != 0">
          <span>服务品类：</span>
          <el-tooltip
            :content="itemCatName"
            placement="bottom-start"
            effect="light"
          >
            <span class="c">{{ itemCatName }}</span>
          </el-tooltip>
          <button class="close">
            <i class="el-icon-close" @click="cleanItemCat()"></i>
          </button>
        </div>
        <div class="item" v-if="selectAreaName.length != 0">
          <span>服务区域：</span>
          <el-tooltip
            :content="selectAreaName"
            placement="bottom-start"
            effect="light"
          >
            <span class="c">{{ selectAreaName }}</span>
          </el-tooltip>
          <button class="close">
            <i class="el-icon-close" @click="cleanSelectAreaName()"></i>
          </button>
        </div>
      </div>
      <span>共{{ allCount }}个结果 </span>
    </div>
    <div class="fl">
      <slot name="search"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
interface serviceTypes {
  itemCatName: string;
  itemCatId: number;
}
const props = defineProps({
  serviceTypeIdItem: {
    default: (): serviceTypes[] => [],
  },
  itemCatIdItem: {
    default: (): serviceTypes[] => [],
  },
  selectAreaName: {
    default: (): serviceTypes[] => [],
  },
  allCount: {
    type: Number,
    default: 0,
  },
});
function filterList(list: serviceTypes[]) {
  let arrvalue = "";
  list.forEach((item, index) => {
    if (index == list.length - 1) {
      arrvalue += item;
    } else {
      arrvalue += item + "，";
    }
  });
  return arrvalue;
}
const serviceName = filterList(props.serviceTypeIdItem);
const itemCatName = filterList(props.itemCatIdItem);
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
}
</style>
