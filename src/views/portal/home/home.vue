<template>
  <div class="home">
    <div
      class="i-banner"
      :style="{ backgroundImage: 'url(' + bannerPath + ')' }"
    ></div>
    <div class="index-box w">
      <div class="i-search">
        <el-input
          placeholder="请输入要查找的内容"
          v-model="facilitatorName"
          class="txt"
          @keyup.enter="search"
        >
        </el-input>
        <input type="submit" @click="search" value="搜索" class="btn" />
      </div>
      <div class="i-info">
        <CountItem
          labelName="服务品牌数"
          :iconUrl="icon1"
          :countNumber="allNum.buyer"
        ></CountItem>
        <CountItem
          labelName="服务商数"
          :iconUrl="icon2"
          :countNumber="allNum.facilitator"
        ></CountItem>
        <CountItem
          labelName="网点数"
          :iconUrl="icon3"
          :countNumber="allNum.site"
        ></CountItem>
        <CountItem
          labelName="师傅数"
          :iconUrl="icon4"
          :countNumber="allNum.siteEngineer"
        ></CountItem>
        <CountItem
          labelName="服务订单数"
          :iconUrl="icon5"
          :countNumber="allNum.order"
        ></CountItem>
      </div>

      <div class="i-classify">
        <ProductCategory
          labelName="大家电"
          width="27"
          :productList="HouseholdAppliances"
        ></ProductCategory>
        <ProductCategory
          labelName="厨卫电器"
          width="33"
          :productList="kitchenAppliances"
        ></ProductCategory>
        <ProductCategory
          labelName="3C/智能"
          width="20"
          :productList="intelligenceAppliances"
        ></ProductCategory>
        <ProductCategory
          labelName="生活电器"
          width="20"
          :productList="DailyAppliances"
        ></ProductCategory>
      </div>

      <div class="i-goodness">
        <div class="t">平台优势</div>
        <div class="c">
          <div class="item i-1">
            <b>全量资源</b>
            <p>整合全行业服务供应能力<br />海量资源随心选</p>
          </div>
          <div class="item i-2">
            <b>信息透明</b>
            <p>基于京东亿级工单大数据<br />搭建权威能力评价体系</p>
          </div>
          <div class="item i-3">
            <b>交易保障</b>
            <p>完善的信用等级认证<br />平台保障交易/交付全链路</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import CountItem from "./modules/countItem.vue";
import ProductCategory from "./modules/productCategory.vue";
import bannerPath from "@/assets/images/index-banner.png";
import { ElMessageBox } from "element-plus";
import icon1 from "@/assets/images/ico-n-1.png";
import icon2 from "@/assets/images/ico-n-2.png";
import icon3 from "@/assets/images/ico-n-3.png";
import icon4 from "@/assets/images/ico-n-4.png";
import icon5 from "@/assets/images/ico-n-5.png";
import api from "@/api/home";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { ElMessage } from "element-plus";
import { gsap } from "gsap";
import url from "@/config";
import {
  HouseholdAppliances,
  kitchenAppliances,
  intelligenceAppliances,
  DailyAppliances,
} from "./config";
import { ref, reactive, onMounted, computed } from "vue";
const router = useRouter();
const store = useStore();
const { baseUrl } = url;
const homeFlag = computed(() => store.state.user.homeFlag);
const serviceFlag = computed(() => store.state.user.serviceFlag);
const userInfo = computed(() => store.state.user.userInfo);
const { userCode, userType, popFlag } = userInfo.value;
interface MessageType {
  btn: string;
  btnWon: string;
  msg: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}
