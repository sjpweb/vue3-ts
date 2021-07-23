<!--
 * @Author: sjp
 * @Date: 2021-04-16 16:57:01
 * @LastEditTime: 2021-07-22 11:37:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\enterProcess\components\contactsForm.vue
-->
<template>
  <div>
    <div>
      <el-form
        ref="form"
        class="contactsForm"
        :rules="rules"
        label-width="112px"
        style="width:526px;"
        :model="form"
      >
        <div class="tit">入驻联系人信息</div>
        <div class="cont">
          <el-form-item label="联系人姓名：" prop="userName">
            <el-input
              maxlength="15"
              v-model="form.userName"
              placeholder="请输入联系人姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系人手机：" class="tel" prop="userPhone">
            <el-input v-model="form.userPhone" placeholder="请输入常用手机号">
              <template #prepend>中国 +86</template>
            </el-input>
          </el-form-item>
          <el-form-item id="phoneCode" label="手机验证码：" prop="mobileCode">
            <el-input
              v-model="form.mobileCode"
              placeholder="请输入手机验证码"
              style="width:calc(100% - 148px)"
            ></el-input>
            <CountDown
              class="btn-send"
              :isCheck="phoneCheck"
              @click="getTelCode"
            ></CountDown>
          </el-form-item>
          <el-form-item label="联系人邮箱：" prop="userEmail">
            <el-input
              v-model="form.userEmail"
              placeholder="请输入联系人邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱验证码：" prop="emailCode">
            <el-input
              v-model="form.emailCode"
              placeholder="请输入邮箱验证码"
              style="width:calc(100% - 148px)"
            ></el-input>
            <CountDown
              class="btn-send"
              :isCheck="EmailCheck"
              @click="getEmailCode"
            ></CountDown>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div>
      <!-- 网点才显示 -->
      <el-form
        v-show="userType === 3"
        ref="basicForm"
        class="basicForm"
        :rules="basicFormRules"
        label-width="126px"
        style="width:526px;"
        :model="basicForm"
      >
        <div class="tit">网点基础信息</div>
        <div class="cont">
          <el-form-item label="网点所在地区：" prop="areaId">
            <el-cascader clearable v-model="basicForm.areaId" :props="props">
            </el-cascader>
          </el-form-item>
          <el-form-item label="网点详细地址：" prop="userAddress">
            <el-input
              v-model="basicForm.userAddress"
              maxlength="20"
              placeholder="请输入网点详细地址"
            >
            </el-input>
          </el-form-item>
        </div>
      </el-form>
      <el-form
        v-show="userType === 5"
        ref="oldMachineForm"
        class="basicForm"
        :rules="oldMachineFormRules"
        label-width="126px"
        style="width:526px;"
        :model="oldMachineForm"
      >
        <div class="cont factory">
          <el-form-item label="旧机收货地址：" prop="oldMachineArea">
            <el-cascader
              clearable
              v-model="oldMachineForm.oldMachineArea"
              :props="props"
              :placeholder="placeholder"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item label="详细地址：" prop="userAddress">
            <el-input
              v-model="oldMachineForm.userAddress"
              maxlength="20"
              placeholder="请输入详细地址"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="合同编号：" prop="oldmachineDeliveryContractNo">
            <el-input
              v-model="oldMachineForm.oldmachineDeliveryContractNo"
              maxlength="20"
              placeholder="请输入合同编号"
            >
            </el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="btns">
      <button type="button" class="btn-red btn" @click="btnNext">
        {{ btnText }}
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { checkPhone, checkEmail, checkName } from "@/utils/validate";
import CountDown from "@/components/CCountDown";
import api from "@/api/common";
export default {
  data() {
    return {
      userType: this.$store.state.user.userInfo.userType,
      userId: this.$store.state.user.userInfo.id,
      btnText: "",
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
      telDisable: false,
      emailDisable: false,
      form: {
        userName: "",
        userPhone: "",
        mobileCode: "",
        userEmail: "",
        emailCode: "",
      },
      flag: false,
      rules: {
        userName: [{ required: true, trigger: "blur", validator: checkName }],
        userPhone: [{ required: true, trigger: "blur", validator: checkPhone }],
        mobileCode: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("请输入手机验证码"));
              } else {
                if (!this.phoneFlag) {
                  return callback(new Error("手机验证码错误"));
                } else if (!this.phoneExpireFlag) {
                  return callback(new Error("手机验证码已过期"));
                }
                callback();
              }
            },
          },
        ],
        userEmail: [{ required: true, trigger: "blur", validator: checkEmail }],
        emailCode: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("请输入邮箱验证码"));
              } else {
                if (!this.emailFlag) {
                  return callback(new Error("邮箱验证码错误"));
                } else if (!this.emailExpireFlag) {
                  return callback(new Error("邮箱验证码已过期"));
                }
                callback();
              }
            },
          },
        ],
      },
      basicForm: {
        areaId: [],
        userAddress: "",
      },
      basicFormRules: {
        areaId: [
          {
            required: true,
            message: "网点所在地区不能为空",
            trigger: "change",
          },
        ],
        userAddress: [
          {
            required: true,
            message: "网点详细地址不能为空",
            trigger: "change",
          },
        ],
      },
      oldMachineForm: {
        oldMachineArea: [],
        userAddress: "",
        oldmachineDeliveryContractNo: "",
      },
      oldMachineFormRules: {
        oldMachineArea: [
          { required: true, message: "旧机收货地址不能为空", trigger: "blur" },
        ],
        userAddress: [
          { required: true, message: "详细地址不能为空", trigger: "blur" },
        ],
        oldmachineDeliveryContractNo: [
          { required: true, message: "合同编号不能为空", trigger: "blur" },
        ],
      },
      phoneCheck: false,
      EmailCheck: false,
      phoneFlag: true,
      phoneExpireFlag: true,
      emailFlag: true,
      emailExpireFlag: true,
      placeholder: "",
    };
  },
  components: {
    CountDown,
  },
  created() {
    this.userType === 1 && (this.btnText = "下一步，人工审核");
    this.userType === 2 && (this.btnText = "下一步，提报能力");
    this.userType === 3 && (this.btnText = "下一步，签署入驻协议");
    this.userType === 5 && (this.btnText = "下一步，提交人工审核");
    // 网点不需要获取回显数据
    if (this.userType !== 3) {
      this.init();
    }
  },
  methods: {
    async init() {
      const { data } = await api.queryPhoneInfoByUserId({ id: this.userId });
      this.form = data;
      if (this.userType === 5) {
        this.oldMachineForm.userAddress = data.userAddress;
        this.oldMachineForm.oldmachineDeliveryContractNo =
          data.oldmachineDeliveryContractNo;
        this.oldMachineForm.oldMachineArea[0] =
          data.userProvinceId && data.userProvinceId;
        this.oldMachineForm.oldMachineArea[1] =
          data.userCityId && data.userCityId;
        this.oldMachineForm.oldMachineArea[2] =
          data.userCountyId && data.userCountyId;
        this.oldMachineForm.oldMachineArea[3] =
          data.userStreetId && data.userStreetId;

        let areaId = [];
        data.userProvinceId && areaId.push(data.userProvinceId);
        data.userCityId && areaId.push(data.userCityId);
        data.userCountyId && areaId.push(data.userCountyId);
        data.userStreetId && areaId.push(data.userStreetId);
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
      }
    },
    async getArea(api, arr, list, i) {
      const { data } = await api({ parent: i ? arr[i - 1] : null });
      const tempArr = data.filter((item) => item.jdAreaId === arr[i]);
      if (tempArr.length) {
        list.push(tempArr[0].name);
      }
    },
    // 获取手机验证码
    getTelCode() {
      this.$refs.form.validateField("userPhone", (val) => {
        if (!val) {
          this.phoneCheck = true;
          api.getPhoneCode({ mobile: this.form.userPhone }).then((res) => {
            // this.form.mobileCode = res.data
            this.$warning(res.msg);
            this.phoneCheck = false;
          });
        } else {
          this.phoneCheck = false;
        }
      });
    },
    // 获取邮箱验证码
    getEmailCode() {
      this.$refs.form.validateField("userEmail", (val) => {
        if (!val) {
          this.EmailCheck = true;
          api.getEmailCode({ email: this.form.userEmail }).then((res) => {
            this.$warning(res.msg);
            this.EmailCheck = false;
          });
        } else {
          this.EmailCheck = false;
        }
      });
    },
    /**
     * update,根据userType不同,展示不同的页面,1代表采购商,2代表服务商,3代表网点
     * @param {string} 参数2 - 代表含义.
     */
    upData() {
      switch (this.userType) {
        //采购商
        case 1:
          this.$parent.artificialCheck && this.$parent.artificialCheck(1, 1);
          break;
        //服务商
        case 2:
          this.$parent.artificialCheck && this.$parent.artificialCheck(3);
          break;
        //网点
        case 3:
          this.$parent.artificialCheck && this.$parent.artificialCheck(3);
        //拆解厂
        case 5:
          this.$parent.artificialCheck && this.$parent.artificialCheck(3);
          break;
        default:
          break;
      }
    },
    async btnNext() {
      let flag = false;
      let OutletsFlag = false;
      let nextFlag = false;
      this.form.id = this.userId;
      let obj = {
        userName: this.form.userName,
        userPhone: this.form.userPhone,
        userEmail: this.form.userEmail,
        mobileCode: this.form.mobileCode,
        emailCode: this.form.emailCode,
      };
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          flag = true;
        }
      });
      if (this.userType === 3) {
        this.$refs.basicForm.validate((valids) => {
          if (valids) {
            const areaId = this.basicForm.areaId;
            obj.userProvinceId = areaId[0] || "";
            obj.userCityId = areaId[1] || "";
            obj.userCountyId = areaId[2] || "";
            obj.userStreetId = areaId[3] || "";
            obj.userAddress = this.basicForm.userAddress;
            OutletsFlag = true;
          } else {
            OutletsFlag = false;
          }
        });
      }
      if (this.userType === 5) {
        this.$refs.oldMachineForm.validate((valids) => {
          if (valids) {
            const oldMachineArea = this.oldMachineForm.oldMachineArea;
            obj.userProvinceId = oldMachineArea[0] || "";
            obj.userCityId = oldMachineArea[1] || "";
            obj.userCountyId = oldMachineArea[2] || "";
            obj.userStreetId = oldMachineArea[3] || "";
            obj.userAddress = this.oldMachineForm.userAddress;
            obj.oldmachineDeliveryContractNo = this.oldMachineForm.oldmachineDeliveryContractNo;
            OutletsFlag = true;
          } else {
            OutletsFlag = false;
          }
        });
      }

      nextFlag =
        this.userType === 3 || this.userType === 5 ? flag && OutletsFlag : flag;
      if (nextFlag) {
        api
          .updateUserMessage(obj)
          .then((result) => {
            if (result.code === 3006) {
              this.phoneFlag = false;
              this.$refs.form.validateField("mobileCode");
              this.phoneFlag = true;
              return;
            } else if (result.code === 3005) {
              this.phoneExpireFlag = false;
              this.$refs.form.validateField("mobileCode");
              this.phoneExpireFlag = true;
              return;
            }
            if (result.code === 3009) {
              this.emailFlag = false;
              this.$refs.form.validateField("emailCode");
              this.emailFlag = true;
              return;
            } else if (result.code === 3008) {
              this.emailExpireFlag = false;
              this.$refs.form.validateField("emailCode");
              this.emailExpireFlag = true;
              return;
            }
            if (this.userType === 3) {
              api.updateEntrySteps().then((res) => {
                if (res.code === 1000) {
                  this.upData();
                  flag = false;
                  OutletsFlag = false;
                  nextFlag = false;
                }
              });
              return;
            }
            this.upData();
            flag = false;
            OutletsFlag = false;
            nextFlag = false;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
<style scoped lang="scss">
.contactsForm {
  width: 904px;
  margin: auto;
  padding: 46px 0 0px 0;
  .tit {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }
  .cont {
    margin: 28px 0 62px;
    .el-form-item {
      margin-top: 28px;
    }
  }
}
.basicForm {
  width: 904px;
  margin: auto;
  .tit {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }
  .cont {
    margin: 28px 0 62px;
    .el-form-item {
      margin-top: 28px;
    }
    /deep/ .el-cascader {
      width: 400px;
    }
  }
  .factory {
    margin-top: -28px;
    /deep/ .el-form-item:nth-child(1) {
      margin-top: 0;
    }
  }
}
.btns {
  margin-top: 20px;
  text-align: center;
  margin-bottom: 84px;
  .btn {
    margin: 0 8px;
    &.btn-red {
      width: 224px;
      height: 44px;
      font-size: 16px;
    }
  }
}
</style>
