<template>
  <div class="box">
    <CResult>
      <template #search>
        <CSearch></CSearch>
      </template>
    </CResult>
    <!-- <div class="selector-box">
        <div class="selector-top">
          <div class="fl crumb">
            <span>全部结果</span>
            <i style="margin: 0 4px" class="el-icon-arrow-right"></i>
            <div class="screen-keys">
              <div class="item" v-if="serviceTypeIdItem.length != 0">
                <span>服务类型：</span>
                <el-tooltip
                  :content="serviceName"
                  placement="bottom-start"
                  effect="light"
                >
                  <span class="c">{{ serviceName }}</span>
                </el-tooltip>
                <button class="close">
                  <i class="el-icon-close" @click="cleanType()"></i>
                </button>
              </div>
              <div class="item" v-if="itemCatIdItem.length != 0">
                <span>服务品类：</span>
                <el-tooltip
                  :content="itemCatName"
                  placement="bottom-start"
                  effect="light"
                >
                  <span class="c">{{ itemCatName }}</span>
                </el-tooltip>
                <button class="close">
                  <i class="el-icon-close" @click="cleanItemCat()"></i>
                </button>
              </div>
              <div class="item" v-if="selectAreaName.length != 0">
                <span>服务区域：</span>
                <el-tooltip
                  :content="selectAreaName"
                  placement="bottom-start"
                  effect="light"
                >
                  <span class="c">{{ selectAreaName }}</span>
                </el-tooltip>
                <button class="close">
                  <i class="el-icon-close" @click="cleanSelectAreaName()"></i>
                </button>
              </div>
            </div>
            <span>共{{ allCount }}个结果 </span>
          </div>
          <div class="fr">
            <div class="s-search">
              <input
                type="text"
                class="t"
                v-model="facilitatorName"
                placeholder="搜索"
                v-on:keyup.enter="search"
              />
              <input
                id="se"
                type="submit"
                class="b"
                @click="search"
                value=" "
              />
            </div>
          </div>
        </div>
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
              >展开<i class="el-icon-arrow-down"></i
            ></a>
            <a
              href="javascript:"
              class="show"
              :class="{ vhidden: serviceTypes.length <= 10 }"
              @click="showSelectLine1"
              v-else
              >收起<i class="el-icon-arrow-up"></i
            ></a>
          </div>
        </div>
        <div class="selector-line">
          <div class="s-key">服务品类</div>
          <div class="s-value">
            <div
              class="s-v-item"
              ref="serviceCategory"
              :style="{ height: serviceCategoryLineFlag ? '30px' : 'auto' }"
            >
              <a
                href="javascript:"
                @click="cleanItemCat()"
                :class="{ on: itemCatIdItem.length == 0 }"
                >全部</a
              >
              <a
                href="javascript:"
                v-for="(items, key) in itemCats"
                :key="key"
                :class="{ on: itemCatIdItem.indexOf(items.itemCatId) != -1 }"
                @click="setItemCatId(items.itemCatId)"
              >
                {{ items.itemCatName }}
              </a>
            </div>
          </div>
          <a
            href="javascript:"
            class="show"
            @click="showSelectLine2"
            v-if="serviceCategoryLineFlag"
            >展开<i class="el-icon-arrow-down"></i
          ></a>
          <a
            href="javascript:"
            class="show"
            @click="showSelectLine2"
            v-if="!serviceCategoryLineFlag && serviceCategoryLineClose"
            >收起<i class="el-icon-arrow-up"></i
          ></a>
        </div>
        <div class="selector-line">
          <div class="s-key">服务区域</div>
          <div class="s-value">
            <div class="s-v-item">
              <a
                href="javascript:"
                :class="{ on: selectAreaName.length == 0 }"
                @click="cleanSelectAreaName()"
                >全国</a
              >
              <div class="change-adr">
                <a href="javascript:" class="t" @click="showAdr"
                  >省市区县<i class="el-icon-arrow-down"></i
                ></a>
                <CArea
                  title="请选择服务区域"
                  ref="cjdarea"
                  :defaultChecked="false"
                  :multiple="true"
                  v-model="visible"
                  @confirmArea="confirmArea"
                  :clear="true"
                ></CArea>
              </div>
            </div>
          </div>
        </div>
        <div class="selector-line pro-sort">
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
      <div class="loading-box" v-if="listLoading">
        <i class="el-icon-loading"></i>
      </div>
      <div class="isp-list-box" v-else>
        <div class="no-data" :class="{ vhidden: FacilitatorList.length > 0 }">
          <img src="~@/assets/images/ico-nodata.png" class="ico" />
          <div class="txt">
            <p>抱歉，没有找到相关的商品！</p>
            <p>您可以缩短或修改搜索条件重新搜索。</p>
          </div>
        </div>
        <div class="i-list-wrap" v-if="FacilitatorList.length">
          <div
            class="item"
            v-for="(items, key) in FacilitatorList"
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
                    items.onTimeOrderRate == "0.00"
                      ? "-"
                      : items.onTimeOrderRate
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
                <dd :class="{ on: items.showNums1 == 10 }">
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
                    @click="operFold1(i)"
                    @click.stop=""
                    :class="{ vhidden: items.serviceType.length <= 10 }"
                    v-if="items.showNums1 == 10"
                    >展开<i class="el-icon-caret-bottom"></i
                  ></span>
                  <span
                    class="f-blue"
                    @click="operFold1(i)"
                    @click.stop=""
                    :class="{ vhidden: items.serviceType.length <= 10 }"
                    v-else
                    >收起<i class="el-icon-caret-top"></i
                  ></span>
                </dd>
              </dl>
              <dl>
                <dt>服务品类</dt>
                <dd
                  ref="itemServiceCategory"
                  :style="{
                    height: itemServiceCategoryLineFlag[key] ? '26px' : 'auto',
                  }"
                >
                  <span
                    style="margin: 0;line-height: 28px"
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
                  @click="operFold(key)"
                  @click.stop=""
                  v-if="itemServiceCategoryLineFlag[key]"
                  >展开<i class="el-icon-caret-bottom"></i
                ></span>
                <span
                  class="f-blue"
                  @click="operFold(key)"
                  @click.stop=""
                  v-if="
                    itemServiceCategoryClose[key] &&
                      !itemServiceCategoryLineFlag[key]
                  "
                  >收起<i class="el-icon-caret-top"></i
                ></span>
              </dl>
            </div>
          </div>
        </div>
        <div class="pages-box" v-show="allCount > 10">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="pageNo"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="10"
            layout="prev, pager, next,total, jumper"
            prev-text="上一页"
            next-text="下一页"
            :total="allCount"
          >
          </el-pagination>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script lang="ts" setup>
