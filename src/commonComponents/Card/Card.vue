<!--
 * @desc: 
 * @author: zhangxin
 * @Date: 2020-08-27 14:39:55
 * @LastEditors: zhangxin
 * @LastEditTime: 2021-01-22 18:00:41
-->
<template>
  <div :class="['components-card',className]">
    <FunnelDialog :state='funnelDialogState'
                  :type='funnelDialogType'
                  :changeState='setFunnelDialog'
                  :customText='customText' />
    <div class="flex-item-justify title">
      <div class="title-body"
           @click="setFunnelDialog(describeIndex)">
        <slot name="title">
          <span>{{title}}</span>
        </slot>
        <van-icon v-if="describeIndex"
                  name="question-o"
                  size="16"
                  color="#ccc" />
      </div>
      <span class="title-time"
            v-show="this.$slots.time">
        <!-- @slot 时间插槽 -->
        <slot name="time"></slot>
      </span>
    </div>
    <div class="subtitle"
         v-show="this.$slots.subtitle">
      <div class="subtitle-body">
        <!-- @slot 副标题插槽 -->
        <slot name="subtitle"></slot>
      </div>
    </div>
    <!-- 选项插槽 -->
    <div class="select"
         v-show="select.length>0">
      <div class="flex-item-justify select-body">
        <div v-for="(item, index) in select"
             :class="{'select-action':index==selectAction}"
             :key="index"
             v-show="selectShowType[index]"
             @click="changeSelectAction(index)">{{item}}</div>
      </div>
    </div>
    <!-- @slot 卡片内容 -->
    <div :class="!haveDate?'hide':''">
      <slot></slot>
    </div>

    <!-- 无数据展示样式 -->
    <div class="no-date-body"
         v-show="!haveDate">
      <img class="no-date"
           :src="require('@/assets/img/brand/no_data.png')" />
    </div>

  </div>
</template>
<script>
import FunnelDialog from '@/views/brand/components/funnel-dialog';
import { isEqual } from "lodash";
export default {
  components: {
    FunnelDialog,
  },
  props: {
    className: {
      type: String
    },
    /**
     * 卡片的名称.
     */
    title: {
      type: String,
      default: function () {
        return '';
      }
    },
    /**
     * 筛选项.
     */
    select: {
      type: Array,
      default: function () {
        return [];
      }
    },
    /**
     * 无数据展示.
     */
    haveDate: {
      type: Boolean,
      default: true
    },
    /**
     * 筛选项.
     */
    describeIndex: {
      type: [Boolean, Number],
      default: false
    },
    /**
     * 自定义卡片文案
     * false代表沿用以前逻辑
     * 传入Object{
                main:"一级标题",
                list:[
                  {
                    title:"二级标题",
                    des:"描述"
                  }
                ]
                
              }
        快捷展示文案
        传入String 自定义样式内部使用v-html解析
        "<div style=color:red>自定义</div>"
     */
    customText: {
      type: [Boolean, Object, String],
      default: false//false代表沿用以前逻辑 true代表新逻辑
    },
    /**
     * 筛选项权限展示
     */
    selectPermission: {
      type: [Array],
      default: () => []
    }
  },
  data () {
    return {
      funnelDialogState: false,
      funnelDialogType: 0,
      selectAction: 0,
      //selectShowType: []
    };
  },
  watch: {
    selectPermission: {
      handler (newVal, oldVal) {
        if (!isEqual(newVal, oldVal)) {
          this.selectAction = newVal.indexOf(true) !== -1 ? newVal.indexOf(true) : 0
        }
      },
      deep: true,
      immediate: true//首次渲染的时候执行
    },
  },
  computed: {
    selectShowType: function () {
      return this.selectPermission.length > 0 ? this.selectPermission : Array(this.select.length).fill(true)
    }
  },
  methods: {
    /**
     * @name: select权限控制
     * @param {*}
     * @return {*}
     * @msg: 
     * @Author: zhangxin
     */
    selectFillTrue () {

    },
    /**
     * @name: 弹窗状态
     * @param {type}
     * @return {type}
     * @msg:
     * @Author: zhangxin
     */
    setFunnelDialog (type) {
      this.funnelDialogState = !this.funnelDialogState;
      if (typeof type !== 'undefined') {
        this.funnelDialogType = type;
      }
    },
    changeSelectAction (index) {
      if (this.selectAction == index) {
        return;
      }
      this.selectAction = index;
      /**
       * @name: 切换select
       * @param {item}
       * @return {name,index}
       * @msg:
       * @Author: zhangxin
       * @public
       */
      this.$emit('changeSelect', {
        name: this.select[index],
        index: index
      });
    }
  }
}
</script>
<style lang="scss" >
.components-card {
  max-width: 1000px * 2;
  .flex-item-justify {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .hide {
    height: 0;
    width: 0;
    overflow: hidden;
  }
  .no-date-body {
    width: 100%;
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    .no-date {
      display: block;
      width: 48px * 2;
    }
  }
  background: white;
  padding: 15px * 2;
  box-shadow: 0 2px * 2 4px * 2 0 rgba(0, 0, 0, 0.05);
  border-radius: 8px * 2;
  min-height: 250px * 2;
  margin-bottom: 15px * 2;
  .title {
    .title-body {
      font-weight: bold;
      display: flex;
      align-items: center;
      > span {
        font-weight: bold;
        font-size: 16px * 2;
        margin-right: 4px * 2;
      }
    }
    .title-time {
      font-size: 13px * 2;
      color: #151515;
    }
  }
  .subtitle {
    display: flex;
    margin: 15px * 2 0;
    .subtitle-body {
      padding: 6px * 2 12px * 2 6px * 2 0;
      background-image: linear-gradient(270deg, #f5f5f5 23%, #ffffff 100%);
      border-radius: 16.5px * 2;
    }
  }
  .select-body {
    margin-top: 16px * 2;
    justify-content: center;
    > div {
      white-space: nowrap;
      padding: 5px * 2 10px * 2;
      margin-right: 10px * 2;
      font-size: 13px * 2;
      color: #666666;
    }
    > div:last-child {
      margin-right: 0;
    }
    > div.select-action {
      margin-right: 10px * 2;
      font-size: 13px * 2;
      color: #4e74ff;
      border-radius: 12px * 2;
      background: rgba(78, 116, 255, 0.1);
    }
    > div:last-child.select-action {
      margin-right: 0;
    }
  }
}
</style>
