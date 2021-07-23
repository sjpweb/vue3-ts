<!--
 * @Author: sjp
 * @Date: 2021-04-19 10:31:23
 * @LastEditTime: 2021-07-22 11:34:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\enterProcess\modules\servicPprovider\serviceAbilityForm.vue
-->
<template>
  <div class="serviceAbilityForm">
    <div class="tit">基础服务能力</div>
    <div class="cont">
      <el-form
        class="brandForm"
        ref="brandForm"
        :rules="brandRules"
        label-width="136px"
        v-for="(item, index) in brandEnts"
        :key="index"
        :model="item"
      >
        <el-form-item
          label="授权品牌："
          :prop="item.image && 'brandId'"
          :key="item.image || 1"
        >
          <el-select class="select" placeholder="请选择" v-model="item.brandId">
            <el-option
              v-for="i in brandList"
              v-bind:label="i.brandName"
              :key="i.id"
              :value="i.id"
            ></el-option>
          </el-select>
          <span class="delBtn" @click="delBrand(index)">删除</span>
          <span
            class="addBtn"
            v-if="index == brandEnts.length - 1"
            @click="addBrand"
            >新增</span
          >
        </el-form-item>
        <el-form-item
          label="授权书电子版："
          class="upload"
          :prop="String(item.brandId) && 'image'"
          :key="item.brandId"
        >
          <CUpload
            :index="index"
            @uploadFile="upload"
            @handleRemove="handleRemove"
            :loading="item.loading"
            :imageUrl="item.image"
          />
        </el-form-item>
      </el-form>
      <el-form
        :rules="invoiceRules"
        ref="invoiceForm"
        class="invoice"
        label-width="136px"
        :model="invoiceForm"
      >
        <el-form-item class="bot" label="发票类型：" prop="siteInvoiceType">
          <el-checkbox-group v-model="invoiceForm.siteInvoiceType">
            <el-checkbox label="2" value="2">专票</el-checkbox>
            <el-checkbox label="1" value="1">普票</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="top" label="发票税点：" prop="invoiceTaxPoints">
          <el-checkbox-group v-model="invoiceForm.invoiceTaxPoints">
            <el-checkbox label="3">3%</el-checkbox>
            <el-checkbox label="6">6%</el-checkbox>
            <el-checkbox label="9">9%</el-checkbox>
            <el-checkbox label="13">13%</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="type top" label="服务商类型：" prop="providerType">
          <el-radio-group v-model="invoiceForm.providerType">
            <el-radio :label="1">第三方服务商</el-radio>
            <el-radio :label="2">品牌服务商</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="top" label="服务商规模：" prop="providerScale">
          <el-radio-group v-model="invoiceForm.providerScale">
            <el-radio :label="1">全国</el-radio>
            <el-radio :label="2">区域</el-radio>
            <el-radio :label="3">城市</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="cascader" label="服务商所在地区：" prop="areaId">
          <el-cascader
            ref="cascader"
            clearable
            v-model="invoiceForm.areaId"
            :placeholder="placeholder"
            :props="props"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="服务商详细地址：" prop="userAddress">
          <el-input
            style="width: 415px"
            v-model="invoiceForm.userAddress"
            placeholder="请输入服务商详细地址"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="tit">服务质量承诺</div>
      <el-form
        class="numbox"
        :inline="true"
        label-width="66px"
        :rules="qualityRules"
        ref="qualityForm"
        :model="qualityCommitment"
      >
        <el-form-item label="安装：" prop="installTimelyAppointRate">
          <span
            >预约及时率不低于
            <el-input
              v-model="qualityCommitment.installTimelyAppointRate"
              placeholder="00"
            ></el-input>
            %
          </span>
        </el-form-item>
        <el-form-item prop="installOntimeCompleteRate">
          <span
            >准时完工率不低于
            <el-input
              v-model="qualityCommitment.installOntimeCompleteRate"
              placeholder="00"
            ></el-input>
            %
          </span>
        </el-form-item>
        <el-form-item prop="installPoorEvaluationRate">
          <span
            >差评率不高于
            <el-input
              v-model="qualityCommitment.installPoorEvaluationRate"
              placeholder="00"
            ></el-input>
            %
          </span>
        </el-form-item>
        <!-- <el-form-item label="维修：" prop="fixTimelyAppointRate">
              <span>预约及时率不低于
                <el-input v-model="qualityCommitment.fixTimelyAppointRate" placeholder="00"></el-input> %
              </span>
            </el-form-item>
            <el-form-item prop="fixOntimeCompleteRate">
              <span>准时完工率不低于
                <el-input v-model="qualityCommitment.fixOntimeCompleteRate" placeholder="00"></el-input> %
              </span>
            </el-form-item>
            <el-form-item prop="fixPoorEvaluationRate">
              <span>差评率不高于
                <el-input v-model="qualityCommitment.fixPoorEvaluationRate" placeholder="00"></el-input> %
              </span>
            </el-form-item> -->
      </el-form>
      <div class="tit" style="margin-top: 12px">服务结算说明</div>
      <div class="textarea-count">
        <el-input
          v-model="settleInfo"
          maxlength="200"
          type="textarea"
          :rows="8"
          style="width:624px"
          placeholder=""
        ></el-input>
        <span class="txt" style="right:48px">还可以输入{{ remnant }}字</span>
      </div>
    </div>
    <div class="btns">
      <button class="lbtn-gray btn" type="button" @click="lastPage">
        上一步
      </button>
      <button type="button" class="btn-red btn" @click="onSubmit">
        下一步，人工审核
      </button>
    </div>
  </div>
