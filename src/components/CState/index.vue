<!--
 * @Author: sjp
 * @Date: 2021-04-20 18:38:57
 * @LastEditTime: 2021-07-22 18:44:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\components\CState\index.vue
-->
<template>
  <div>
    <div class="settled-status" :style="{ paddingTop: `${top}px` }">
      <div class="box">
        <img
          class="icon"
          v-if="presentState[state].img"
          :src="presentState[state].img"
          alt=""
        />
        <i
          v-if="presentState[state].icon"
          :class="`icon ${presentState[state].icon}`"
          :style="{ color: presentState[state].color }"
        ></i>
        <p class="text">{{ presentState[state].text }}</p>
        <div class="reason" v-if="presentState[state].reason">
          <p
            class="item"
            v-for="item in presentState[state].reason"
            :key="item"
          >
            {{ item }}
          </p>
        </div>
        <el-button
          v-if="presentState[state].btn"
          class="btn"
          type="primary"
          @click="clickEvent(presentState[state], queryVal, emit)"
        >
          {{ presentState[state].btn }}
        </el-button>
        <template v-if="presentState[state].btns">
          <el-button
            v-for="(d, i) in presentState[state].btns"
            :key="i"
            class="btn"
            :type="d.type"
            @click="clickEvent(d, queryVal, emit)"
          >
            {{ d.text }}
          </el-button>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineEmits, defineProps } from "vue";
import { useRoute } from "vue-router";
defineProps({
  presentState: {
    // eslint-disable-next-line
    default: (): StateObjTypes => ({}),
  },
  state: {
    type: Number,
    default: 0,
  },
  top: {
    type: Number,
    default: 52,
  },
});
const emit = defineEmits(["artificialCheck"]);
function clickEvent(
  // eslint-disable-next-line
  val: StateTypes,
  routeVal: string,
  emit: (event: "artificialCheck", ...args: number[]) => void
) {
  if (val.event) val.event(val, routeVal, emit);
}
const route = useRoute();
const queryVal = route.query.s as string;
</script>
<style scoped lang="scss">
.settled-status {
  padding: 0 150px 0px;
  .box {
    border: 1px solid $border-line-color;
    padding: 64px 0 64px 150px;
    color: $text-dgray-color;
    font-size: 14px;
    position: relative;
    line-height: 2;
    .text {
      font-size: 18px;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .reason {
      margin-top: 6px;
      font-size: 12px;
      color: #a84343;
    }
    .item {
      font-size: 14px;
      color: #656565;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .btn {
      width: 142px;
      height: 46px;
      margin-top: 24px;
      margin-right: 13px;
    }
    .icon {
      width: 30px;
      height: 30px;
      position: absolute;
      left: 100px;
      top: 66px;
      font-size: 31px;
    }
  }
}
</style>
