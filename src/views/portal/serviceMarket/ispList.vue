<template>
  <div class="box">
    <div class="headers">
      <CResult
        @cleanType="cleanType"
        :typeList="allServiceList"
        :allCount="allCount"
      >
        <template #search>
          <CSearch @search="search"></CSearch>
        </template>
      </CResult>
      <CSelector
        :idList="allServiceTypes['服务类型'].activeIdList"
        @getTypeId="getTypeId"
        @cleanType="cleanType"
        :typeList="serviceTypeList"
        type="服务类型"
      ></CSelector>
      <CSelector
        :idList="allServiceTypes['服务品类'].activeIdList"
        @getTypeId="getTypeId"
        @cleanType="cleanType"
        :typeList="catTypeList"
        type="服务品类"
      ></CSelector>
      <CSelector type="服务区域" @cleanType="cleanType" :idList="areaIdList">
        <template #slot>
          <div class="change-adr">
            <a href="javascript:" class="t" @click="showAdr"
              >省市区县<i class="el-icon-arrow-down"></i
            ></a>
          </div>
          <CArea
            title="请选择服务区域"
            :defaultChecked="false"
            :multiple="true"
            :dialogVisible="dialogVisible"
            @confirmArea="confirmArea"
            :clear="true"
            :list="allAreaList"
            @updateVisible="updateVisible"
          ></CArea
        ></template>
      </CSelector>
      <div class="pro-sort">
        <a href="javascript:" @click="sortSet(1)" :class="{ on: sort == 1 }"
          >综合排序</a
        >
        <a href="javascript:" @click="sortSet(2)" :class="{ on: sort == 2 }"
          >服务订单数</a
        >
        <a href="javascript:" @click="sortSet(3)" :class="{ on: sort == 3 }"
          >网点数量</a
        >
        <a href="javascript:" @click="sortSet(4)" :class="{ on: sort == 4 }"
          >师傅数量</a
        >
        <a href="javascript:" @click="sortSet(5)" :class="{ on: sort == 5 }"
          >服务品牌数</a
        >
      </div>
    </div>
    <CLoading v-if="listLoading" />
    <div class="isp-list-box" v-else>
      <CNoData v-show="facilitator.length === 0" />
      <div class="i-list-wrap" v-if="facilitator.length">
        <div
          class="item"
          v-for="(items, key) in facilitator"
          :key="key"
          @click="infopage(items.userCode)"
        >
          <div class="img">
            <img
              v-if="items.facilitatorImg != null"
              :src="items.facilitatorImg"
            />
            <img v-else src="~@/assets/images/002.png" />
          </div>
          <div class="name">{{ items.facilitatorName }}</div>
          <div class="info">
            <div class="i-t">
              师傅数
              <b>{{ items.siteEngineerNum || 0 }}个</b>
            </div>
            <div class="i-t">
              网点数
              <b>{{ items.site || 0 }}个</b>
            </div>
            <div class="i-t">
              服务品牌数
              <b>{{ items.brandCount || 0 }}个</b>
            </div>
            <div class="i-t">
              服务订单数
              <b>{{ items.order || 0 }}个</b>
            </div>
          </div>
          <div class="type" v-if="items.popFlag == 1">
            <p>
              平台得分
              <span
                >准时完工率
                <b>{{
                  items.completionOrderRate == "0.00"
                    ? "-"
                    : items.completionOrderRate
                }}</b
                >{{ items.completionOrderRate == "0.00" ? "" : "%" }}
              </span>
              <span
                >预约及时率
                <b>{{
                  items.onTimeOrderRate == "0.00" ? "-" : items.onTimeOrderRate
                }}</b
                >{{ items.onTimeOrderRate == "0.00" ? "" : "%" }}
              </span>
              <span
                >差评率
                <b>{{
                  items.diffNumberRate == "0.00" ? "-" : items.diffNumberRate
                }}</b
                >{{ items.diffNumberRate == "0.00" ? "" : "%" }}
              </span>
            </p>
          </div>
          <div class="type">
            <dl>
              <dt>服务类型</dt>
              <dd
                :ref="(el) => serviceItemDomeList.push(el)"
                :style="{
                  height: serviceItemDomeListFlag[key] ? '30px' : 'auto',
                }"
              >
                <span
                  style="margin: 0;line-height: 28px"
                  v-if="!items.serviceType.length"
                  >暂无</span
                >
                <span
                  class="t"
                  v-for="(icons, i) in items.serviceType"
                  :key="i"
                >
                  {{ icons }}
                </span>
                <span
                  class="f-blue"
                  @click="operFoldType(key)"
                  @click.stop=""
                  v-if="serviceItemDomeListFlag[key]"
                  >展开<i class="el-icon-caret-bottom"></i
                ></span>
                <span
                  class="f-blue"
                  @click="operFoldType(key)"
                  @click.stop=""
                  v-if="
                    serviceItemDomeListClose[key] &&
                      !serviceItemDomeListFlag[key]
                  "
                  >收起<i class="el-icon-caret-top"></i
                ></span>
              </dd>
            </dl>
            <dl>
              <dt>服务品类</dt>
              <dd
                :ref="(el) => carItemDomeList.push(el)"
                :style="{
                  height: carItemDomeListFlag[key] ? '30px' : 'auto',
                }"
              >
                <span
                  style="margin: 0;line-height: 30px"
                  v-if="!items.itemCat.length"
                  >暂无</span
                >
                <a
                  href="javascript:"
                  ref="itemService"
                  v-for="(icons, i) in items.itemCat"
                  :key="i"
                >
                  <span class="t">{{ icons }}</span>
                </a>
              </dd>
              <span
                class="f-blue"
                @click="operFoldCar(key)"
                @click.stop=""
                v-if="carItemDomeListFlag[key]"
                >展开<i class="el-icon-caret-bottom"></i
              ></span>
              <span
                class="f-blue"
                @click="operFoldCar(key)"
                @click.stop=""
                v-if="carItemDomeListClose[key] && !carItemDomeListFlag[key]"
                >收起<i class="el-icon-caret-top"></i
              ></span>
            </dl>
          </div>
        </div>
      </div>
    </div>
    <div class="pages-box" v-show="allCount > 10">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="prev, pager, next,total, jumper"
        prev-text="上一页"
        next-text="下一页"
        :total="allCount"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script lang="ts" setup>
