<!--
 * @Author: sjp
 * @Date: 2021-07-19 16:55:09
 * @LastEditTime: 2021-07-27 14:05:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\components\CCountDown\index.vue
-->
<template>
  <button
    type="button"
    :class="[!isDisabled ? 'send-btn' : 'isDisabled']"
    :style="{
      width: width + 'px',
      height: height + 'px',
      float: 'right',
    }"
    :disabled="isDisabled"
    @click="getCode"
  >
    {{ btnText }}
  </button>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch, onDeactivated } from "vue";
const props = defineProps({
  btnName: {
    type: String,
    default: "获取验证码",
  },
  time: {
    type: Number,
    default: 60,
  },
  width: {
    type: Number,
    default: 138,
  },
  height: {
    type: Number,
    default: 40,
  },
  isCheck: {
    type: Boolean,
    default: false,
  },
});
const btnText = ref<string>("获取验证码");
const isDisabled = ref<boolean>(false);
const emit = defineEmits(["click"]);
// eslint-disable-next-line
let timer: NodeJS.Timeout;
function getCode() {
  emit("click");
}
watch(
  () => props.isCheck,
  (newVak) => {
    if (newVak) {
      let len = props.time;
      isDisabled.value = true;
      btnText.value = `${len}s后重新获取`;
      timer = setInterval(() => {
        len--;
        btnText.value = len + "s后重新获取";
        if (len < 0) {
          isDisabled.value = false;
          btnText.value = props.btnName;
          clearInterval(timer);
        }
      }, 1000);
    }
  }
);
onDeactivated(() => {
  clearInterval(timer);
});
</script>
<style scoped lang="scss">
.isDisabled {
  background: #999;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
