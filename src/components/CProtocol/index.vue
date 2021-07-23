<!--
 * @Author: sjp
 * @Date: 2021-04-20 18:19:24
 * @LastEditTime: 2021-07-23 10:17:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\components\CProtocol\index.vue
-->
<template>
  <div class="box">
    <div class="content" :style="{ height: `${height}px` }">
      <i class="icon el-icon-loading"></i>
      <div style="height:100%">
        <img
          v-for="(item, i) in list"
          :src="`data:image/png;base64,${item}`"
          alt=""
          :key="i"
        />
      </div>
    </div>
    <el-checkbox v-model="checked">我已阅读并同意</el-checkbox>
    <div class="btns">
      <button
        type="button"
        :disabled="disabled"
        class="btn-red btn"
        @click="sign"
      >
        签署协议
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, defineEmits } from "vue";
import { ElMessage } from "element-plus";
defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: true,
  },
  height: {
    type: Number,
    default: 400,
  },
});
const emit = defineEmits(["seal"]);
const checked = ref<boolean>(false);
function sign() {
  if (checked.value) {
    ElMessage({
      center: true,
      duration: 2000,
      message: "请选择阅读并勾选同意协议！",
    });
  }
  emit("seal");
}
</script>
<style scoped lang="scss">
.box {
  min-height: 586px;
  width: 980px;
  margin: auto;
  padding: 46px 0;
}
img {
  width: 100%;
  height: 1400px;
  max-height: 1400px;
  position: relative;
  z-index: 10;
}
.content {
  overflow-y: auto;
  margin-bottom: 12px;
  position: relative;
  .icon {
    font-size: 50px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.content::-webkit-scrollbar {
  width: 8px;
}
.content::-webkit-scrollbar-track {
  background-color: #f2f2f2;
}
.content::-webkit-scrollbar-thumb {
  background-color: #999999;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
.content::-moz-scrollbar {
  width: 8px;
}
.content::-moz-scrollbar-track {
  background-color: #f2f2f2;
}
.content::-moz-scrollbar-thumb {
  background-color: #999999;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
.btns {
  text-align: center;
}
.btn {
  margin-top: 12px;
  width: 128px;
  height: 44px;
}
</style>
