<!--
 * @Author: sjp
 * @Date: 2021-06-10 14:17:01
 * @LastEditTime: 2021-08-05 17:55:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\components\CArea\index.vue
-->
<template>
  <div class="area">
    <el-dialog
      width="728px"
      :title="title"
      :model-value="dialogVisible"
      :before-close="cancel"
      :close-on-click-modal="false"
      custom-class="dialog-box"
    >
      <div class="title" v-if="clear">
        <p>省份</p>
        <p>城市</p>
        <p>区域</p>
        <p>乡镇</p>
      </div>
      <div class="cont">
        <div>
          <p v-if="multiple">
            <el-checkbox
              class="no-label check-blue"
              v-model="allChecked"
            ></el-checkbox
            ><span>全部</span>
          </p>
          <p
            v-for="(item, index) in provinceList"
            :key="index"
            :class="provinceActive === item.jdAreaId && 'active'"
          >
            <el-checkbox
              class="no-label check-blue"
              v-if="multiple"
              v-model="item.checked"
              :key="item && item.jdAreaId"
              :indeterminate="item.isIndeterminate"
              @change="handleChecked(4, item)"
            ></el-checkbox
            ><span @click="getAreaList(4, item)">{{
              item.name || item.label
            }}</span>
          </p>
        </div>
        <div v-if="cityList.length">
          <p
            v-for="(item, index) in cityList"
            :key="index"
            :class="cityActive === item.jdAreaId && 'active'"
          >
            <el-checkbox
              class="no-label check-blue"
              v-if="multiple"
              v-model="item.checked"
              :key="item && item.jdAreaId"
              :indeterminate="item.isIndeterminate"
              @change="handleChecked(5, item)"
            ></el-checkbox
            ><span @click="getAreaList(5, item)">{{
              item.name || item.label
            }}</span>
          </p>
        </div>
        <div v-if="countyList.length">
          <p
            v-for="(item, index) in countyList"
            :key="index"
            :class="countyListActive === item.jdAreaId && 'active'"
          >
            <el-checkbox
              class="no-label check-blue"
              v-if="multiple"
              v-model="item.checked"
              :key="item && item.jdAreaId"
              :indeterminate="item.isIndeterminate"
              @change="handleChecked(6, item)"
            ></el-checkbox
            ><span @click="getAreaList(6, item)">{{
              item.name || item.label
            }}</span>
          </p>
        </div>
        <div v-if="townList.length">
          <p
            v-for="(item, index) in townList"
            :key="index"
            :class="townActive === item.jdAreaId && 'active'"
          >
            <el-checkbox
              class="no-label check-blue"
              v-if="multiple"
              :key="item && item.jdAreaId"
              v-model="item.checked"
              @change="handleChecked(7, item)"
            ></el-checkbox
            ><span @click="getAreaList(7, item)">{{
              item.name || item.label
            }}</span>
          </p>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <button @click="cancel" v-show="multiple" class="lbtn-gray btn">
            取 消
          </button>
          <button
            v-if="clear"
            @click="cancelBtn"
            v-show="multiple"
            class="lbtn-gray btn"
          >
            清 空
          </button>
          <button @click="confirmArea()" class="btn-red btn">
            确 定
          </button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import api from "@/api/common";