import api from "@/api/ispList";
import apis from "@/api/common";
// import CArea from "@/components/CArea/index.vue";
import CResult from "@/components/CResult/index.vue";
import CSearch from "@/components/CSearch/index.vue";
import { nextTick, onMounted, ref } from "vue";
// export default {
//   data() {
//     return {
//       listLoading: true,
//       statusTxt: "展开",
//       serviceTypes: [],
//       serviceTypesNum: 10,
//       itemCats: [],
//       serviceCategoryNums: 0,
//       serviceCategoryLineFlag: false,
//       serviceCategoryLineClose: false,
//       itemServiceCategoryNums: [],
//       itemServiceCategoryLineFlag: [],
//       itemServiceCategoryClose: [],
//       FacilitatorList: [],
//       FacilitatorId: "",
//       facilitatorName: this.$route.query.facilitatorName,
//       Order: "",
//       Site: "",
//       SiteEngineerNum: "",
//       serviceTypeId: "",
//       serviceTypeIdItem: [],
//       itemCatId: "",
//       itemCatIdItem: [],
//       userId: this.$store.state.user.userInfo.id,
//       userCode: this.$store.state.user.userInfo.userCode,
//       pageNo: 1,
//       sort: "1",
//       serviceName: "",
//       itemCatName: "",
//       allCount: 0,
//       visible: false,
//       serviceTypeIdItemList: [],
//       serviceType: "",
//       itemCatIdItemList: [],
//       itemCatIdItems: "",
//       areaId: "",
//       selectAreaId: [],
//       selectAreaName: [],
//     };
//   },
//   components: {
//     OFooter,
//     CArea,
//   },
//   mounted() {
//     this.searchConditionData();
//     this.homeSetItemCat();
//     this.infodata();
//   },
//   methods: {
//     initServiceList() {
//       this.$nextTick(() => {
//         this.serviceCategoryNums = this.$refs.serviceCategory.offsetHeight / 30;
//         this.serviceCategoryNums > 1
//           ? (this.serviceCategoryLineFlag = true)
//           : (this.serviceCategoryLineFlag = false);
//       });
//     },
//     initItemServiceList() {
//       this.$nextTick(() => {
//         this.$refs.itemServiceCategory.forEach((e) => {
//           this.itemServiceCategoryNums.push(e.offsetHeight / 30);
//           this.itemServiceCategoryClose.push(false);
//         });
//         this.itemServiceCategoryNums.forEach((i) => {
//           i > 1
//             ? this.itemServiceCategoryLineFlag.push(true)
//             : this.itemServiceCategoryLineFlag.push(false);
//         });
//       });
//     },
//     showSelectLine2() {
//       this.serviceCategoryLineFlag = !this.serviceCategoryLineFlag;
//       this.serviceCategoryLineClose = !this.serviceCategoryLineClose;
//     },
//     //接收首页传来的服务品类条件
//     homeSetItemCat() {
//       if (this.$route.query.itemCatId) {
//         this.itemCatId = this.$route.query.itemCatId;
//         this.setItemCatId(this.itemCatId);
//       }
//     },
//     // 确认地址
//     confirmArea(list) {
//       this.visible = false;
//       const arr = list.map((item) => item.name || item.label);
//       let text = "";
//       arr.forEach((item, index) => {
//         if (index == arr.length - 1) {
//           text += item;
//         } else {
//           text += item + "，";
//         }
//       });
//       this.selectAreaName = text;
//       this.selectAreaId = list.map((item) => item.jdAreaId);
//       this.infodata();
//     },

