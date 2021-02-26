<!--
 * @desc: 
 * @author: zhangxin
 * @Date: 2020-06-13 17:15:39
 * @LastEditors: zhangxin
 * @LastEditTime: 2020-08-24 17:39:47
--> 
<template>
  <div class='brand-table'>
    <div class="table-head">
      <div class="table-head-item"
           :class="{'table-head-item-action':item.sort=='up'||item.sort=='down'}"
           v-for="(item, index) in columns" :style="{...item.titleStyle}"
           @click="titleAction(item,index,'sort')" :key="index">{{item.title}}
        <SortIcon type='deflut' v-show="item.sort" :types="item.sort"
                  :style="{paddingLeft:'2px'}" />
      </div>
    </div>
    <div v-show='!noDate'>

      <div class="table-body-list" id='table-body-list' v-for="(obj, index) in asyncList"
           :key="index" @click="listAction(obj,index)">
        <div :style="{...item.style}" v-for="(item, i) in columns" :key="i"
             style="line-height:normal;">
          <!-- 各种类型列展示 目前可展示类型有:{id,text,colortext,progress} -->
          <template v-if="item.type=='id'">
            <div class="table-body-id"
                 :class="{'table-body-id-top':[1, 2, 3].some((num) => num ==obj[item.dataIndex])}">
              {{obj[item.dataIndex]}}</div>
          </template>
          <template v-else-if="item.type=='progress'">
            <div class="table-body-progress">
              <van-progress :percentage="initParentage(obj[item.dataIndex])" :show-pivot="false"
                            :style="{width:'30px',marginRight:'6px'}" track-color="#E6E9EF"
                            color="linear-gradient(20deg, #4F78FF 3%, #3680FF 100%)"
                            stroke-width="6" />
              <div>{{obj[item.dataIndex]*100>=0?`${Number(obj[item.dataIndex]*100).toFixed(1)}%`:'未合作'}}
              </div>
            </div>
          </template>
          <template v-else-if="item.type=='brand-icon'">
            <div class="brand-icon">{{obj[item.dataIndex]}}</div>

            <span class="brand-icon-text" v-show="obj['is_new_brand']>0"
                  :style="{left:textPosition(obj[item.dataIndex])}">新</span>

          </template>
          <template v-else-if="item.type=='conversion-icon'">
            <div class="brand-icon">{{obj[item.dataIndex].value}}</div>
            <span class="brand-icon-text brand-conversion-icon"
                  :style="{...obj[item.dataIndex].style,left:textPosition(obj[item.dataIndex].value)}">{{obj[item.dataIndex].text}}</span>

          </template>
          <template v-else-if="item.type=='ratio'">
            <div :class="{
              'color-red':parseInt(obj[item.dataIndex])<0,
              'color-green':parseInt(obj[item.dataIndex])>0
            }">{{obj[item.dataIndex]}}</div>
          </template>
          <template v-else>
            {{obj[item.dataIndex]}}
          </template>
        </div>
      </div>
      <div v-show="!noMore">
        <div class="list-more" @click="getMore(false)" v-show="more&&dataSource.length>5">
          展开更多
          <van-icon name="arrow-down" />
        </div>
        <div class="list-more" @click="getMore(true)" v-show="!more&&dataSource.length>5">
          收起
          <van-icon name="arrow-up" />
        </div>
      </div>

    </div>
    <div v-show='noDate' class="noDate">
      <img :src="require('@/assets/img/brand/no_data.png')" />
    </div>

  </div>
</template>

<script>
import { ChartInitMixin } from '@/mixins/index';
import SortIcon from '@/components/sortIcon';
import { Progress } from 'vant';
import Utils from '@/common/utils';
export default {
  props: ['columns', 'dataSource', 'dataName', 'orderByName', 'noMore'],
  components: {
    'van-progress': Progress,
    SortIcon,
  },
  data() {
    return {
      more: true,
      asyncList: [],
      default: 5,
      noDate: false
    };
  },
  watch: {
    dataSource: {
      handler(data) {
        if (this.dataSource.length > 0) {
          this.noDate = false;
        } else {
          this.noDate = true;
        }
        if ((this.dataSource.length > this.default) && this.more && this.noMore != true) {
          this.asyncList = this.dataSource.concat().slice(0, this.default);
        } else {
          //this.more = true
          this.asyncList = this.dataSource;
        }
      },
      deep: true,
      immediate: true//首次渲染的时候执行
    }
  },
  methods: {
    /**
     * @name: 触发展开更多||收起
     * @param {type} 
     * @return: 
     * @msg: 
     * @Author: zhangxin
     */
    getMore(type) {
      console.log('type', type);
      this.more = type;
      if (type == false) {
        this.asyncList = this.dataSource;
      } else {
        this.asyncList = this.asyncList.slice(0, this.default);
      }

      this.$emit('clickMore');

    },
    listAction(item, index) {
      this.$emit('listClickCallBack', { item, index });
    },
    titleAction(item, index, key) {
      this.$emit('titleClickCallBack', { item, index, key, dataName: this.dataName, orderByName: this.orderByName });
    },
    textPosition(text) {
      if (!text) return;

      let charLenth = Utils.getCharLength(text);
      if (charLenth <= 8) {
        return `${charLenth * 6}px`;
      }
      if (charLenth >= 10) {
        return `${60}px`;
      }
    },
    initParentage(num) {
      if (num == '-1') {
        return 0;
      }
      return num * 100 >= 100 ? 100 : num * 100;
    }
  }
}
</script>
<style lang="scss" >
.brand-table {
  transition: height ease-in-out 1s;
}
.table-head,
.table-body-list {
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}
.table-head > div {
  color: #999;
}
.brand-icon {
  width: 90%;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: normal;
}
.table-head-item {
  display: flex;
}
.table-head-item-action {
  color: #2877ff !important;
}
#table-body-list > div {
  font-size: 26px;
  line-height: 26px;
}
.table-body-progress {
  display: flex;
  align-items: center;
  padding-left: 12px * 2;
}
.table-body-id-top {
  background: rgba(40, 119, 255, 1) !important;
}
.table-body-id {
  background: #ccc;
  border-radius: 6px;
  font-size: 20px;
  color: #ffffff;
  text-align: center;
  width: 32px;
  height: 32px;
  line-height: 32px;
}
.list-more {
  width: 156px;
  margin: 12px auto;
  font-size: 28px;
  line-height: 50px;
  color: #666666;
  display: flex;
  align-items: center;
  justify-content: center;
  > i {
    margin-left: 12px;
  }
}
.brand-icon-text {
  white-space: nowrap;
  position: absolute;
  background: #fe4b4a;
  border-radius: 14px 14px 14px 0;
  top: -10 * 2px;
  color: #ffffff;
  font-size: 12px * 2;
  transform: scale(0.7);
  padding: 4px;
}
.brand-conversion-icon {
  transform: scale(0.8);
}
.noDate {
  text-align: center;
  > img {
    width: 96px;
    height: 106px;
    margin: auto;
  }
  margin-top: 40px;
  min-height: 200px;
}
.color-green {
  color: #23ab61;
}
.color-red {
  color: #fe4b4a;
}
</style>