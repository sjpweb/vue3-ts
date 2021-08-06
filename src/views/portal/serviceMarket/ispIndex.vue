<template>
  <div class="box">
    <div class="isp-info">
      <div class="tit">{{ facilitatorInfo.facilitatorName }}</div>
      <div class="data">
        <div class="d-item">
          <i class="ico i-01"></i>服务订单数<b>{{ facilitatorInfo.order }}</b>
        </div>
        <div class="d-item">
          <i class="ico i-02"></i>网点数<b>{{ facilitatorInfo.site }}</b>
        </div>
        <div class="d-item">
          <i class="ico i-03"></i>师傅数<b>{{
            facilitatorInfo.siteEngineer
          }}</b>
        </div>
        <div class="d-item">
          <i class="ico i-04"></i>服务品牌数<b>{{ facilitatorInfo.buyer }}</b>
        </div>
      </div>
      <div class="i-tips-box">
        <div class="t">质量承诺</div>
        <div class="c">
          <p>
            安装：预约及时率不低于<b
              >{{ facilitatorInfo.installTimelyAppointRate || 95 }}%</b
            >
            ; 准时完工率不低于<b
              >{{ facilitatorInfo.installOntimeCompleteRate || 95 }}%</b
            >
            ; 差评率不高于<b
              >{{ facilitatorInfo.installPoorEvaluationRate || 1.5 }}%</b
            >
          </p>
        </div>
      </div>
      <div class="i-tips-box" v-if="facilitatorInfo.facilitatorSettleInfo">
        <div class="t">结算说明</div>
        <div class="c">
          <p>{{ facilitatorInfo.facilitatorSettleInfo }}</p>
        </div>
      </div>
    </div>
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
    </div>
    <CLoading v-if="listLoading" />
    <div class="service-list" v-else>
      <CNoData v-show="suServerList.length === 0" />
      <div class="list">
        <el-checkbox-group v-model="checkedCities">
          <label class="item" v-for="(items, key) in suServerList" :key="key">
            <el-checkbox
              v-model="items.suId"
              :label="items.suId"
              key="key"
              v-if="userFlag"
              class="no-label"
            ></el-checkbox>
            <img :src="items.suImg || suImg" class="img" />
            <div class="name">
              <p class="title">
                {{ items.suName }}
                <span class="price">¥{{ items.suPrice }}</span>
              </p>
            </div>
            <div class="infoList">
              <p>
                <span class="i-t">服务区域：</span>
                <span
                  style="cursor: pointer"
                  @click.prevent="openArea(items.skuAreaDtoList)"
                  class="severArea"
                >
                  <span>
                    {{ filterArea(items) }}
                  </span>
                  <a
                    href="javascript:"
                    class="f-blue ico"
                    v-if="facilitatorInfo.popFlag === 2"
                  >
                    <i class="el-icon-edit-outline"></i>
                  </a>
                  <span v-else>
                    <i class="el-icon-arrow-right"></i>
                  </span>
                </span>
              </p>
              <p class="infos">
                <span @click.prevent="openClassify(items.suId)">更多属性</span>
                <i class="el-icon-d-arrow-right"></i>
              </p>
              <p v-if="items.suOrderNum">
                <span class="i-t">预计服务单量：</span
                >{{ items.suOrderNum }}单/天
              </p>
              <p v-else><span class="i-t">预计服务单量：</span>暂无</p>
              <p>
                <span class="i-t">服务说明：</span
                >{{ items.suRemark || "暂无" }}
              </p>
            </div>
          </label>
        </el-checkbox-group>
      </div>
      <CArea
        :unfold="true"
        title="查看服务区域"
        :multiple="false"
        :dialogVisible="seeDialogVisible"
        @confirmArea="seeConfirmArea"
        :list="serverAreaList"
        @updateVisible="seeUpdateVisible"
      ></CArea>
      <CAttrDialog
        :dialogVisible="dialogClassifyBox"
        :productAttributeData="productAttributeData"
        @upData="upData"
      ></CAttrDialog>
      <div
        class="isp isp-fixed-bottom"
        :style="{ opacity: offsetClass ? 0 : 1 }"
        v-if="userFlag"
        v-show="suServerList.length !== 0"
      >
        <div class="w">
          <div class="fl">
            <el-checkbox name="allCheck" v-model="checkAll">全选</el-checkbox>
          </div>
          <div class="fr">
            <span
              >已选<b class="f-red">{{ checkedCities.length }}</b
              >件服务</span
            >
            <button @click="ispSign" class="btn-red btn">提交订单</button>
          </div>
        </div>
      </div>
      <div
        class="isp isp-bottom"
        :style="{ opacity: offsetClass ? 1 : 0 }"
        v-if="userFlag"
        v-show="suServerList.length !== 0"
      >
        <div class="w">
          <div class="fl">
            <el-checkbox name="allCheck" v-model="checkAll">全选</el-checkbox>
          </div>
          <div class="fr">
            <span
              >已选<b class="f-red">{{ checkedCities.length }}</b
              >件服务</span
            >
            <button @click="ispSign" class="btn-red btn">提交订单</button>
          </div>
        </div>
      </div>
      <div class="gotop" v-show="goTopBtn" @click="goTop">
        <span>顶部</span>
        <i class="el-icon-arrow-up"></i>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import api from "@/api/ispIndex";