import api from "@/api/ispList";
import apis from "@/api/common";
import CResult from "@/components/CResult/index.vue";
import CSearch from "@/components/CSearch/index.vue";
import CSelector from "@/components/CSelector/index.vue";
import CArea from "@/components/CArea/index.vue";
import CLoading from "./components/listLoading.vue";
import CNoData from "./components/noData.vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import {
  onMounted,
  ref,
  reactive,
  computed,
  onBeforeUpdate,
  nextTick,
} from "vue";
import {
  TypeList,
  AreaType,
  AllServiceTypes,
  AllService,
  CatTypes,
  FacilitatorType,
  ServiceTypes,
} from "./service";
const store = useStore();
const router = useRouter();
const userCode = computed(() => store.state.user.userInfo.userCode);
const pageNo = ref<number>(1); // 页码
const dialogVisible = ref<boolean>(false); // 服务区域
const serviceTypeList = ref<TypeList[]>([]); // 服务类型
const catTypeList = ref<TypeList[]>([]); // 服务品类
const allCount = ref<number>(0); // 结果数量
const allAreaList = ref<AreaType[]>([]); // 全部地址
const sort = ref<number>(1); // 排序
const serverTypeId = ref<string>("");
const itemCatId = ref<string>("");
const areaId = ref<string>("");
const areaIdList = ref<number[]>([]);
const presentActiveType = ref<string>("");
const facilitatorName = ref<string>("");
const listLoading = ref<boolean>(false);
const facilitator = ref<FacilitatorType[]>([]);
const carItemDomeList = ref<any[]>([]);
const carItemDomeListClose = ref<boolean[]>([]);
const carItemDomeListFlag = ref<boolean[]>([]);
const serviceItemDomeList = ref<any[]>([]);
const serviceItemDomeListFlag = ref<boolean[]>([]);
const serviceItemDomeListClose = ref<boolean[]>([]);
const allServiceTypes = reactive<AllServiceTypes>({
  服务类型: {
    activeIdList: [],
    activeId: "",
    activeNmaeList: [],
    identity: "服务类型",
  },
  服务品类: {
    activeIdList: [],
    activeId: "",
    activeNmaeList: [],
    identity: "服务品类",
  },
});
const allServiceList = ref<AllService[]>([
  {
    title: "服务类型",
    avtiveName: "",
  },
  {
    title: "服务品类",
    avtiveName: "",
  },
  {
    title: "服务区域",
    avtiveName: "",
  },
]);
//搜索条件分类
function searchConditionData() {
  api.searchConditionData({}).then((res: any) => {
    const { data } = res;
    let serviceList: TypeList[] = [];
    let catList: TypeList[] = [];
    if (data.serviceTypeData.length) {
      data.serviceTypeData.forEach((item: ServiceTypes) => {
        serviceList.push({
          id: item.serviceTypeId,
          name: item.serviceTypeName,
        });
      });
      serviceTypeList.value = serviceList;
    }
    if (data.itemCatData.length) {
      data.itemCatData.forEach((item: CatTypes) => {
        catList.push({
          id: item.itemCatId,
          name: item.itemCatName,
        });
      });
      catTypeList.value = catList;
    }
  });
}
onMounted(() => {
  searchConditionData();
  getFacilitatorList();
});
// 搜索
function search(val: string) {
  facilitatorName.value = val;
  getFacilitatorList();
}
// 清除选中类型
function cleanType(type: string) {
  if (type !== "服务区域") {
    presentActiveType.value = type;
    allServiceTypes[type] = {
      activeIdList: [],
      activeId: "",
      activeNmaeList: [],
      identity: allServiceTypes[type].identity,
    };
  } else {
    areaIdList.value = [];
  }
  allServiceList.value.forEach((item: AllService) => {
    if (item.title === type) item.avtiveName = "";
  });
  getFacilitatorList();
}
// 获取选中的类型
function getTypeId(item: TypeList, type: string) {
  presentActiveType.value = type;
  const { id, name } = item;
  const presentType = allServiceTypes[type];
  const index = presentType.activeIdList.indexOf(id);
  if (index != -1) {
    presentType.activeIdList.splice(index, 1);
    presentType.activeNmaeList.splice(index, 1);
  } else {
    presentType.activeIdList.push(id);
    presentType.activeNmaeList.push(name);
  }
  presentType.activeId = presentType.activeIdList.join(",");
  allServiceList.value.forEach((item: AllService) => {
    if (item.title === type) {
      item.avtiveName = presentType.activeNmaeList.join(",");
    }
  });
  getFacilitatorList();
}