import { defineProps, ref, computed, defineEmits, watch } from "vue";
import { ElMessage } from "element-plus";
import { AreaType } from "@/views/portal/serviceMarket/service";
interface ProvinceListType {
  checked?: boolean;
  isIndeterminate?: boolean;
  jdAreaId: number;
  name?: string;
  label?: string;
  children?: ProvinceListType[];
  pid?: number;
}
const props = defineProps({
  dialogVisible: Boolean,
  multiple: {
    type: Boolean,
    default: false, // 是否多选
  },
  title: {
    type: String,
    default: "",
  },
  defaultChecked: {
    type: Boolean,
    default: true, // 初始是否选择
  },
  clear: {
    type: Boolean,
    default: false, // 清除
  },
  unfold: {
    type: Boolean,
    default: false, // 展开第一级
  },
  list: {
    default: (): ProvinceListType[] => [],
  },
  index: {
    default: Number,
  },
  preStore: {
    default: (): AreaType[] => [],
  },
});
const emit = defineEmits(["confirmArea", "updateVisible"]);
const indexes = ref<number>(0);
let provinceList = ref<ProvinceListType[]>([]);
let cityList = ref<ProvinceListType[]>([]);
let countyList = ref<ProvinceListType[]>([]);
let townList = ref<ProvinceListType[]>([]);
let provinceActive = ref<number>();
let cityActive = ref<number>();
let countyListActive = ref<number>();
let townActive = ref<number>();
const allChecked = computed({
  get: () => {
    const leng = provinceList.value.filter((i) => i.checked);
    return leng.length == provinceList.value.length && leng.length > 0;
  },
  set: (newVal) => {
    recursionSetChecked(provinceList.value, newVal);
    cityList.value = [];
    countyList.value = [];
    townList.value = [];
  },
});
// 递归设置选中
function recursionSetChecked(
  list: ProvinceListType[],
  val: boolean | undefined
) {
  list.forEach((item) => {
    item.checked = val;
    item.isIndeterminate = false;
    if (hasChildren(item))
      recursionSetChecked(item.children as ProvinceListType[], val);
  });
}
// 是否有children，children 为数组并且数组长度>0
function hasChildren(list: ProvinceListType | undefined) {
  return list && list.children && list.children.length > 0;
}
watch(
  () => props.dialogVisible,
  (newVal) => {
    newVal && initArea();
  }
);
// 初始化
function initArea() {
  indexes.value = props.index;
  if (props.preStore.length) {
    provinceList.value = props.preStore;
    return;
  }
  recursionSetChecked(props.list, props.defaultChecked);
  provinceList.value = props.list;
  if (props.unfold && hasChildren(provinceList.value[0])) {
    recursionUnfold(provinceList.value);
  }
}
// 自动展开第一列
function recursionUnfold(list: ProvinceListType[]) {
  if (hasChildren(list[0])) {
    getAreaList(4, list[0]);
    if (list[0].children && hasChildren(list[0].children[0])) {
      getAreaList(5, list[0].children[0]);
      if (
        list[0].children[0].children &&
        hasChildren(list[0].children[0].children[0])
      ) {
        getAreaList(6, list[0].children[0].children[0]);
      }
    }
  }
}
// 点击节点获取子级
function getAreaList(index: number, item: ProvinceListType) {
  switch (index) {
    case 4:
      provinceActive.value = item.jdAreaId;
      countyList.value = [];
      townList.value = [];
      getAreaChildren(item, index);
      break;
    case 5:
      townList.value = [];
      cityActive.value = item.jdAreaId;
      getAreaChildren(item, index);
      break;
    case 6:
      countyListActive.value = item.jdAreaId;
      getAreaChildren(item, index);
      break;
    case 7:
      townActive.value = item.jdAreaId;
  }
}
function getAreaChildren(item: ProvinceListType, index: number) {
  let isChildren = hasChildren(item);
  if (isChildren) {
    setAreaChildren(index, item.children as ProvinceListType[]);
    return;
  }
  if (!isChildren) {
    getChildList(item).then((data: ProvinceListType[]) => {
      if (data) {
        item.children = data;
        setAreaChildren(index, item.children);
      }
    });
  }
}
// 设置对应子级
function setAreaChildren(index: number, data: ProvinceListType[]) {
  switch (index) {
    case 4:
      cityList.value = data;
      break;
    case 5:
      countyList.value = data;
      break;
    case 6:
      townList.value = data;
      break;
  }
}
// 请求接口获取子级
async function getChildList(item: ProvinceListType) {
  const list: any = await api.getAreaList({ parent: item.jdAreaId });
  if (list.data.length) {
    list.data.forEach((d: ProvinceListType) => {
      d.checked = item.checked;
      d.pid = item.jdAreaId;
    });
    return list.data;
  }
}
/**
 * 4  省
 * 5  市
 * 6  县区
 * 7  乡镇
 */
