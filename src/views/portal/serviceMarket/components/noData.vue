<!--
 * @Author: sjp
 * @Date: 2021-08-04 17:22:34
 * @LastEditTime: 2021-08-04 17:27:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\portal\serviceMarket\components\noData.vue
-->
<template>
  <div class="no-data">
    <img src="~@/assets/images/ico-nodata.png" class="ico" />
    <div class="txt">
      <p>抱歉，没有找到相关的商品！</p>
      <p>您可以缩短或修改搜索条件重新搜索。</p>
    </div>
  </div>
</template>
<style scoped lang="scss">
.no-data {
  background: #fff;
  height: 540px;
  text-align: center;
  font-size: 15px;
  display: table-cell;
  vertical-align: middle;
  width: 1200px;

  .ico {
    display: inline-block;
    vertical-align: middle;
    margin-right: 28px;
    width: 138px;
  }

  .txt {
    text-align: left;
    display: inline-block;
    vertical-align: middle;
    line-height: 2;
    color: $text-dgray-color;
  }
}
</style>
