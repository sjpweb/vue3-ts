<!--
 * @Author: sjp
 * @Date: 2021-08-04 17:22:20
 * @LastEditTime: 2021-08-05 16:53:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\portal\serviceMarket\components\attrDialog.vue
-->
<template>
  <el-dialog
    title="查看属性"
    width="482px"
    :model-value="dialogVisible"
    custom-class="dialog-box chhek-attribute"
  >
    <div class="content">
      <div class="table-name">
        <dl v-for="(items, key) in productAttributeData" :key="key">
          <dt :data-name="items.attributeName">{{ items.attributeName }}：</dt>
        </dl>
      </div>
      <div class="table-classify">
        <div>
          <dl v-for="(items, key) in productAttributeData" :key="key">
            <dd>
              <span v-for="(item, key) in items.attributeValueNames" :key="key">
                {{ item }}
                <p class="borfer" :style="{ left: `${(key + 1) * 126}px` }"></p>
              </span>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <button @click="emit('upData', false)" class="btn-red btn">
          确 定
        </button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
/*
attributeName 产品类型
attributeValueNames  产品属性
*/
interface ProductAttributeType {
  attributeName: string;
  attributeValueNames: string[];
}
const emit = defineEmits(["upData"]);
defineProps({
  dialogVisible: Boolean,
  productAttributeData: {
    default: (): ProductAttributeType[] => [],
  },
});
</script>
<style scoped lang="scss">
.chhek-attribute {
  height: 303px;

  .content {
    height: 210px !important;
  }
  .el-dialog__footer {
    padding: 16px !important;
  }
}
.table-name {
  left: 0;
  top: 30px;
  bottom: 0;
  width: 132px;
  z-index: 3;
  background: #fafafa;
  position: absolute;

  dt {
    font-weight: 400;
    font-size: 12px;
    width: 132px;
    color: #888;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
  }
}
.table-classify {
  margin-left: 152px;
  overflow: auto;
  height: 100%;
  position: relative;

  dl {
    dd {
      padding: 0 0 6px 0;
      white-space: nowrap;
      font-size: 13px;
      height: 40px;

      span {
        width: 126px;
        display: inline-block;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        &:first-child {
          padding-left: 0px;
        }

        &:last-child {
          border-right: none;
        }
      }
    }
  }
  .borfer {
    position: absolute;
    top: 0;
    height: 100%;
    width: 1px;
    background-color: #eee;
  }
}
::-webkit-scrollbar {
  width: 8px;
  height: 6px;
  background-color: #fff;
}
::-webkit-scrollbar-thumb {
  background-color: #ececec;
  border-radius: 3px;
}
</style>