// 选中节点时
function handleChecked(index: number, val: ProvinceListType) {
  if (index === 4) {
    countyList.value = [];
    townList.value = [];
  }
  if (val.checked) val.isIndeterminate = false;
  if (hasChildren(val)) {
    recursionSetChecked(val.children as ProvinceListType[], val.checked);
  }
  if (val.pid) {
    switch (index) {
      case 5:
        townList.value = [];
        // 修改省级列表
        getParentList(val, provinceList.value);
        break;
      case 6:
        {
          // 修改市级列表
          const cityItem = getParentList(val, cityList.value);
          // 修改省级列表
          getParentList(cityItem, provinceList.value);
        }
        break;
      case 7:
        {
          // 修改县级列表
          const countyItem = getParentList(val, countyList.value);
          // 修改市级列表
          const cityItem = getParentList(countyItem, cityList.value);
          // 修改省级列表
          getParentList(cityItem, provinceList.value);
        }
        break;
    }
  }
}
// 寻找对应父级
function getParentList(val: ProvinceListType, list: ProvinceListType[]) {
  let parentItem;
  for (let i = 0, j = list.length; i < j; i++) {
    const item = list[i];
    if (val.pid === item.jdAreaId) {
      parentItem = item;
      setParent(item);
    }
  }
  return parentItem as ProvinceListType;
}
// 设置父级状态
function setParent(item: ProvinceListType) {
  if (!item.children) return;
  const leng = item.children.filter((i: ProvinceListType) => i.checked);
  const indetLeng = item.children.filter(
    (i: ProvinceListType) => i.isIndeterminate
  );
  if (leng.length === item.children.length) {
    item.checked = true;
    item.isIndeterminate = false;
  } else {
    item.checked = false;
    item.isIndeterminate = true;
  }
  if (!leng.length && !indetLeng.length) {
    item.checked = false;
    item.isIndeterminate = false;
    return;
  }
}
// 过滤选中的节点
function recursionChecked(arr: ProvinceListType[], list: ProvinceListType[]) {
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (props.clear) {
      if (item.checked) {
        arr.push(item);
        continue;
      }
      if (item.isIndeterminate) {
        if (hasChildren(item))
          recursionChecked(arr, item.children as ProvinceListType[]);
      }
    } else {
      if (item.checked && !hasChildren(item)) {
        arr.push(item);
      } else {
        if (hasChildren(item))
          recursionChecked(arr, item.children as ProvinceListType[]);
      }
    }
  }
}
function cancel() {
  cityList.value = [];
  countyList.value = [];
  townList.value = [];
  emit("updateVisible", false);
}
function cancelBtn() {
  cityList.value = [];
  countyList.value = [];
  townList.value = [];
  provinceList.value.forEach((item) => {
    item.checked = false;
    item.isIndeterminate = false;
  });
}
function confirmArea() {
  cityList.value = [];
  countyList.value = [];
  townList.value = [];
  // 非多选直接关闭
  if (!props.multiple) {
    emit("updateVisible", false);
    return;
  }
  let arr: ProvinceListType[] = [];
  recursionChecked(arr, provinceList.value);
  if (!props.clear && props.multiple && !arr.length) {
    ElMessage({
      center: true,
      duration: 2000,
      message: "至少选择一个服务区域",
    });
    return;
  }
  emit("confirmArea", arr, indexes.value, provinceList.value);
  // 如果有清空按钮，则在每次点击确定之后清空选项
  if (props.clear) {
    cancelBtn();
  }
}
</script>
<style scoped lang="scss">
.area {
  /deep/ .el-dialog__footer {
    padding-top: 20px;
  }
}
.title {
  display: flex;
  margin-top: 10px;
  p {
    margin-left: 12px;
    width: 153px;
    text-align: center;
    margin-bottom: -10px;
  }
}
.cont {
  margin-top: 20px;
  min-height: 228px !important;
  display: flex;
  .item {
    width: 153px;
    padding: 0 4px;
  }
  div {
    margin-left: 12px;
    width: 153px;
    height: 222px;
    overflow: auto;
    padding: 8px 0;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
    p {
      display: flex;
      height: 28px;
      line-height: 28px;
      font-size: 12px;
      padding-left: 12px;
      cursor: pointer;
      /deep/ .el-checkbox {
        line-height: 28px;
      }
    }
    .active {
      background-color: #e1251b;
      color: #fff;
    }
    span {
      margin-left: 12px;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  div:last-child {
    margin-right: 12px;
  }
  div::-webkit-scrollbar {
    width: 8px;
  }
  div::-webkit-scrollbar-track {
    background-color: #fff;
  }
  div::-webkit-scrollbar-thumb {
    background-color: #e9e9e9;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
  }
  div::-moz-scrollbar {
    width: 8px;
  }
  div::-moz-scrollbar-track {
    background-color: #fff;
  }
  div::-moz-scrollbar-thumb {
    background-color: #e9e9e9;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
  }
}
</style>