</template>
<script>
import CUpload from "@/components/Upload";
import { checkNumber, checkNumber1, checkNumber2 } from "@/utils/validate";
import api from "@/api/common";
export default {
  components: {
    CUpload,
  },
  data() {
    return {
      placeholder: "",
      props: {
        lazy: true,
        value: "jdAreaId",
        label: "name",
        leaf: "leaf",
        expandTrigger: "hover",
        lazyLoad(node, resolve) {
          const { level, data } = node;
          if (level === 0) {
            api.getProvinceList({}).then((res) => {
              resolve(res.data);
            });
          }
          if (level > 0) {
            api.getAreaList({ parent: data.jdAreaId }).then((res) => {
              if (res.data.length) {
                resolve(res.data);
              } else {
                return resolve(null);
              }
            });
          }
        },
      },
      loading: false,
      brandEnts: [
        {
          img: "",
          brandId: "",
          image: "",
          loading: false,
        },
      ],
      brandList: [
        {
          brandName: "",
          id: null,
        },
      ],
      invoiceForm: {
        siteInvoiceType: [],
        invoiceTaxPoints: [],
        providerType: "",
        providerScale: "",
        areaId: "",
        userAddress: "",
      },
      brandRules: {
        brandId: [
          { required: true, message: "授权品牌不能为空", trigger: "change" },
        ],
        image: [
          { required: true, message: "电子授权书不能为空", trigger: "change" },
        ],
      },
      invoiceRules: {
        siteInvoiceType: [
          { required: true, message: "发票类型不能为空", trigger: "change" },
        ],
        invoiceTaxPoints: [
          { required: true, message: "发票税点不能为空", trigger: "change" },
        ],
        providerType: [
          { required: true, message: "服务商类型不能为空", trigger: "change" },
        ],
        providerScale: [
          { required: true, message: "服务商规模不能为空", trigger: "change" },
        ],
        areaId: [
          {
            required: true,
            message: "服务商所在地址不能为空",
            trigger: "change",
          },
        ],
        userAddress: [
          {
            required: true,
            message: "服务商详细地址不能为空",
            trigger: "blur",
          },
        ],
      },
      qualityCommitment: {
        installTimelyAppointRate: "",
        installOntimeCompleteRate: "",
        installPoorEvaluationRate: "",
      },
      qualityRules: {
        installTimelyAppointRate: [
          { required: true, validator: checkNumber, trigger: "blur" },
        ],
        installOntimeCompleteRate: [
          { required: true, validator: checkNumber1, trigger: "blur" },
        ],
        installPoorEvaluationRate: [
          { required: true, validator: checkNumber2, trigger: "blur" },
        ],
      },
      settleInfo: "",
    };
  },
  computed: {
    remnant() {
      return 200 - this.settleInfo.length;
    },
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      api.getAllBrand({}).then((res) => {
        this.brandList = res.data.brandList;
      });
      const { data } = await api.queryProviderByUserId();
      Object.keys(data).forEach((item) => {
        if (data[item] !== null && data[item] !== "") {
          this.qualityCommitment[item] = data[item];
          this.invoiceForm[item] = data[item];
        }
      });
      // 品牌列表
      if (data.brandAuthList && data.brandAuthList.length) {
        const brandEnts = data.brandAuthList.map((item) => {
          return {
            brandId: item.id,
            img: item.brandAuthImgUrl,
            image: item.brandAuthImgBytes,
            loading: false,
          };
        });
        this.brandEnts = [...brandEnts];
      } else {
        this.brandEnts = [
          {
            img: "",
            brandId: "",
            image: "",
            loading: false,
          },
        ];
      }
      // 发票类型
      if (Array.isArray(data.siteInvoiceType)) {
        this.invoiceForm.siteInvoiceType = data.siteInvoiceType;
      }
      // 税点
      data.invoiceTaxPoints &&
        (this.invoiceForm.invoiceTaxPoints = data.invoiceTaxPoints.split(","));
      data.settleInfo && (this.settleInfo = data.settleInfo);
      // 根据id获取所在地址
      // if (data.areaId) {
      let areaId = [];
      data.userProvinceId && areaId.push(data.userProvinceId);
      data.userCityId && areaId.push(data.userCityId);
      data.userCountyId && areaId.push(data.userCountyId);
      data.userStreetId && areaId.push(data.userStreetId);
      this.invoiceForm.areaId = areaId;
      const list = [];
      if (areaId[0]) {
        await this.getArea(api.getProvinceList, areaId, list, 0);
      }
      if (areaId[1]) {
        await this.getArea(api.getAreaList, areaId, list, 1);
      }
      if (areaId[2]) {
        await this.getArea(api.getAreaList, areaId, list, 2);
      }
      if (areaId[3]) {
        await this.getArea(api.getAreaList, areaId, list, 3);
      }
      let str = "";
      list.forEach((item, index) => {
        if (item) {
          str += `${item}${index === list.length - 1 ? "" : "/"}`;
        }
      });
      this.placeholder = str;
    },
    async getArea(api, arr, list, i) {
      const { data } = await api({ parent: i ? arr[i - 1] : null });
      const tempArr = data.filter((item) => item.jdAreaId === arr[i]);
      if (tempArr.length) {
        list.push(tempArr[0].name);
      }
    },
    addBrand() {
      this.brandEnts.push({
        brandId: "",
        img: "",
        image: "",
        loading: false,
      });
    },
    delBrand(index) {
      // 只有一个时 删除只清除数据
      if (this.brandEnts.length === 1) {
        this.brandEnts = [
          {
            brandId: "",
            img: "",
            image: "",
            loading: false,
          },
        ];
        return;
      }
      this.brandEnts.splice(index, 1);
    },
    async upload(file, index) {
      this.brandEnts[index].loading = true;
      const form = new FormData();
      form.append("file", file);
      const {
        data: { image, url },
      } = await api.upload(form);
      this.brandEnts[index].loading = false;
      const obj = this.brandEnts[index];
      obj.image = image;
      obj.img = url;
      this.brandEnts.splice(index, 1, obj);
    },
    handleRemove(index) {
      const obj = this.brandEnts[index];
      obj.img = "";
      obj.image = "";
      this.brandEnts.splice(index, 1, obj);
    },
    lastPage() {
      api.updateLastEntrySteps().then((res) => {
        if (res.code === 1000) {
          this.$parent.artificialCheck && this.$parent.artificialCheck(2);
        }
      });
    },
    onSubmit() {
      // 校验授权书电子版
      let arr = [];
      this.$refs.brandForm.forEach((item) => {
        item.validate((valid) => {
          arr.push(valid);
        });
      });
      let flag = arr.every((item) => {
        return item === true;
      });
      if (!flag) {
        return;
      }
      this.$refs.invoiceForm.validate((valids) => {
        if (valids) {
          this.$refs.qualityForm.validate((valid) => {
            if (valid) {
              const areaId = this.invoiceForm.areaId;
              this.invoiceForm.userProvinceId = areaId[0] || "";
              this.invoiceForm.userCityId = areaId[1] || "";
              this.invoiceForm.userCountyId = areaId[2] || "";
              this.invoiceForm.userStreetId = areaId[3] || "";
              const obj = {
                ...this.invoiceForm,
                installTimelyAppointRate: this.qualityCommitment
                  .installTimelyAppointRate,
                installOntimeCompleteRate: this.qualityCommitment
                  .installOntimeCompleteRate,
                installPoorEvaluationRate: this.qualityCommitment
                  .installPoorEvaluationRate,
                settleInfo: this.settleInfo,
                // areaId
              };
              obj.invoiceTaxPoints = obj.invoiceTaxPoints.join(",");
              delete obj.areaId;
              const arr = this.brandEnts.map((item) => {
                return {
                  brandAuthImgUrl: item.img,
                  brandId: item.brandId,
                };
              });

              for (let i = 0; i < arr.length; i++) {
                if (!arr[i].brandAuthImgUrl) {
                  arr.splice(i, 1);
                  i--;
                }
              }
              obj.brandAuthList = arr;
              api.insertProvider(obj).then((res) => {
                if (res.code === 1000) {
                  this.$parent.artificialCheck &&
                    this.$parent.artificialCheck(1, 1);
                }
              });
            }
          });
        }
      });
    },
  },
  watch: {
    "invoiceForm.areaId"(val) {
      if (val.length === 0) {
        this.placeholder = "";
      }
    },
  },
};
</script>
<style scoped lang="scss">
.serviceAbilityForm {
  width: 650px;
  margin: 0 auto 70px;
  min-height: calc(100vh - 286px);
  .select {
    width: 300px;
    margin-right: 10px;
    margin-bottom: 20px;
    /deep/ .el-select-dropdown__item {
      padding: 0 20px;
    }
  }
  .invoice {
    width: 416px;
    /deep/ .el-form-item {
      margin-bottom: 28px;
    }
    /deep/ .el-form-item:nth-child(1) {
      margin-bottom: 8px;
      .el-form-item__error {
        margin-top: -2px;
      }
    }
    /deep/ .el-form-item:nth-child(2) {
      margin-bottom: 8px;
      .el-form-item__error {
        margin-top: -2px;
      }
    }
    /deep/ .el-form-item:nth-child(3) {
      margin-bottom: 8px;
      .el-form-item__error {
        margin-top: -2px;
      }
    }
    /deep/ .el-form-item:nth-child(4) {
      margin-bottom: 20px;
      .el-form-item__error {
        margin-top: -2px;
      }
    }
    .invoiceType {
      width: 416px;
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
  }
  .tit {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    margin-top: 40px;
    margin-bottom: 28px;
  }
  .brandForm {
    /deep/ .el-form-item__error {
      margin-top: -16px;
    }
  }
  .cont {
    margin: 30px 0 60px;
    .type {
      /deep/.el-radio {
        margin-right: 26px;
      }
    }
    .upload {
      margin-bottom: 12px;
      /deep/ .el-form-item {
        height: 102px;
      }
    }
    /deep/ .el-checkbox {
      margin-right: 20px;
    }
    /deep/.el-radio {
      margin-right: 14px;
    }
    .delBtn {
      margin-right: 20px;
      color: #1c77d2;
      cursor: pointer;
    }
    .addBtn {
      cursor: pointer;
      color: #1c77d2;
    }
    .numbox {
      font-size: 14px;
      /deep/ .el-form-item {
        margin-bottom: 28px;
        margin-right: 0;
      }
      /deep/ .el-input {
        width: 45px;
      }
      /deep/ .el-input__inner {
        padding: 0;
        text-align: center;
      }
      span {
        margin-right: 24px;
      }
      span:nth-child(3) {
        margin-right: 0;
      }
    }
  }
  .cascader {
    /deep/ .el-cascader {
      width: 415px;
      input::-webkit-input-placeholder {
        color: #333;
      }
      input:-moz-placeholder {
        color: #333;
      }
      input::-moz-placeholder {
        color: #333;
      }
      input:-ms-input-placeholder {
        color: #333;
      }
    }
  }
  .btns {
    margin-top: 20px;
    text-align: center;
    .btn {
      margin: 0 8px;
      &.btn-red {
        width: 224px;
        height: 44px;
        font-size: 16px;
      }
      &.lbtn-gray {
        width: 134px;
        height: 44px;
        font-size: 16px;
        border-color: #979797;
      }
    }
  }
}
</style>