//     //显示地区
//     showAdr() {
//       this.visible = true;
//       apis.getProvinceList({}).then((res) => {
//         this.$refs.cjdarea.init(res.data);
//       });
//     },
//     // 清除地区
//     cleanSelectAreaName() {
//       this.selectAreaName = [];
//       this.selectAreaId = [];
//       this.infodata();
//     },
//     //监听上下页按钮
//     handleCurrentChange(val) {
//       var _this = this;
//       _this.pageNo = val;
//       this.infodata();
//       _this.pageNo = Number(val);
//     },
//     //搜索条件分类
//     searchConditionData() {
//       api
//         .searchConditionData({})
//         .then((res) => {
//           const { data } = res;
//           this.serviceTypes = data.serviceTypeData;
//           this.itemCats = data.itemCatData;
//           this.initServiceList();
//         })
//         .catch(() => {});
//     },

//     //设置服务类型
//     setServiceTypeId(id) {
//       var _this = this;
//       let arrIndex = this.serviceTypeIdItem.indexOf(id);
//       _this.serviceType = "";
//       if (arrIndex > -1) {
//         this.serviceTypeIdItemList.splice(arrIndex, 1);
//         this.serviceTypeIdItem.splice(arrIndex, 1);
//         for (var i = 0; i < _this.serviceTypeIdItemList.length; i++) {
//           _this.serviceType += _this.serviceTypeIdItemList[i] + ",";
//         }
//         _this.serviceType =
//           _this.serviceType.substring(_this.serviceType.length - 1) == ","
//             ? _this.serviceType.substring(0, _this.serviceType.length - 1)
//             : _this.serviceType;
//       } else {
//         _this.serviceTypeIdItem.push(id);
//         //去重
//         for (let i = 0, len = _this.serviceTypeIdItem.length; i < len; i++) {
//           if (
//             _this.serviceTypeIdItemList.indexOf(_this.serviceTypeIdItem[i]) ===
//             -1
//           ) {
//             _this.serviceTypeIdItemList.push(_this.serviceTypeIdItem[i]);
//           }
//         }

