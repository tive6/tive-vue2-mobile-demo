<!--
 * @desc: 
 * @author: zhangxin
 * @Date: 2020-07-02 11:04:35
 * @LastEditors: zhangxin
 * @LastEditTime: 2020-11-17 17:24:24
-->
<template>
  <div class="dialog-container"
       v-show="isShow">
    <div class="mo-overly"
         @touchmove.prevent></div>
    <div class="mo-dialog">
      <div class="mo-dialog-title"
           v-if="title"
           :class="{'mo-dialog-title-center':type==='2'}">{{ title }}
      </div>
      <div class="mo-dialog-close"
           v-show="hasClose"
           @click="closeDialog"></div>
      <div class="mo-dialog-content">
        <slot></slot>

        <!--                <div class="mo-dialog-list">-->
        <!--                    <div class="mo-dialog-subtitle">-->
        <!--                        <div class="mo-dialog-li-dot"></div>-->
        <!--                        <div class="mo-dialog-li-text">会员量(人)</div>-->
        <!--                    </div>-->
        <!--                    <div class="mo-dialog-list-desc">-->
        <!--                        <span class="mo-dialog-list-bold">提示：</span>-->
        <!--                        会员量是什么和什么的这是一个指标定义-->
        <!--                    </div>-->
        <!--                </div>-->

      </div>
      <div class="mo-dialog-close-btn"
           @click="closeDialog">我知道了
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '提示'
    },
    type: {
      type: String,
      default: '1'
    },
    hasClose: {
      type: Boolean,
      default: true,
    }
  },
  watch: {
    isShow: {
      handler(newVal, oldVal) {
        // console.log(newVal, oldVal)
        if (newVal === true) {
          this.body.classList.add('van-overflow-hidden');
        } else {
          // console.log(this.body)
          this.body.classList.contains('van-overflow-hidden') && this.body.classList.remove('van-overflow-hidden');
        }
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: false,
      // deep: true,
    },
  },
  data() {
    return {
      show: true,
      body: null,
    };
  },
  mounted() {
    this.body = document.querySelector('body');
    // console.log(this.body)
  },
  methods: {
    closeDialog() {
      this.$emit('on-dialog-close', 0);
    },
  }
};
</script>

<style lang="scss">

.mo-dialog {
  width: 300px*2;
  padding: 30px 5px 0 30px;

  .mo-dialog-close-btn {
    background-color: #2877FF;
    margin-bottom: 40px;
    margin-left: 10px;
    margin-right: 35px;
    border-radius: 10px;
  }
}
</style>
