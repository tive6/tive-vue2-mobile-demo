<template>
  <div class="tabs">
    <div v-for="(item, index) in tabs" :key="index" @click="switchType(item.type)" class="tab">
      <span :class="{'active': currentType===item.type}">{{item.name}}</span>
      <div :class="{'tab-active': currentType===item.type}"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tabs',
  model: {
    prop: 'checked',
    event: 'click'
  },
  props: {
    /**
     * 配置项
    **/
    tabs: {
      type: Array
    },
    checked: {
      type: String
    }
  },
  data() {
    return {
      currentType: ''
    };
  },
  created() {
    if (this.checked) {
      this.currentType = this.checked;
    } else {
      this.currentType = this.tabs[0].type;

      /**
       * 选中事件，参数是选中的tab类型
      **/
      this.$emit('change', this.currentType);
    }
  },
  methods: {
    switchType(type) {
      this.currentType = type;
      this.$emit('change', type);
    },
  },
  watch: {
    checked(value) {
      this.currentType = value;
    }
  }
}
</script>
<style lang="scss" scoped>
.tabs {
  display: flex;
  margin-top: 50px;

  .tab {
    margin-right: 30px;
    font-size: 24px;
    color: #666666;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .active {
    color: #333333;
    font-weight: bold;
  }
  .tab-active {
    margin-top: 10px;
    background-color: #2877ff;
    width: 32px;
    height: 6px;
    border-radius: 6px;
  }
}
</style>