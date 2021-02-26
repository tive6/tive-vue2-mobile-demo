<template>
  <div :class="['brand-table',className]">
    <template v-if="!noData">
      <div class="table-header">
        <div v-for="(item, index) in tableColumns" :key="index" class="header-item"
             :style="{'width':item.width}" @click="sortClick(item)">
          <span :class="{'active': item.sortOrder==='asc'||item.sortOrder==='desc'}">
            {{item.label}}
          </span>
          <template v-if="item.sortable">
            <div class="sort-icon-wrap">
              <div name="play" class="triangle up" :class="{'sort-active': item.sortOrder==='asc'}">
              </div>
              <div name="play" class="triangle down"
                   :class="{'sort-active': item.sortOrder==='desc'}"></div>
            </div>
          </template>
        </div>
      </div>
      <div class="table-body">
        <div v-for="(item, rowIndex) in tableData" :key="rowIndex" class="body-row"
             @click="rowClick(item)">
          <div v-for="(column, index) in tableColumns" :key="index" class="body-item ellipsis"
               :style="{'width': column.width}">
            <template v-if="column.dataIndex==='index'">
              <slot :name="column.customerSlot"
                    :scope="{data:item[column.dataIndex],rowIndex:rowIndex}">
                {{rowIndex|formatIndex}}
              </slot>
            </template>
            <template v-else>
              <slot :name="column.customerSlot"
                    :scope="{data:item[column.dataIndex],rowIndex:rowIndex, row: item}">
                {{item[column.dataIndex]}}
              </slot>
            </template>
          </div>
        </div>
      </div>
      <div v-if="maxLength<data.length" class="table-footer" @click="showMore">
        {{ moreData?'收起':'展开更多' }}
        <van-icon v-if="moreData" name="arrow-up" />
        <van-icon v-else name="arrow-down" />
      </div>
    </template>
    <template v-else>
      <div class="noDate">
        <img :src="require('@/assets/img/brand/no_data.png')" />
      </div>
    </template>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash';

export default {
  name: 'Table',
  props: {
    /**
 * 列配置项
 */
    columns: {
      type: Array,
      default: () => []
    },
    /**
 * 展示数据
 */
    data: {
      type: Array,
      default: () => []
    },
    /**
     * 默认展示最大行数
     */
    maxLength: {
      type: Number,
      default: () => 5
    },
    /**
     * 自定义样式名称
     */
    className: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      noData: false,
      moreData: false,
      tableColumns: [],
      tableData: [],
    };
  },
  methods: {
    rowClick(item) {
      this.$emit('rowClick', item);
    },
    sortClick(headerItem) {
      if (!headerItem.sortable) return;
      this.columns.map(item => {
        if (item.dataIndex !== headerItem.dataIndex) {
          item.sortOrder = null;
        }
      });
      if (headerItem.sortOrder === null) {
        headerItem.sortOrder = 'desc';
      }
      else if (headerItem.sortOrder === 'asc') {
        headerItem.sortOrder = 'desc';
      } else if (headerItem.sortOrder === 'desc') {
        // headerItem.sortOrder = null;
        headerItem.sortOrder = 'asc';
      }
      this.$emit('orderChange', {
        dataIndex: headerItem.dataIndex,
        order: headerItem.sortOrder
      });
    },
    showMore() {
      this.moreData = !this.moreData;
      const temp = cloneDeep(this.data);
      if (this.moreData) {
        // 展示五个
        this.tableData = temp;
      } else {
        // 展示全部
        this.tableData = temp.splice(0, this.maxLength);
      }
      // this.ellipsisMap = [];
      // this.tableData.map((item, index) => {
      // this.ellipsisMap.push({ show: false, index: index });
      // });
    },
  },
  watch: {
    columns: {
      handler(value) {
        this.tableColumns = value;
      },
      immediate: true,
      deep: true
    },
    data: {
      handler(value) {
        if (!value.length) {
          this.noData = true;
        } else {
          this.moreData = false;
          this.noData = false;
          this.tableData = cloneDeep(value).splice(0, this.maxLength);
          console.log('111111: ', this.tableData);
        }
      },
      immediate: true,
      deep: true
    }
  },
  filters: {
    formatIndex(value) {
      return value < 9 ? `0${value + 1}` : value + 1;
    }
  }
}
</script>
<style lang="scss" scoped>
.brand-table {
  .table-header {
    display: flex;
    height: 78px;
    align-items: center;
    .header-item {
      display: flex;
      font-size: 24px;
      color: #999999;
      width: 25%;
      &:last-child,
      &:nth-last-child(2) {
        justify-content: flex-end;
      }
    }
  }
  .table-body {
    .body-row {
      display: flex;
      height: 76px;
      align-items: center;
      // padding-left: 18px;
      .body-item {
        font-size: 26px;
        color: #333333;
        width: 25%;
        text-align: left;
        padding-right: 8px;
        &:last-child,
        &:nth-last-child(2) {
          text-align: right;
        }
      }
    }
  }
  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sort-icon-wrap {
    margin-left: 3px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .triangle {
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
    }
    .up {
      border-bottom: 8px solid #cccccc;
    }
    .down {
      border-top: 10px solid #cccccc;
    }
    .sort-active {
      border-bottom-color: rgba(40, 119, 255, 1);
      border-top-color: rgba(40, 119, 255, 1);
    }
  }

  .active {
    color: rgba(40, 119, 255, 1);
  }
  .table-footer {
    margin-top: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    color: #666666;
  }
  .noDate {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 180px * 2;
    img {
      display: block;
      width: 96px;
    }
  }
}
</style>