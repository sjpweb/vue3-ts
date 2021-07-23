/*
 * @Author: znn 
 * @Date: 2019-01-11 15:29:04 
 * Modified by: znn
 * Modified time: 2019-01-28 17:59:41
 * @Last Modified by: zc
 * @Last Modified time: 2019-08-15 10:24:29
 */
<template>
  <em class="cpt-jd-price jdfont">
    <span class="unit">&yen;</span>
    <span class="int">{{splitPrice[0]}}</span>
    <span class="dot">.</span>
    <span class="decimals">{{splitPrice[1]}}</span>
  </em>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'JDPrice',
  props: {
    price: {
      type: [String, Number],
      default: 0
    }
  },
  computed: {
    splitPrice() {
      const p = (this.price + '').split('.')
      return p.length > 1 ? [p[0], (p[1] + '0').slice(0, 2)] : [p[0], '00']
    }
  }
}
</script>

<style lang="less">
.cpt-jd-price {
  font-style: normal;
  // font-family: 'jdprice';
  color: #f0250f;
  font-size: 22px;
  font-weight: 400;
  .int {
    font-size: 34px;
  }
}
</style>
