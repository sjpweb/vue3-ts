<!--
 * @Author: sjp
 * @Date: 2021-04-16 16:57:01
 * @LastEditTime: 2021-08-04 18:07:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\enterProcess\components\contactsForm.vue
-->
<template>
  <div>
    <div>
      <el-form
        ref="formDome"
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
        ref="basicFormDome"
        class="basicForm"
        :rules="basicFormRules"
        label-width="126px"
        style="width:526px;"
        :model="basicForm"
      >
        <div class="tit">网点基础信息</div>
        <div class="cont">
          <el-form-item label="网点所在地区：" prop="areaId">
            <el-cascader
              clearable
              v-model="basicForm.userStreetId"
              :props="props"
            >
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
        ref="oldMachineFormDome"
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
      <el-button type="primary" class="btn-red btn" @click="btnNext">
        {{ btnText }}
      </el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { checkPhone, checkEmail, checkName } from "@/utils/validate";
import CountDown from "@/components/CCountDown/index.vue";
import api from "@/api/common";
import { useStore } from "@/store";
import { ref, reactive, onBeforeMount, defineEmits } from "vue";
import { ElMessage } from "element-plus";
const store = useStore();
const userType = store.state.user.userInfo.userType;
const emit = defineEmits(["artificialCheck"]);
const btnText = ref<string>("");
const props = {
  lazy: true,
  value: "jdAreaId",
  label: "name",
  leaf: "leaf",
  expandTrigger: "hover",
  lazyLoad(node: any, resolve: (...age: any) => void) {
    const { level, data } = node;
    if (level === 0) {
      api.getProvinceList({}).then((res: any) => {
        resolve(res.data);
      });
    }
    if (level > 0) {
      api.getAreaList({ parent: data.jdAreaId }).then((res: any) => {
        if (res.data.length) {
          resolve(res.data);
        } else {
          return resolve(null);
        }
      });
    }
  },
};
const phoneCheck = ref<boolean>(false);
const EmailCheck = ref<boolean>(false);
const phoneFlag = ref<boolean>(true);
const phoneExpireFlag = ref<boolean>(true);
const emailFlag = ref<boolean>(true);
const emailExpireFlag = ref<boolean>(true);
const placeholder = ref<string>("");
const formDome = ref(null as HTMLFormElement | null);
const basicFormDome = ref(null as HTMLFormElement | null);
const oldMachineFormDome = ref(null as HTMLFormElement | null);
interface FormType {
  userName: string;
  userPhone: string;
  mobileCode?: string;
  userEmail: string;
  emailCode?: string;
}
interface BasicFormType {
  userProvinceId: string | number;
  userCityId: string | number;
  userCountyId: string | number;
  userStreetId: string | number;
  userAddress: string;
}
interface OldMachineFormType extends BasicFormType {
  oldMachineArea: number[];
  oldmachineDeliveryContractNo: string;
}
const form = ref<FormType>({
  userName: "",
  userPhone: "",
  mobileCode: "",
  userEmail: "",
  emailCode: "",
});
const basicForm = reactive<BasicFormType>({
  userProvinceId: "",
  userCityId: "",
  userCountyId: "",
  userStreetId: "",
  userAddress: "",
});
const oldMachineForm = reactive<OldMachineFormType>({
  userProvinceId: "",
  userCityId: "",
  userCountyId: "",
  userStreetId: "",
  userAddress: "",
  oldMachineArea: [],
  oldmachineDeliveryContractNo: "",
});
const rules = {
  userName: [{ required: true, trigger: "blur", validator: checkName }],
  userPhone: [{ required: true, trigger: "blur", validator: checkPhone }],
  mobileCode: [
    {
      required: true,
      trigger: "blur",
      validator: (
        rule: null,
        value: boolean,
        callback: (...args: any[]) => any
      ) => {
        if (!value) {
          return callback(new Error("请输入手机验证码"));
        } else {
          if (!phoneFlag.value) {
            return callback(new Error("手机验证码错误"));
          } else if (!phoneExpireFlag.value) {
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
      validator: (
        rule: null,
        value: boolean,
        callback: (...args: any[]) => any
      ) => {
        if (!value) {
          return callback(new Error("请输入邮箱验证码"));
        } else {
          if (!emailFlag.value) {
            return callback(new Error("邮箱验证码错误"));
          } else if (!emailExpireFlag.value) {
            return callback(new Error("邮箱验证码已过期"));
          }
          callback();
        }
      },
    },
  ],
};
const oldMachineFormRules = {
  oldMachineArea: [
    { required: true, message: "旧机收货地址不能为空", trigger: "blur" },
  ],
  userAddress: [
    { required: true, message: "详细地址不能为空", trigger: "blur" },
  ],
  oldmachineDeliveryContractNo: [
    { required: true, message: "合同编号不能为空", trigger: "blur" },
  ],
};
const basicFormRules = {
  areaId: [
    { required: true, message: "网点所在地区不能为空", trigger: "change" },
  ],
  userAddress: [
    { required: true, message: "网点详细地址不能为空", trigger: "change" },
  ],
};

onBeforeMount(() => {
  userType === 1 && (btnText.value = "下一步，人工审核");
  userType === 2 && (btnText.value = "下一步，提报能力");
  userType === 3 && (btnText.value = "下一步，签署入驻协议");
  userType === 5 && (btnText.value = "下一步，提交人工审核");
  // 网点不需要获取回显数据
  if (userType !== 3) {
    init();
  }
});
async function init() {
  const { data }: any = await api.queryPhoneInfoByUserId();
  form.value = data;
  if (userType === 5) {
    oldMachineForm.userAddress = data.userAddress;
    oldMachineForm.oldmachineDeliveryContractNo =
      data.oldmachineDeliveryContractNo;
    oldMachineForm.oldMachineArea[0] =
      data.userProvinceId && data.userProvinceId;
    oldMachineForm.oldMachineArea[1] = data.userCityId && data.userCityId;
    oldMachineForm.oldMachineArea[2] = data.userCountyId && data.userCountyId;
    oldMachineForm.oldMachineArea[3] = data.userStreetId && data.userStreetId;
    let areaId = [];
    data.userProvinceId && areaId.push(data.userProvinceId);
    data.userCityId && areaId.push(data.userCityId);
    data.userCountyId && areaId.push(data.userCountyId);
    data.userStreetId && areaId.push(data.userStreetId);
    const list: string[] = [];
    if (areaId[0]) {
      await getArea(api.getProvinceList, areaId, list, 0);
    }
    if (areaId[1]) {
      await getArea(api.getAreaList, areaId, list, 1);
    }
    if (areaId[2]) {
      await getArea(api.getAreaList, areaId, list, 2);
    }
    if (areaId[3]) {
      await getArea(api.getAreaList, areaId, list, 3);
    }
    let str = "";
    list.forEach((item, index) => {
      if (item) {
        str += `${item}${index === list.length - 1 ? "" : "/"}`;
      }
    });
    placeholder.value = str;
  }
}
async function getArea(
  api: (...args: any[]) => any,
  arr: number[],
  list: string[],
  i: number
) {
  const { data } = await api({ parent: i ? arr[i - 1] : null });
  const tempArr = data.filter(
    (item: { jdAreaId: number }) => item.jdAreaId === arr[i]
  );
  if (tempArr.length) {
    list.push(tempArr[0].name);
  }
}
// 获取手机验证码
function getTelCode() {
  if (formDome.value) {
    formDome.value.validateField("userPhone", (val: boolean) => {
      console.log(form.value.userPhone);
      if (!val) {
        phoneCheck.value = true;
        api.getPhoneCode({ mobile: form.value.userPhone }).then((res: any) => {
          ElMessage({
            center: true,
            duration: 2000,
            message: res.msg,
          });
          phoneCheck.value = false;
        });
      } else {
        phoneCheck.value = false;
      }
    });
  }
}
// 获取邮箱验证码
function getEmailCode() {
  if (formDome.value) {
    formDome.value.validateField("userEmail", (val: boolean) => {
      if (!val) {
        EmailCheck.value = true;
        api.getEmailCode({ email: form.value.userEmail }).then((res: any) => {
          ElMessage({
            center: true,
            duration: 2000,
            message: res.msg,
          });
          EmailCheck.value = false;
        });
      } else {
        EmailCheck.value = false;
      }
    });
  }
}
/**
 * update,根据userType不同,展示不同的页面,1代表采购商,2代表服务商,3代表网点
 * @param {string} 参数2 - 代表含义.
 */
function upData() {
  switch (userType) {
    //采购商
    case 1:
      emit("artificialCheck", 1, 1);
      break;
    //服务商
    case 2:
      emit("artificialCheck", 3);
      break;
    //网点
    case 3:
      emit("artificialCheck", 3);
      break;
    //拆解厂
    case 5:
      emit("artificialCheck", 3);
      break;
    default:
      break;
  }
}
async function btnNext() {
  let flag = false;
  let OutletsFlag = false;
  let nextFlag = false;
  let obj = form.value;
  if (formDome.value) {
    formDome.value.validate(async (valid: boolean) => {
      if (valid) {
        flag = true;
      }
    });
  }
  if (userType === 3 && basicFormDome.value) {
    basicFormDome.value.validate((valids: boolean) => {
      if (valids) {
        Object.assign(obj, {
          ...basicForm,
        });
        OutletsFlag = true;
      } else {
        OutletsFlag = false;
      }
    });
  }
  if (userType === 5 && oldMachineFormDome.value) {
    oldMachineFormDome.value.validate((valids: boolean) => {
      if (valids) {
        Object.assign(obj, {
          ...oldMachineForm,
        });
        OutletsFlag = true;
      } else {
        OutletsFlag = false;
      }
    });
  }
  nextFlag = userType === 3 || userType === 5 ? flag && OutletsFlag : flag;
  if (nextFlag) {
    api
      .updateUserMessage(obj)
      .then((result: any) => {
        if (result.code === 3006) {
          phoneFlag.value = false;
          formDome.value && formDome.value.validateField("mobileCode");
          phoneFlag.value = true;
          return;
        } else if (result.code === 3005) {
          phoneExpireFlag.value = false;
          formDome.value && formDome.value.validateField("mobileCode");
          phoneExpireFlag.value = true;
          return;
        }
        if (result.code === 3009) {
          emailFlag.value = false;
          formDome.value && formDome.value.validateField("emailCode");
          emailFlag.value = true;
          return;
        } else if (result.code === 3008) {
          emailExpireFlag.value = false;
          formDome.value && formDome.value.validateField("emailCode");
          emailExpireFlag.value = true;
          return;
        }
        if (userType === 3) {
          api.updateEntrySteps().then((res: any) => {
            if (res.code === 1000) {
              upData();
              flag = false;
              OutletsFlag = false;
              nextFlag = false;
            }
          });
          return;
        }
        upData();
        flag = false;
        OutletsFlag = false;
        nextFlag = false;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
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