const allNum = reactive({
  buyer: 0,
  facilitator: 0,
  site: 0,
  siteEngineer: 0,
  order: 0,
});
const messageArr = ref<Array<MessageType>>([]);
const facilitatorName = ref<string>("");
onMounted(async () => {
  const taskArr = [];
  homeFlag.value && taskArr.push(getProductMessage());
  if (serviceFlag.value && userType == 2) taskArr.push(getProviderMessage());
  Promise.allSettled(taskArr).then(clearMessage);
});
// 消息弹窗
async function getProductMessage() {
  try {
    const { code, data }: any = await api.productCheck({ userCode });
    if (code === 1000) {
      if (data && data.length) {
        data.forEach((item: MessageType) => {
          item.onConfirm = () => {
            window.open(baseUrl);
          };
          item.onCancel = () => {
            store.dispatch("user/homeWindows", false);
          };
        });
        messageArr.value.unshift(...data);
      }
    }
  } catch (error) {
    console.error(error);
  }
}
// 服务商协议消息
async function getProviderMessage() {
  try {
    const { code, data }: any = await api.getProviderSign({ userCode });
    if (code === 1000) {
      if (data.contractId) {
        messageArr.value.push({
          msg: "有采购商与您签约，请前往商家后台-服务采购合同中确认",
          btn: "知道了",
          btnWon: "去商家后台",
          onConfirm: () => {
            // 自营服务商
            if (popFlag == 2) {
              api.updateContractState({ userCode }).then(() => {
                window.open(baseUrl);
              });
            } else {
              window.open(baseUrl);
            }
          },
          onCancel: () => {
            store.dispatch("user/homeServiceWindows", false);
          },
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
}
const clearMessage = async () => {
  // 备份原始body的overflow样式
  const orginalBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  const title = "消息提醒";

  const actionHandler = {
    confirm: (data: MessageType) => {
      const { onConfirm } = data;
      typeof onConfirm === "function" && onConfirm();
    },
    cancel: (data: MessageType) => {
      const { onCancel } = data;
      typeof onCancel === "function" && onCancel();
    },
  };
  const handleMessageConfirm = () => {
    return new Promise((resolve) => {
      const data = messageArr.value.shift();
      if (data) {
        const { msg, btnWon, btn } = data;
        ElMessageBox.confirm(
          userType == 2
            ? `<p style="text-align: left">${msg}<p>`
            : `<p>${msg}</p>`,
          title,
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: btnWon,
            cancelButtonText: btn,
            center: true,
            closeOnClickModal: false,
            callback: (action: string) => {
              const handler = Reflect.get(actionHandler, action);
              handler && handler(data);
              resolve(handleMessageConfirm());
            },
          }
        );
      } else {
        document.body.style.overflow = orginalBodyOverflow;
        resolve(true);
      }
    });
  };
  await handleMessageConfirm();
};
//首页数
infodata();
function infodata() {
  api.getData({}).then((res: any) => {
    if (res && res.data) {
      const { data } = res;
      gsap.to(allNum, { buyer: data.buyer, duration: 1 });
      gsap.to(allNum, { facilitator: data.facilitator, duration: 1 });
      gsap.to(allNum, { site: data.site, duration: 1 });
      gsap.to(allNum, { siteEngineer: data.siteEngineer, duration: 1 });
      gsap.to(allNum, { order: data.order, duration: 1 });
    }
  });
}
//搜索
function search() {
  if (!facilitatorName.value) {
    ElMessage({
      center: true,
      duration: 2000,
      message: "请输入要查找的内容！",
    });
    return;
  }
  router.push({
    path: "ispList",
    query: {
      facilitatorName: facilitatorName.value,
    },
  });
}
</script>
<style scoped lang="scss">
.home {
  .i-banner {
    background-position: center;
    background-repeat: no-repeat;
    height: 450px;
    min-width: 1200px;
    background-size: auto 100%;
  }
  .index-box {
    width: 1200px;
    margin: auto;
    margin-top: -136px;
    .i-search {
      display: flex;
      background: $white-color;
      height: 56px;
      border-radius: 4px;
      overflow: hidden;
      .txt {
        flex: 1;
        border: none;
        height: 56px;
        padding: 0 26px;
        font-size: 16px;
        /deep/.el-input__inner {
          border: none;
          height: 57px;
          padding: 0;
        }
      }
      .btn {
        background-image: linear-gradient(180deg, #ff9b20 0%, #ff721f 100%);
        color: $white-color;
        width: 200px;
        display: block;
        border: none;
        height: 56px;
        font-size: 18px;
        cursor: pointer;
      }
    }
    .i-info {
      display: flex;
      background: $white-color;
      border-radius: 12px;
      margin-top: 24px;
      box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
    }
    .i-classify {
      margin: 48px 0 24px;
      overflow: hidden;
      text-align: center;
      box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
      background: #fff;
      border-radius: 12px;
      margin-top: 24px;
    }
    .i-goodness {
      margin-bottom: 80px;
      .t {
        text-align: center;
        font-size: 27px;
        margin: 32px 0 18px;
        font-weight: 600;
      }
      .c {
        margin: 0 -6px;
        overflow: hidden;
      }
      .item {
        width: 391px;
        height: 166px;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 12px;
        overflow: hidden;
        color: $white-color;
        float: left;
        margin: 0 6px;
        font-size: 13px;
        line-height: 1.4;
        padding: 42px 30px;
        background-size: auto 100%;
        position: relative;

        &.i-1 {
          background-image: url(~@/assets/images/index-ad-1.png);
        }
        &.i-2 {
          background-image: url(~@/assets/images/index-ad-2.png);
        }
        &.i-3 {
          background-image: url(~@/assets/images/index-ad-3.png);
        }
        &:after {
          content: "";
          position: absolute;
          background: url(~@/assets/images/index-ad_bg.png) no-repeat center;
          background-size: 100%;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
        p {
          opacity: 0.9;
          position: relative;
          z-index: 3;
        }
        b {
          font-size: 22px;
          margin-bottom: 10px;
          display: block;
          font-weight: 400;
          position: relative;
          z-index: 3;
        }
      }
    }
  }
}
/deep/ .el-message-box .el-message-box__content {
  text-align: left !important;
}
.i-search {
  input {
    color: #fff !important;
  }
}
.cancelBtn {
  width: 90px;
  height: 32px;
  &:hover {
    color: #e75048;
  }
}
</style>
