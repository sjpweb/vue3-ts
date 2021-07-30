<!--
 * @Author: sjp
 * @Date: 2021-07-30 16:42:05
 * @LastEditTime: 2021-07-30 17:21:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\components\CSelector\index.vue
-->
<template>
  <div class="selector-line">
    <div class="s-key">服务类型</div>
    <div class="s-value">
      <div class="s-v-item" :class="{ on: serviceTypesNum == 10 }">
        <a
          href="javascript:"
          @click="cleanType()"
          :class="{ on: serviceTypeIdItem.length == 0 }"
          >全部</a
        >
        <span v-for="(items, key) in serviceTypes" :key="key">
          <a
            href="javascript:"
            :class="{
              on: serviceTypeIdItem.indexOf(items.serviceTypeId) != -1,
            }"
            @click="setServiceTypeId(items.serviceTypeId)"
            v-if="key < serviceTypesNum"
            >{{ items.serviceTypeName }}</a
          >
        </span>
      </div>
      <a
        href="javascript:"
        class="show"
        :class="{ vhidden: serviceTypes.length <= 10 }"
        @click="showSelectLine1"
        v-if="serviceTypesNum == 10"
        >展开<i class="el-icon-arrow-down"></i>
      </a>
      <a
        href="javascript:"
        class="show"
        :class="{ vhidden: serviceTypes.length <= 10 }"
        @click="showSelectLine1"
        v-else
        >收起<i class="el-icon-arrow-up"></i>
      </a>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style scoped lang="scss">
.selector-line {
  border-top: solid 1px #eee;
  padding: 8px 0;
  min-height: 45.4px;
  position: relative;
  display: flex;
  line-height: 20px;
  &:after {
    content: "";
    clear: both;
    display: block;
  }
  .btn-clear {
    font-size: 12px;
    padding: 0 6px;
    line-height: 23px;
  }
  .s-key {
    width: 84px;
    padding: 5px 12px;
    float: left;
  }
  .s-value {
    .s-v-item {
      width: 998px;
      overflow: hidden;
      a {
        margin: 4px 24px 4px 0;
        height: 20px;
        padding: 0 8px;
        border-radius: 2px;
        display: inline-block;
        &.on {
          background: #f2f2f2;
        }
      }
    }
  }
  .show {
    position: absolute;
    right: 10px;
    top: 10px;
    border: 1px solid $border-color;
    width: 52px;
    text-align: center;
    padding-left: 2px;

    i {
      margin: 0 2px;
    }
  }
}
</style>
