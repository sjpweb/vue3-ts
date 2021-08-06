<!-- 
 * @Author: sjp
 * @Date: 2021-08-04 17:22:20
 * @LastEditTime: 2021-08-06 16:36:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\portal\serviceMarket\ispSign.vue
-->
<template>
  <div class="box">
    <el-form
      ref="formDome"
      :model="invoiceForm"
      :rules="rules"
      label-width="180px"
    >
      <div class="isp-sign">
        <div class="s-item">
          <div class="c empower-list">
            <div class="e-name">{{ facilitatorInfo.facilitatorName }}</div>
            <CLoading v-if="listLoading"></CLoading>
            <div v-else>
              <div
                class="e-item"
                :key="index"
                v-for="(items, index) in suServerList"
              >
                <el-checkbox
                  :ref="(el) => suServerListDome.push(el)"
                  checked
                  name="bigsu"
                  :label="items.suId"
                  class="no-label"
                ></el-checkbox>
                <p class="e-i-t">
                  <span>{{ items.suName }}</span>
                  <span class="price">¥{{ items.suPrice }}</span>
                </p>
                <div>
                  <p class="area">
                    服务区域：<span>{{ filterJdArea(items) }}</span
                    ><span
                      @click="openArea(items.skuAreaDtoList, index)"
                      class="ico"
                      ><i class="el-icon-edit-outline"></i
                    ></span>
                  </p>
                </div>
                <div class="info">
                  <span @click="openClassify(items.suId)">更多属性</span>
                  <i class="el-icon-d-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="s-item">
          <div class="tit"><b>签约信息</b></div>
          <div class="c">
            <div class="dl-form">
              <el-form-item
                label="合同有效日期："
                label-width="152px"
                prop="date"
                style="margin-bottom: 12px"
              >
                <el-date-picker
                  v-model="invoiceForm.date"
                  type="daterange"
                  :disabledDate="pickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="s-item">
          <div class="tit" v-if="facilitatorInfo.popFlag == 1">
            <b>发票信息</b>
          </div>
          <div class="c dl-form">
            <el-form-item
              v-if="facilitatorInfo.popFlag == 1"
              label="类型："
              prop="invoiceType"
              label-width="97px"
            >
              <el-radio-group v-model="invoiceForm.invoiceType">
                <el-radio
                  v-for="item in invoiceTypeList"
                  :key="item"
                  :label="item"
                  >{{ ["普票", "专票"][item - 1] }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
            <el-form-item
              v-if="facilitatorInfo.popFlag == 1"
              label="税点："
              prop="taxPoint"
              label-width="97px"
              class="taxPoint"
              style="margin-bottom: 12px"
            >
              <el-radio-group
                v-for="item in taxPointList"
                :key="item"
                v-model="invoiceForm.taxPoint"
              >
                <el-radio :label="item" style="margin-right: 10px"
                  >{{ item }}%</el-radio
                >
              </el-radio-group>
            </el-form-item>
            <el-form-item
              v-if="facilitatorInfo.popFlag == 2"
              label="付款方式："
              prop="settlementType"
              label-width="97px"
              class="taxPoint"
              style="margin-bottom: 12px"
            >
              <el-radio-group v-model="invoiceForm.settlementType">
                <el-radio :label="2" style="margin-right: 10px">月结</el-radio>
                <el-radio :label="1" style="margin-right: 10px"
                  >预付款</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
      </div>
      <div
        class="isp isp-fixed-bottom"
        :style="{ opacity: offsetClass ? 0 : 1 }"
        v-show="suServerList.length !== 0"
      >
        <div class="w">
          <div class="fl" v-if="facilitatorInfo.popFlag == 2">
            <el-checkbox v-model="protocol">我已阅读并同意</el-checkbox>
            <span class="protocol" @click="dialogVisible = true"
              >《自营服务采购协议》</span
            >
          </div>
          <div class="fr">
            <button type="button" @click="getContract" class="btn-red btn">
              签署合同
            </button>
          </div>
        </div>
      </div>
      <div
        class="isp isp-bottom"
        :style="{ opacity: offsetClass ? 1 : 0 }"
        v-show="suServerList.length !== 0"
      >
        <div class="w">
          <div v-if="facilitatorInfo.popFlag == 2" class="fl">
            <el-checkbox v-model="protocol">我已阅读并同意</el-checkbox>
            <span class="protocol" @click="dialogVisible = true"
              >《自营服务采购协议》</span
            >
          </div>
          <div class="fr">
            <button type="button" @click="getContract" class="btn-red btn">
              签署合同
            </button>
          </div>
        </div>
      </div>
    </el-form>
    <CArea
      :unfold="true"
      title="修改服务区域"
      :multiple="true"
      :dialogVisible="areaDialogVisible"
      @confirmArea="confirmArea"
      :list="serverAreaList"
      :index="activeArea"
      :preStore="preStore"
      @updateVisible="updateVisible"
    ></CArea>
    <el-dialog
      class="providerProtocol"
      title="网点入驻协议"
      v-model="dialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
      width="900px"
    >
      <CAgreement></CAgreement>
      <template #footer>
        <div class="dialog-footer">
          <button class="btn-red btn" @click="dialogVisible = false">
            确认
          </button>
        </div>
      </template>
    </el-dialog>
    <CAttrDialog
      :dialogVisible="dialogClassifyBox"
      :productAttributeData="productAttributeData"
      @upData="upData"
    ></CAttrDialog>
  </div>
</template>
<script lang="ts" setup>
import api from "@/api/ispSign";
import CArea from "@/components/CArea/index.vue";
import CLoading from "./components/listLoading.vue";
import CAgreement from "./components/agreement.vue";
import { parseTime } from "@/utils/index";
import CAttrDialog from "./components/attrDialog.vue";
import { checkDate } from "@/utils/validate";
import { useStore } from "@/store";
import { useRouter, useRoute } from "vue-router";
import { ElMessage, ElLoading } from "element-plus";
import {
  FormType,
  serviceTypes,
  FacilitatorIdentityType,
  ProductAttributeType,
  AreaType,
  allStoreType,
  SuJsonType,
} from "./service";
import { ref, onMounted, computed } from "vue";

const route = useRoute();
const router = useRouter();
const store = useStore();
const listLoading = ref<boolean>(false);
const taxPointList = ref<number[]>([]);
const invoiceTypeList = ref<number[] | string[]>([]);
const suServerListDome = ref<any[]>([]);
const formDome = ref(null as HTMLFormElement | null);
const serverAreaList = ref<AreaType[]>([]);
const preStore = ref<AreaType[]>([]);
const allStore = ref<allStoreType>({});
const suJson = ref<SuJsonType[]>([]);
const dialogVisible = ref<boolean>(false);
const dialogClassifyBox = ref<boolean>(false);
const areaDialogVisible = ref<boolean>(false);
const protocol = ref<boolean>(false);
const providerUserCode: string = route.query.providerUserCode as string;
const userCode = computed(() => store.state.user.userInfo.userCode);
const userType = computed(() => store.state.user.userInfo.userType);
const productAttributeData = ref<ProductAttributeType[]>([]);
const activeArea = ref<number>(0);
const offsetClass = ref<boolean>(true);
const facilitatorInfo = ref<FacilitatorIdentityType>({
  facilitatorName: "",
  popFlag: 0,
});
const suServerList = ref<serviceTypes[]>([]);
const invoiceForm = ref<FormType>({
  date: [],
  invoiceHeader: "",
  taxNo: "",
  invoiceType: "",
  taxPoint: "",
  settlementType: 0,
});
const rules = {
  date: [{ required: true, trigger: "blur", validator: checkDate }],
  invoiceType: [
    { required: true, message: "请选择发票类型", trigger: "change" },
  ],
  taxPoint: [{ required: true, message: "请选择税点", trigger: "change" }],
  settlementType: [
    { required: true, message: "请选择付款方式", trigger: "change" },
  ],
};
// 日期组件限制
function pickerOptions(time: Date) {
  return time.getTime() < Date.now() - 8.64e7;
}
onMounted(() => {
  initTax();
  getFacilitatorInfo();
  sign();
  window.addEventListener("scroll", handleScroll, true);
});

function filterJdArea(items: serviceTypes) {
  if (items.wholeNation) {
    return "全国";
  }
  let list = items.skuAreaDtoList || [];
  if (list.length > 10) {
    list = list.slice(0, 10);
    return list.map((item) => item.label || item.name).join(",") + "...";
  } else {
    return list.map((item) => item.label || item.name).join(",");
  }
}
//获取服务商信息
function getFacilitatorInfo() {
  api
    .getInfodata({
      userCode: providerUserCode,
    })
    .then((res: any) => {
      facilitatorInfo.value = res.data;
    })
    .catch(function(err) {
      console.log(err);
    });
}
// 获取表单信息
function initTax() {
  api
    .getInvoiceInfo({
      providerUserCode,
      buyerUserCode: userCode.value,
    })
    .then((res: any) => {
      const {
        data: { taxPoints, invoiceHeader, taxNo, invoiceType },
      } = res;
      // 税点
      taxPointList.value = taxPoints.split(",");
      taxPointList.value.sort((a, b) => a - b);
      // 税号
      invoiceForm.value.taxNo = taxNo;
      // 税点
      invoiceForm.value.invoiceHeader = invoiceHeader;
      // 发票类型
      invoiceTypeList.value = invoiceType.split(",");
      if (invoiceTypeList.value.includes("2")) {
        invoiceForm.value.invoiceType = "2";
      } else {
        invoiceForm.value.invoiceType = String(invoiceTypeList.value[0]);
      }
    });
}
//接收选中SU信息
function sign() {
  listLoading.value = true;
  api
    .getSign({
      userCode: providerUserCode,
      suId: route.query.suIds,
    })
    .then((res: any) => {
      suServerList.value = res.data || [];
      suServerList.value.forEach((e) => {
        let areaList: AreaType[] = [];
        // 非地址取最后一级
        recursionAreaId(e.skuAreaDtoList, areaList);
        const areaIdList = areaList.map((item) => item.jdAreaId);
        suJson.value.push({ suId: e.suId, areas: areaIdList });
      });
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
function recursionAreaId(list: AreaType[], arr: AreaType[]) {
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (!item.children || !item.children.length) {
      arr.push(item);
    } else {
      if (item.children) recursionAreaId(item.children, arr);
    }
  }
}
function openClassify(suId: number) {
  api.findProductAttribute({ suId }).then((res: any) => {
    productAttributeData.value = res.data;
    dialogClassifyBox.value = true;
  });
}
function openArea(list: AreaType[], index: number) {
  activeArea.value = index;
  areaDialogVisible.value = true;
  serverAreaList.value = list;
  preStore.value = allStore.value[index];
}
function upData(val: boolean) {
  dialogClassifyBox.value = val;
}
function confirmArea(list: AreaType[], index: number, store: AreaType[]) {
  areaDialogVisible.value = false;
  const checkedIds = list.map((item) => item.jdAreaId);
  suJson.value[index].areas = checkedIds;
  suServerList.value[index].skuAreaDtoList = list;
  allStore.value[index] = store;
}
function getContract() {
  const list = suServerListDome.value.filter((item) => item.isChecked);
  let arr: SuJsonType[] = [];
  list.forEach((item) => {
    suJson.value.forEach((i) => {
      if (item.label == i.suId) {
        arr.push({ suId: i.suId, areas: i.areas });
      }
    });
  });
  if (!arr.length) {
    ElMessage({
      center: true,
      duration: 2000,
      message: "未选择产品",
    });
    return;
  }
  const obj = {
    buyerUserCode: userCode.value,
    providerUserCode,
    signingStartDateS: parseTime(invoiceForm.value.date[0]),
    signingEndDateS: parseTime(invoiceForm.value.date[1]),
    suJson: JSON.stringify(arr),
    invoiceHeader: invoiceForm.value.invoiceHeader,
    taxNo: invoiceForm.value.taxNo,
    settlementType:
      facilitatorInfo.value.popFlag == 2
        ? invoiceForm.value.settlementType
        : "",
    invoiceType: invoiceForm.value.invoiceType,
    taxPoint: invoiceForm.value.taxPoint,
  };
  // 自营
  if (facilitatorInfo.value.popFlag == 2 && !protocol.value) {
    ElMessage({
      center: true,
      duration: 2000,
      message: "请阅读并勾选自营服务采购协议",
    });
    return;
  }
  if (formDome.value) {
    formDome.value.validate((valid: boolean) => {
      if (valid) {
        const loading = ElLoading.service({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.2)",
        });
        api
          .insert(obj)
          .then(({ data: { serialNo } }: any) => {
            pollingApi(loading, serialNo);
          })
          .catch(() => {
            loading.close();
          });
      }
    });
  }
}
// 获取轮训结果
function pollingApi(loading: any, serialNo: number) {
  // 异步锁 是为了防止 网络波动导致的多个请求都返回成功结果
  // 只处理第一个成功结果
  let lock = false;
  const timer = setInterval(() => {
    // 获取合同状态
    api
      .insertResult({ serialNo })
      .then((res: any) => {
        const { data, code } = res;
        if (code === 2119) {
          return;
        }
        if (!lock && data) {
          lock = true;
          loading.close();
          clearTimeout(timer);
          // 自营服务商
          if (facilitatorInfo.value.popFlag == 2) {
            router.push({
              path: "/succeed",
              query: {
                userType: userType.value,
                popFlag: facilitatorInfo.value.popFlag,
              },
            });
            return;
          }
          // 非自营
          router.push({
            path: "/protocol",
            query: {
              contractId: data.contractId,
              userCode: userType.value,
              userType: facilitatorInfo.value.popFlag,
            },
          });
        }
      })
      .catch(() => {
        clearTimeout(timer);
        loading.close();
      });
  }, 500);
}
function updateVisible() {
  areaDialogVisible.value = false;
}
function handleScroll() {
  suServerListDome.value = [];
  let pageHeight = document.body.clientHeight,
    scrollTop = document.documentElement.scrollTop,
    winHeight = document.documentElement.clientHeight,
    thresold = pageHeight - winHeight - 200;
  if (thresold < scrollTop) {
    offsetClass.value = true;
  } else {
    offsetClass.value = false;
  }
}
</script>
<style scoped lang="scss">
.isp-sign {
  width: 1200px;
  margin: 16px auto 24px;
  .s-item {
    background: $white-color;
    margin-bottom: 12px;
    padding: 20px;
    .tit {
      line-height: 12px;
      height: 12px;
      border-left: solid 3px $red-color;
      padding-left: 10px;
      margin-bottom: 22px;
      font-size: 12px;
      b {
        font-weight: 600;
        font-size: 15px;
      }
    }
    .dl-form {
      width: 500px;
      .el-form-item:last-child {
        margin-bottom: 0;
      }
    }
    .empower-list {
      .e-name {
        font-size: 18px;
        color: #000;
        font-weight: 600;
        margin: 0px 4px 20px;
      }
      .e-item {
        background: $bg-gray;
        padding: 20px 20px 20px 52px;
        position: relative;
        margin-bottom: 4px;
        .el-checkbox {
          position: absolute;
          top: 50%;
          margin-top: -12px;
          left: 20px;
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
        .e-i-t {
          font-size: 14px;
          color: #000;
          margin-bottom: 5px;
          max-width: 940px;
          .price {
            margin-left: 20px;
            font-weight: 600;
          }
        }
        a.ico {
          margin-left: 4px;
          font-size: 14px;
          vertical-align: middle;
          margin-bottom: 3px;
          display: inline-block;
        }
        .txt {
          display: inline-block;
          border-bottom: solid 1px #333;
          height: 20px;
          width: 28px;
          .el-input__inner {
            border: none;
            background: none;
            height: 20px;
          }
        }
        .btn {
          padding: 0 3px;
          margin-left: 4px;
          display: inline-block;
          line-height: 18px;
        }
      }
    }
  }
}
#dialogArea {
  /deep/ .el-dialog__body {
    background-color: #fefefe;
    padding: 14px;
  }
}
.dl-form {
  /deep/ .el-range-separator {
    padding: 0;
  }
}
.info {
  cursor: pointer;
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translate(0, -50%);
  img {
    margin-left: 6px;
    vertical-align: middle;
  }
}
.ispSign {
  .el-form {
    min-height: 858px;
  }
  .el-form-item {
    margin-bottom: 28px;
  }
  /deep/ .is-checked > .el-radio__inner {
    background-color: #fff !important;
    border-color: #e1251b !important;
    box-shadow: none;
  }
  /deep/ .is-checked > .el-radio__inner::after {
    width: 8px;
    height: 8px;
    background-color: #e1251b !important;
  }
  .s-item {
    /deep/
      .el-form-item.is-required:not(.is-no-asterisk)
      > .el-form-item__label:before {
      content: "";
    }
  }
}
/deep/ .el-dialog__body {
  padding: 0 10px 0 20px;
}
.el-form-item:nth-child(1) {
  margin-bottom: 18px;
}
.el-form-item:nth-child(3) {
  margin-bottom: 18px;
}
.area {
  width: 960px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  .ico {
    color: #0f6fcf;
    cursor: pointer;
    margin-left: 4px;
    font-size: 14px;
    vertical-align: middle;
    margin-bottom: 3px;
    display: inline-block;
    & :hover {
      color: $red-color;
    }
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
.taxPoint {
  /deep/ .el-form-item__error {
    margin-top: 0px;
  }
}
.protocol {
  cursor: pointer;
  color: #0066cc;
}
.providerProtocol {
  /deep/ .el-dialog__header {
    height: 32px;
    background-color: #f2f2f2;
    padding: 0 24px;
  }
  /deep/ .el-dialog__title {
    font-size: 12px;
    line-height: 32px;
  }
  .notarize {
    width: 144px;
    height: 46px;
  }
}
</style>
