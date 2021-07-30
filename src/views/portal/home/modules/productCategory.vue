<!--
 * @Author: sjp
 * @Date: 2021-06-24 09:03:18
 * @LastEditTime: 2021-07-28 11:36:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\portal\home\modules\productCategory.vue
-->
<template>
  <div class="item" :style="{ width: width + '%' }">
    <div class="t">
      <img src="" alt="" />
      <span>{{ labelName }}</span>
    </div>
    <div class="c">
      <div>
        <a
          v-for="item in productList"
          :key="item.code"
          href="javascript:"
          @click="setItemCat(item.code)"
        >
          <img :src="item.imgUrl" />
          <p>{{ item.name }}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { ProductListType } from "../config";
const router = useRouter();
defineProps({
  width: {
    type: String,
    default: "",
  },
  labelName: String,
  productList: {
    default: (): ProductListType[] => [],
  },
});
function setItemCat(id: number) {
  router.push({
    path: "ispList",
    query: {
      itemCatId: id,
    },
  });
}
</script>
<style scoped lang="scss">
.item {
  padding: 16px 40px 38px;
  display: inline-block;
  text-align: center;
  font-size: 15px;
  &.i-3 {
    width: 27%;
  }
  &.i-4 {
    width: 33%;
  }
  &.i-2 {
    width: 20%;
  }
  .t {
    padding: 28px 0 24px;
    position: relative;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    text-align: left;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 14px;
    color: #000;

    &:before {
      content: "";
      background: url(~@/assets/images/ico-01.png) no-repeat center;
      width: 20px;
      height: 20px;
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
      background-size: cover !important;
    }
  }
  .c {
    & > div {
      & > a {
        width: 79px;
        display: inline-block;
        padding: 15px 0;
        color: #262626;
        &:hover {
          color: $red-color;
          box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }
      }
    }
    img {
      width: 40px;
      height: 40px;
    }
  }
  &:nth-child(2) .t:before {
    background: url(~@/assets/images/ico-02.png) no-repeat center;
  }
  &:nth-child(3) .t:before {
    background: url(~@/assets/images/ico-03.png) no-repeat center;
  }
  &:nth-child(4) .t:before {
    background: url(~@/assets/images/ico-04.png) no-repeat center;
  }
}
</style>