//排序设置
function sortSet(sortId: number) {
  sort.value = sortId;
  getFacilitatorList();
}
// 获取服务商列表
function getFacilitatorList() {
  listLoading.value = true;
  // 有类型时根据类型取值
  if (presentActiveType.value) {
    const presentType = allServiceTypes[presentActiveType.value];
    switch (presentType.identity) {
      case "服务类型":
        serverTypeId.value = presentType.activeId;
        break;
      case "服务品类":
        itemCatId.value = presentType.activeId;
        break;
    }
  }
  const obj = {
    facilitatorName: facilitatorName.value,
    serverTypeId: serverTypeId.value,
    itemCatId: itemCatId.value,
    userCode: userCode.value,
    pageNo: pageNo.value,
    sort: sort.value,
    areaId: areaId.value,
  };
  api
    .searchFacilitator(obj)
    .then((res: any) => {
      listLoading.value = false;
      const { data } = res;
      // 如果data 为null return 防止控制台报错
      if (!data || !data.userResources) {
        allCount.value = 0;
        facilitator.value = [];
        return;
      }
      allCount.value = data.total;
      facilitator.value = data.userResources || [];
      initItemServiceList();
    })
    .catch(() => {
      listLoading.value = false;
    });
}
function updateVisible(val: boolean) {
  dialogVisible.value = val;
}
onBeforeUpdate(() => {
  carItemDomeList.value = [];
  serviceItemDomeList.value = [];
});
function initItemServiceList() {
  const list: number[] = [];
  const serviceList: number[] = [];
  nextTick(() => {
    carItemDomeList.value.forEach((e) => {
      list.push(e.offsetHeight / 30);
      carItemDomeListClose.value.push(false);
    });
    list.forEach((i) => {
      i > 1
        ? carItemDomeListFlag.value.push(true)
        : carItemDomeListFlag.value.push(false);
    });
    serviceItemDomeList.value.forEach((e) => {
      serviceList.push(e.offsetHeight / 30);
      serviceItemDomeListClose.value.push(false);
    });
    serviceList.forEach((i) => {
      i > 1
        ? serviceItemDomeListFlag.value.push(true)
        : serviceItemDomeListFlag.value.push(false);
    });
  });
}
// 确认地址;
function confirmArea(list: AreaType[]) {
  dialogVisible.value = false;
  const arr = list.map((item) => item.name);
  areaIdList.value = list.map((item) => item.jdAreaId);
  areaId.value = areaIdList.value.join(",");
  let text = "";
  arr.forEach((item, index) => {
    if (index == arr.length - 1) {
      text += item;
    } else {
      text += item + "，";
    }
  });
  allServiceList.value.forEach((item) => {
    if (item.title === "服务区域") item.avtiveName = text;
  });
  getFacilitatorList();
}