//         for (let i = 0; i < _this.serviceTypeIdItemList.length; i++) {
//           _this.serviceType += _this.serviceTypeIdItemList[i] + ",";
//         }

//         _this.serviceType =
//           _this.serviceType.substring(_this.serviceType.length - 1) == ","
//             ? _this.serviceType.substring(0, _this.serviceType.length - 1)
//             : _this.serviceType;
//       }

//       _this.infodata();
//       _this.serviceInit();
//     },

//     //设置服务品类
//     setItemCatId(id) {
//       var _this = this;
//       let arrIndex = this.itemCatIdItem.indexOf(id);
//       _this.itemCatIdItems = "";
//       if (arrIndex > -1) {
//         this.itemCatIdItem.splice(arrIndex, 1);
//         this.itemCatIdItemList.splice(arrIndex, 1);
//         for (var i = 0; i < _this.itemCatIdItemList.length; i++) {
//           _this.itemCatIdItems += _this.itemCatIdItemList[i] + ",";
//         }

//         _this.itemCatIdItems =
//           _this.itemCatIdItems.substring(_this.itemCatIdItems.length - 1) == ","
//             ? _this.itemCatIdItems.substring(0, _this.itemCatIdItems.length - 1)
//             : _this.itemCatIdItems;
//       } else {
//         this.itemCatIdItem.push(Number(id));

//         //去重
//         for (let i = 0, len = _this.itemCatIdItem.length; i < len; i++) {
//           if (_this.itemCatIdItemList.indexOf(_this.itemCatIdItem[i]) === -1) {
//             _this.itemCatIdItemList.push(_this.itemCatIdItem[i]);
//           }
//         }

//         for (let i = 0; i < _this.itemCatIdItemList.length; i++) {
//           _this.itemCatIdItems += _this.itemCatIdItemList[i] + ",";
//         }

//         _this.itemCatIdItems =
//           _this.itemCatIdItems.substring(_this.itemCatIdItems.length - 1) == ","
//             ? _this.itemCatIdItems.substring(0, _this.itemCatIdItems.length - 1)
//             : _this.itemCatIdItems;
//       }
//       _this.infodata();
//       _this.itemCatInit();
//     },

//     //获取选中服务类型
//     serviceInit() {
//       if (this.serviceType != null && this.serviceType != "") {
//         api.findServiceType({ serviceTypeId: this.serviceType }).then((res) => {
//           let arrvalue = "";
//           const arr = res.data;
//           arr.forEach((item, index) => {
//             if (index == arr.length - 1) {
//               arrvalue += item;
//             } else {
//               arrvalue += item + "，";
//             }
//           });
//           this.serviceName = arrvalue;
//         });
//       }
//     },

//     //获取选中服务品类
//     itemCatInit() {
//       if (this.itemCatIdItems != "" && this.itemCatIdItems != null) {
//         api.findItemCat({ itemCatId: this.itemCatIdItems }).then((res) => {
//           let arrvalue = "";
//           let arr = res.data;
//           arr.forEach((item, index) => {
//             if (index == arr.length - 1) {
//               arrvalue += item;
//             } else {
//               arrvalue += item + "，";
//             }
//           });
//           this.itemCatName = arrvalue;
//         });
//       }
//     },
//     //名称搜索
//     search() {
//       if (!this.facilitatorName) {
//         this.$warning("请输入要查找的内容！");
//         return;
//       }
//       this.infodata();
//     },

