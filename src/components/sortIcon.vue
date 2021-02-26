<!--
 * @desc: 
 * @author: zhangxin
 * @Date: 2020-06-16 20:39:21
 * @LastEditors: zhangxin
 * @LastEditTime: 2020-06-28 11:37:24
--> 
<template>
  <div class="sort-icon"
       style="{...style}">
    <van-icon name="play"
              :class="{'sort-icon-action':types=='down'}"
              class='sort-icon-up' />
    <van-icon name="play"
              :class="{'sort-icon-action':types=='up'}"
              class='sort-icon-down' />
  </div>
</template>
<script>
export default {
  props: ['types'],
  methods: {
  }
}
</script>
<style lang="scss" >
.sort-icon-up {
  position: absolute;
  top: -6px;
  transform: rotate(-90deg);
}
.sort-icon-down {
  position: absolute;
  top: 6px;
  transform: rotate(90deg);
}
.sort-icon {
  position: relative;
  transform: scale(0.7);
  color: #999;
}
.sort-icon-action {
  color: #2877ff;
}
</style>