//显示地区
function showAdr() {
  apis.getProvinceList({}).then((res: any) => {
    allAreaList.value = res.data;
    dialogVisible.value = true;
  });
}
// 翻页
function handleCurrentChange(val: number) {
  pageNo.value = val;
  getFacilitatorList();
}
//跳转详情页
function infopage(userCode: string) {
  router.push({
    path: "/ispIndex",
    query: {
      providerUserCode: userCode,
    },
  });
}
function operFoldCar(index: number) {
  const flag = carItemDomeListFlag.value[index];
  carItemDomeListFlag.value.splice(index, 1, !flag);
  carItemDomeListClose.value.splice(index, 1, !flag);
}
function operFoldType(index: number) {
  const flag = serviceItemDomeListFlag.value[index];
  serviceItemDomeListFlag.value.splice(index, 1, !flag);
  serviceItemDomeListClose.value.splice(index, 1, !flag);
}
</script>
<style scoped lang="scss">
.box {
  width: 1200px;
  margin: auto;
  margin-top: 10px;
  .headers {
    background-color: #fff;
    padding: 0px 10px;
  }
}
/deep/ .dialog-box .el-dialog__body {
  padding-top: 0;
}
.type {
  span {
    margin-right: 20px;
    color: #333;
    b {
      font-weight: 500;
      font-size: 14px;
      color: #000;
    }
  }
  span:nth-child(1) {
    margin-left: 20px;
  }
}
.change-adr {
  display: inline-block;

  .c {
    display: none;
    position: absolute;
    background: #fff;
    left: 0;
    width: 601px;
    border: solid 1px #f9d4d2;
    padding: 16px;
    border-radius: 2px;
    top: 21px;
    z-index: 2;

    .adr-tab {
      border-bottom: solid 2px $red-color;
      overflow: hidden;

      a {
        border: solid 1px $border-color;
        float: left;
        border-bottom: none;
        margin-right: 6px;
        height: 22px;
        line-height: 22px;
        padding: 0 10px;
        border-radius: 3px 3px 0 0;

        &.on {
          background: $red-color;
          color: $white-color;
          border-color: $red-color;
        }
      }
    }

    .adr-cont > div {
      padding: 14px 8px 0;

      .a-item {
        width: 110px;
        display: inline-block;
        cursor: pointer;
        font-size: 12px;

        label {
          margin-right: 4px;
        }
      }
    }

    .btns {
      text-align: right;
      margin-top: 10px;

      .btn {
        padding: 6px 20px;
        font-size: 12px;
        border-radius: 2px;
      }
    }
  }

  &.on .t {
    border: solid 1px #f9d4d2;
    border-bottom-color: #fff;
    position: relative;
    z-index: 3;

    .el-icon-arrow-down {
      transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
      -o-transform: rotate(180deg);
    }
  }

  &.on .c {
    display: block;
  }
}
.pro-sort {
  border-top: solid 1px #eee;
  overflow: hidden;
  padding: 14px 0;
  line-height: 25px;

  a:last-child {
    border-right: none;
  }

  a {
    padding: 0 10px;
    float: left;
    border-right: solid 1px #ccc;
    background: #f2f2f2;

    &:after {
      content: "";
      width: 20px;
      height: 20px;
      background: url(~@/assets/images/ico-sort.png) no-repeat center;
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 3px;
      background-size: cover;
    }

    &.on {
      background: $red-color;
      color: $white-color;
    }

    &.on:hover {
      background: $red-color;
      color: $white-color;
    }

    &.on:after {
      background-image: url(~@/assets/images/ico-sort_on.png) !important;
    }

    &:hover {
      color: $red-color;
    }

    &:hover:after {
      background-image: url(~@/assets/images/ico-sort_hover.png);
    }
  }
}
.isp-list-box {
  min-height: calc(100vh - 561px);
  margin: 12px 0 50px;

  .item {
    background: $white-color;
    padding: 20px 20px 20px 214px;
    margin-bottom: 12px;
    position: relative;
    min-height: 200px;
    cursor: pointer;

    &:hover {
      box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
    }

    &:hover .name {
      color: $red-color;
    }

    .img {
      width: 160px;
      height: 160px;
      position: absolute;
      top: 20px;
      left: 20px;
      border-radius: 8px;
      overflow: hidden;
    }

    .name {
      font-size: 16px;
      font-weight: 600;
      margin-top: 8px;
      min-height: 24px;
    }

    .info {
      margin-top: 12px;

      .i-t {
        margin-right: 12px;
        color: #888;
        display: inline-block;

        b {
          font-size: 14px;
          color: #000;
          font-weight: 400;
        }
      }
    }

    .type {
      margin-top: 12px;

      dl {
        margin-top: 12px;
        display: -moz-box;
        display: -webkit-box;
        display: box;
        position: relative;

        dt {
          min-width: 70px;
          padding-top: 2px;
        }

        dd {
          width: 840px;
          overflow: hidden;
          height: 30px;

          .t {
            border: solid 1px rgba(0, 0, 0, 0.25);
            height: 20px;
            line-height: 18px;
            border-radius: 20px;
            display: inline-block;
            padding: 0 8px;
            margin: 5px 12px 5px 0;
          }
        }

        .f-blue {
          position: absolute;
          right: 0px;
          top: 2px;
          margin-right: 0;
        }
      }
    }
  }
}
.pages-box {
  margin-bottom: 52px;
  /deep/ .el-pagination {
    text-align: center;
    span,
    button {
      height: 38px;
      line-height: 36px;
      font-size: 14px;

      &:hover {
        color: $red-color;
      }
    }

    .btn-next,
    .btn-prev {
      width: 86px;
      height: 38px;
      line-height: 36px;
      border: solid 1px $border-color;
      margin: 0 4px;
      padding: 0 12px;

      &:disabled:hover span {
        color: #c0c4cc;
      }

      &.btn-next:after {
        content: ">";
        width: 16px;
        height: 16px;
        display: inline-block;
        font-family: cursive;
        margin-left: 2px;
      }

      &.btn-prev:before {
        content: "<";
        width: 16px;
        height: 16px;
        display: inline-block;
        font-family: cursive;
        margin-right: 2px;
      }
    }

    li,
    .el-input__inner {
      height: 38px;
      width: 38px;
      line-height: 36px;
      border: solid 1px $border-color;
      margin: 0 4px;
      font-size: 14px;
      font-weight: 400;

      &.active {
        background: none;
        border: none;
        color: $red-color;
      }

      &:hover {
        color: $red-color;
      }
    }

    .el-pagination__total {
      line-height: 38px;
      margin-left: 20px;
    }

    .el-pagination__jump {
      margin-left: 10px;
    }
  }
}
</style>
