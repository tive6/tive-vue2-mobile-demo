<!--
 * @desc: 
 * @author: zhangxin
 * @Date: 2020-08-27 14:39:55
 * @LastEditors: zhangxin
 * @LastEditTime: 2020-09-16 18:14:04
-->
<template>
  <div class="components-ContrastBar"
       :style="{...defaultStyle,...bodyStyle}">
    <div class="Bar-left"
         :style="{background:colorList[0],width:width}"></div>
    <div class="Bar-middle"></div>
    <div class="Bar-right"
         :style="{background:colorList[1]}"></div>
    <div class=" flex-item-justify percentage"
         :style="{height:bodyStyle.height}">
      <div>{{percentage[0]}}%</div>
      <div>{{percentage[1]}}%</div>
    </div>
  </div>
</template>
<script>
import Utils from '@/common/utils'
export default {

  props: {
    /**
     * 样式.
     */
    bodyStyle: {
      type: Object,
      default: function () {
        return {
          height: '19px',
          width: '180px'
        }
      }
    },
    /**
      * 颜色修改.
      */
    colorList: {
      type: Array,
      default: function () {
        return [' #4E74FF', '#EFAB3B']
      }
    },
    /**
     * 展示数值.
     */
    data: {
      type: Array,
      default: function () {
        return [100, 100]
      }
    }
  },
  data () {
    return {
      percentage: [50, 50],
      width: '',
      defaultStyle: {
        height: '19px',
        width: '220px'
      }
    }
  },

  watch: {
    data: {
      handler (data) {
        this.calculateWide()
      },
      deep: true,
      immediate: true//首次渲染的时候执行
    }
  },
  methods: {
    calculateWide () {
      this.data[0] = parseFloat(this.data[0])
      this.data[1] = parseFloat(this.data[1])
      let sum = this.data[0] + this.data[1]
      let result = Utils.toOneDecimal((this.data[0] * 100) / sum, 1)
      this.percentage = [result, Utils.toOneDecimal(100 - result)]
      result = result < 5 ? 5 : result
      result = result > 95 ? 95 : result
      //都是0
      if (this.data[0] == 0 && this.data[1] == 0) {
        return this.width = 'calc(50% - 1px)'
      }
      this.width = `calc(${result}% - 1px)`
    }
  }
}
</script>
<style lang="scss" >
.components-ContrastBar {
  width: 100%;
  display: flex;
  position: relative;
  > div {
    transition: all 0.2s;
  }
  .Bar-left {
    width: 20%;
    border-radius: 100px * 2 0 0 100px * 2;
  }
  .Bar-middle {
    width: 2px * 2;
    background: white;
    height: 100%;
  }
  .Bar-right {
    flex: auto;
    border-radius: 0 100px * 2 100px * 2 0;
  }
  .percentage {
    font-size: 14px * 2;
    padding: 0 8px * 2;
    text-shadow: 0 0 3px * 2 rgba(0, 0, 0, 0.15);
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>