import apis from "@/api/common";
import CResult from "@/components/CResult/index.vue";
import CSearch from "@/components/CSearch/index.vue";
import CSelector from "@/components/CSelector/index.vue";
import CArea from "@/components/CArea/index.vue";
import CLoading from "./components/listLoading.vue";
import CNoData from "./components/noData.vue";
import CAttrDialog from "./components/attrDialog.vue";
import suImg from "@/assets/images/002.png";
import { useStore } from "@/store";
import { useRouter, useRoute } from "vue-router";
import { onMounted, ref, reactive, computed, nextTick, watch } from "vue";
import {
  TypeList,
  AreaType,
  FacilitatorInfoType,
  AllServiceTypes,
  AllService,
  CatTypes,
  UpDataType,
  serviceTypes,
  ServiceTypes,
  ProductAttributeType,
} from "./service";
const store = useStore();
const router = useRouter();
const route = useRoute();
const dialogVisible = ref<boolean>(false);
const serviceTypeList = ref<TypeList[]>([]);
const catTypeList = ref<TypeList[]>([]);
const allCount = ref<number>(0);
const seeDialogVisible = ref<boolean>(false);
const dialogClassifyBox = ref<boolean>(false);
const allAreaList = ref<AreaType[]>([]);
const serverAreaList = ref<AreaType[]>([]);
const areaId = ref<string>("");
const areaIdList = ref<number[]>([]);
const suName = ref<string>("");
const itemCatId = ref<string>("");
const serverTypeId = ref<string>("");
const suServerList = ref<serviceTypes[]>([]);
const checkedCities = ref<number[]>([]);
const userFlag = ref<boolean>(false);
const goTopBtn = ref<boolean>(false);
const productAttributeData = ref<ProductAttributeType[]>([]);
const offsetClass = ref<boolean>(false);
const facilitatorInfo = ref<FacilitatorInfoType>({
  facilitatorName: "",
  order: 0,
  site: 0,
  siteEngineer: 0,
  buyer: 0,
  installTimelyAppointRate: 0,
  installOntimeCompleteRate: 0,
  installPoorEvaluationRate: 0,
  facilitatorSettleInfo: "",
  popFlag: 0,
});
const presentActiveType = ref<string>("");
const facilitatorName = ref<string>("");
const listLoading = ref<boolean>(false);
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
onMounted(() => {
  getSuData();
  getFacilitatorInfo();
  getServiceList();
  isFacilitator();
  window.addEventListener("scroll", handleScroll, true);
});
//SU类型数据
function getSuData() {
  const userCode = route.query.providerUserCode;
  api.serviceItem({ userCode }).then((res: any) => {
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
//判断当前用户，用于前端样式转换
function isFacilitator() {
  const userType = store.state.user.userInfo.userType;
  if (userType === 1) userFlag.value = true;
  if (userType === 2) userFlag.value = false;
}
//获取服务列表
function getServiceList() {
  listLoading.value = true;
  const userCode = route.query.providerUserCode as string;
  const obj: UpDataType = {
    userCode: userCode,
  };
  // 此接口 如果内容为''，不传递参数，后台逻辑处理需要
  serverTypeId.value && (obj.serverTypeId = serverTypeId.value);
  itemCatId.value && (obj.itemCatId = itemCatId.value);
  suName.value && (obj.suName = suName.value);
  areaId.value && (obj.areaId = areaId.value);
  api
    .searchSU(obj)
    .then((res: any) => {
      const suList = res.data;
      allCount.value = suList.length;
      suServerList.value = suList;
      listLoading.value = false;
      document.documentElement.scrollTop = 0;
      const timer = setTimeout(() => {
        document.documentElement.scrollTop = 1;
        clearTimeout(timer);
      }, 300);
    })
    .catch(() => {
      listLoading.value = false;
    });
}
// 搜索
function search(val: string) {
  facilitatorName.value = val;
  getServiceList();
}
function upData(val: boolean) {
  dialogClassifyBox.value = val;
}
function filterArea(items: serviceTypes) {
  if (items.wholeNation) {
    return "全国";
  }
  let list = items.skuAreaDtoList || [];
  if (list.length > 10) {
    list = list.slice(0, 10);
    return list.map((item) => item.label).join(",") + "...";
  } else {
    return list.map((item) => item.label).join(",");
  }
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
  getServiceList();
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
  getServiceList();
}
//服务商信息
function getFacilitatorInfo() {
  const userCode = route.query.providerUserCode;
  api.facilitatorData({ userCode }).then((res: any) => {
    facilitatorInfo.value = res.data;
  });
}
function updateVisible(val: boolean) {
  dialogVisible.value = val;
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
  getServiceList();
}
function seeUpdateVisible(val: boolean) {
  seeDialogVisible.value = val;
}
function seeConfirmArea() {
  seeDialogVisible.value = false;
}
//显示地区
function showAdr() {
  apis.getProvinceList({}).then((res: any) => {
    allAreaList.value = res.data;
    dialogVisible.value = true;
  });
}
//滚动最下
function handleScroll() {
  let pageHeight = document.body.clientHeight,
    scrollTop = document.documentElement.scrollTop,
    winHeight = document.documentElement.clientHeight,
    thresold = pageHeight - winHeight - 200;
  scrollTop > 500 ? (goTopBtn.value = true) : (goTopBtn.value = false);
  if (thresold < scrollTop) {
    offsetClass.value = true;
  } else {
    offsetClass.value = false;
  }
}
// 查看地址
function openArea(list: AreaType[]) {
  serverAreaList.value = list;
  seeDialogVisible.value = true;
}
// 更多属性
function openClassify(suId: number) {
  api.findProductAttribute({ suId }).then((res: any) => {
    productAttributeData.value = res.data;
    dialogClassifyBox.value = true;
  });
}
function goTop() {
  document.documentElement.scrollTop = 0;
}
// 全选
const checkAll = computed({
  get: () => {
    return checkedCities.value.length == suServerList.value.length;
  },
  set: (newVal) => {
    if (newVal) {
      const list = suServerList.value.map((item) => item.suId);
      checkedCities.value = list;
    } else {
      checkedCities.value = [];
    }
  },
});
//提交
function ispSign() {
  let suIds = "";
  checkedCities.value.forEach((item) => (suIds += item + ","));
  router.push({
    path: "/ispSign",
    query: {
      providerUserCode: route.query.providerUserCode,
      suIds: suIds,
    },
  });
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
  /deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #e1251b !important;
  }
  /deep/ .el-checkbox__label {
    display: none;
  }
  /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    border-color: #e1251b !important;
    background-color: #e1251b !important;
  }
  /deep/ .el-checkbox__inner:hover {
    border-color: #e1251b !important;
  }
}
.isp-info {
  background-color: #fff;
  padding: 16px 16px 22px 16px;
  margin-top: 12px;
  margin-bottom: 10px;
  .tit {
    color: #000;
    font-size: 20px;
    margin: 10px 0 0 10px;
    font-weight: 600;
  }
  .data {
    padding: 24px 0 0;
    .d-item {
      padding: 0 44px;
      border-right: solid 1px rgba(0, 0, 0, 0.1);
      color: #262626;
      display: inline-block;
      font-size: 15px;

      &:last-child {
        border-right: none;
      }
      .ico {
        width: 16px;
        height: 16px;
        display: inline-block;
        vertical-align: sub;
        background: no-repeat center;
        margin-bottom: 1px;
        margin-right: 5px;
        background-size: contain;

        &.i-01 {
          background-image: url(~@/assets/images/ico-isp01.png);
        }

        &.i-02 {
          background-image: url(~@/assets/images/ico-isp04.png);
        }

        &.i-03 {
          background-image: url(~@/assets/images/ico-isp02.png);
        }

        &.i-04 {
          background-image: url(~@/assets/images/ico-isp03.png);
        }
      }
      b {
        color: $red-color;
        font-size: 26px;
        vertical-align: sub;
        margin-left: 10px;
        font-weight: 400;
      }
    }
  }

  .i-tips-box {
    margin: 28px 0 0;
    .t {
      font-size: 15px;
      line-height: 12px;
      height: 12px;
      border-left: solid 3px $red-color;
      padding-left: 10px;
      margin-bottom: 10px;
      margin-left: 8px;
      font-weight: 600;
    }
    .c {
      padding: 0 58px 0 32px;
      color: $text-dgray-color;
    }
  }
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
.service-list {
  .list {
    margin-bottom: 24px;
  }
  .item {
    background-color: #fff;
    border-top: solid 1px #f0f0f0;
    padding: 36px 40px 36px 192px;
    position: relative;
    display: block;
    .el-checkbox {
      position: absolute;
      left: 12px;
      top: 50%;
      margin-top: -12px;
    }
    .img {
      width: 135px;
      height: 135px;
      position: absolute;
      left: 40px;
      border-radius: 8px;
      top: 30px;
    }
    .name {
      font-size: 15px;
      color: #000;
      margin-bottom: 10px;
      margin-top: 4px;
      display: flex;
      p {
        max-width: 880px;
      }
      .price {
        margin-left: 14px;
        font-weight: 600;
      }
    }
    .infos {
      cursor: pointer;
      position: absolute;
      right: 50px;
      top: 42px;
      font-size: 12px;
      img {
        margin-left: 6px;
        vertical-align: middle;
      }
    }
    .infoList {
      color: #151515;

      p {
        font-size: 12px;
        overflow: hidden;
        padding-top: 3px;
        line-height: 1.4;
        span.i-t {
          color: #888;
          display: block;
          float: left;
          height: 24px;
          font-size: 12px;
        }
        .severArea {
          max-width: 600px;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .btn {
          padding: 0 3px;
          margin-left: 4px;
          display: inline-block;
          color: #666;
          line-height: 18px;
          height: 20px;
          &:hover {
            color: $red-color;
          }
        }
      }
    }
    &:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  }
}
.content {
  height: 270px;
  /deep/ .el-cascader-panel {
    border: none;
  }
  /deep/ .el-cascader-menu__wrap {
    height: 260px;
  }
  /deep/ .el-cascader-menu {
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
    margin-right: 20px;
  }
  /deep/ .el-icon-arrow-right {
    display: none;
  }
  /deep/ .el-icon-check {
    display: none;
  }
  /deep/ .el-scrollbar__view .is-active {
    background: #fff !important;
    color: #606266 !important;
  }
  /deep/ .el-cascader-node.is-active:hover .el-cascader-node__label {
    color: #606266 !important;
  }
  /deep/ .area-select {
    width: 840px;
  }
}
.gotop {
  position: fixed;
  right: 0;
  bottom: 100px;
  width: 30px;
  height: 30px;
  background: #7a6e6e;
  border-radius: 3px 0 0 3px;
  display: flex;
  cursor: pointer;
  span {
    display: none;
  }
  .el-icon-arrow-up {
    font-size: 20px;
    color: #fff;
    margin: auto;
  }
}
.gotop:hover {
  width: 80px;
  background: #e1251b;
  span {
    display: block;
    margin: 3px 0 0 12px;
    color: #fff;
  }
}
.isp {
  background: #fff;
  .w {
    padding-left: 12px;
    b {
      font-size: 16px;
      margin: 0 6px;
    }
    .fl {
      float: left;
    }
    .fr {
      float: right;
    }
    .btn {
      width: 144px;
      height: 52px;
      font-size: 16px;
      text-align: center;
      margin-left: 10px;
      float: right;
    }
  }
}
.isp-fixed-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 4px 0 8px 0 rgba(0, 0, 0, 0.14);
  height: 52px;
  margin-top: 50px;
  line-height: 52px;
  z-index: 2;
}
.isp-bottom {
  width: 1200px;
  line-height: 52px;
  height: 52px;
  margin: 0 auto 50px;
}
</style>
