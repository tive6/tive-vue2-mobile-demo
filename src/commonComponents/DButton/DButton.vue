<template>
  <div class="d-button-wrap">
    <div class="button-item left" style="border: 1px solid #2877ff;" @click="switchType('vendor')"
         :class="{'active': currentType==='vendor'}">
      厂商独号
    </div>
    <div class="button-item right" style="border: 1px solid #2877ff;" @click="switchType('dealer')"
         :class="{'active': currentType==='dealer'}">
      经销商线索
    </div>
  </div>
</template>
<script>
export default {
  name: 'DButton',
  props: {
    defaultButton: {
      type: String
    }
  },
  data() {
    return {
      currentType: 'vendor'
    };
  },
  methods: {
    switchType(type) {
      if (this.currentType === type) return;
      this.currentType = type;
      this.$emit('changeType', type);
    }
  },
  watch: {
    defaultButton(value) {
      this.currentType = value;
    }
  }
};
</script>
<style lang="scss" scoped>
.d-button-wrap {
  margin-bottom: 30px;
  display: flex;
  justify-content: center;

  .button-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 60px;
    box-sizing: border-box;
    font-size: 26px;
    color: #2877ff;
    border: 1px solid #2877ff; /* no */
    background: white;
  }

  .left {
    border-radius: 100px 0 0 100px;
    border-right: 0;
  }

  .right {
    border-radius: 0 100px 100px 0;
    border-left: 0;
  }

  .active {
    background-color: rgba(40, 119, 255, 1);
    color: #ffffff;
  }
}
</style>