//     //初始化数据
//     infodata() {
//       this.listLoading = true;
//       const obj = {
//         facilitatorName: this.facilitatorName,
//         serverTypeId: this.serviceType,
//         itemCatId: this.itemCatIdItems,
//         userCode: this.userCode,
//         pageNo: this.pageNo,
//         sort: this.sort,
//         areaId: this.selectAreaId.join(","),
//       };
//       api
//         .searchFacilitator(obj)
//         .then((res) => {
//           this.listLoading = false;
//           const { data } = res;
//           // 如果data 为null return 防止控制台报错
//           if (!data || !data.userResources) {
//             this.allCount = 0;
//             this.FacilitatorList = [];
//             return;
//           }
//           this.allCount = data.total;
//           this.FacilitatorList = data.userResources || [];
//           for (var i = 0; i < data.length; i++) {
//             this.$set(data[i], "showNums", 10);
//             this.$set(data[i], "showNums1", 10);
//           }
//           this.initItemServiceList();
//         })
//         .catch(() => {
//           this.listLoading = false;
//         });
//     },

//     //排序设置
//     sortSet(sortId) {
//       this.sort = sortId;
//       this.pageNo = 1;
//       const obj = {
//         facilitatorName: this.facilitatorName,
//         serverTypeId: this.serviceType,
//         itemCatId: this.itemCatIdItems,
//         userCode: this.userCode,
//         pageNo: 1,
//         sort: this.sort,
//         areaId: this.selectAreaId.join(","),
//       };
//       api.searchFacilitator(obj).then((res) => {
//         const { data } = res;
//         // 如果data 为null return 防止控制台报错
//         if (!data || !data.userResources) {
//           this.allCount = 0;
//           this.FacilitatorList = [];
//           return;
//         }
//         this.allCount = data.total;
//         this.FacilitatorList = data.userResources || [];
//         for (var i = 0; i < this.FacilitatorList.length; i++) {
//           this.$set(this.FacilitatorList[i], "showNums", 10);
//           this.$set(this.FacilitatorList[i], "showNums1", 10);
//         }
//       });
//     },

//     //清除服务类型
//     cleanType() {
//       this.serviceType = "";
//       this.serviceTypeIdItem = [];
//       this.serviceTypeIdItemList = [];
//       this.infodata();
//       this.$route.path.replace();
//     },
//     //清除服务品类
//     cleanItemCat() {
//       this.itemCatIdItems = "";
//       this.itemCatIdItem = [];
//       this.itemCatIdItemList = [];
//       this.$router.push({ query: "" });
//       this.infodata();
//     },
//     //跳转详情页
//     infopage(userCode) {
//       this.$router.push({
//         path: "ispIndex",
//         query: {
//           userCode: userCode,
//         },
//       });
//     },
//     //展开
//     showSelectLine1() {
//       if (this.serviceTypesNum == 10) {
//         this.serviceTypesNum = 100;
//       } else {
//         this.serviceTypesNum = 10;
//       }
//     },
//     operFold(index) {
//       this.itemServiceCategoryLineFlag.splice(
//         index,
//         1,
//         !this.itemServiceCategoryLineFlag[index]
//       );
//       this.itemServiceCategoryClose.splice(
//         index,
//         1,
//         !this.itemServiceCategoryLineFlag[index]
//       );
//     },
//     operFold1(index) {
//       if (this.FacilitatorList[index].showNums1 == 10) {
//         this.FacilitatorList[index].showNums1 = 100;
//       } else {
//         this.FacilitatorList[index].showNums1 = 10;
//       }
//     },
//   },
// };
</script>
<style scoped lang="scss">
.box {
  width: 1200px;
  margin: auto;
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
.loading-box {
  background: #fff;
  height: 540px;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    font-size: 60px;
    color: #333;
  }
  p {
    font-size: 20px;
  }
}
</style>
