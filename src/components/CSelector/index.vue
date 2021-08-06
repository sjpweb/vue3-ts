<!--
 * @Author: sjp
 * @Date: 2021-07-30 16:42:05
 * @LastEditTime: 2021-08-04 11:17:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\components\CSelector\index.vue
-->
<template>
  <div class="selector-line">
    <div class="s-key">{{ type }}</div>
    <div class="s-value">
      <div
        class="s-v-item"
        ref="itemDemo"
        :style="{ height: onFlag ? '30px' : 'auto' }"
      >
        <a
          href="javascript:"
          @click="cleanType()"
          :class="{ on: idList.length == 0 }"
          >全部</a
        >
        <span v-for="(items, key) in typeList" :key="key">
          <a
            href="javascript:"
            :class="{
              on: idList.indexOf(items.id) != -1,
            }"
            @click="getTypeId(items)"
            >{{ items.name }}</a
          >
        </span>
        <slot name="slot"></slot>
      </div>
      <a href="javascript:" class="show" @click="onClick" v-if="onFlag"
        >展开<i class="el-icon-arrow-down"></i>
      </a>
      <a
        href="javascript:"
        class="show"
        @click="onClick"
        v-if="!onFlag && offFlag"
        >收起<i class="el-icon-arrow-up"></i>
      </a>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, watch, nextTick, defineEmits } from "vue";
const emit = defineEmits(["getTypeId", "cleanType"]);
interface TypeList {
  name: string;
  id: number;
}
const onFlag = ref<boolean>(false);
const offFlag = ref<boolean>(false);
const itemDemo = ref(null as HTMLElement | null);
const props = defineProps({
  idList: {
    default: (): number[] => [],
  },
  type: {
    type: String,
    default: "",
  },
  typeList: {
    default: (): TypeList[] => [],
  },
});

//  监听列表变化后再获取元素高度
watch(
  () => props.typeList.length,
  () => {
    nextTick(() => {
      if (itemDemo.value) {
        const lineNum = itemDemo.value.offsetHeight / 30;
        lineNum > 1 ? (onFlag.value = true) : (onFlag.value = false);
      }
    });
  }
);
function cleanType() {
  emit("cleanType", props.type);
}
function onClick() {
  onFlag.value = !onFlag.value;
  offFlag.value = !offFlag.value;
}
function getTypeId(items: TypeList) {
  emit("getTypeId", items, props.type);
}
</script>
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
