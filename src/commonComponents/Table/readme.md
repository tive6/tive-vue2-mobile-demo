<!--
 * @desc:
 * @author: zhangxin
 * @Date: 2020-08-28 13:44:00
 * @LastEditors: zhangxin
 * @LastEditTime: 2020-09-02 17:42:13
-->

基础 table 组件:

```vue live
<template>
<Card title="table">
  <Table :data="tableData" :columns="columns" @orderChange="handleSort" @rowClick="handleRowClick"/>
</Card>
</template>
<script>
import Card from '@/commonComponents/Card/Card.vue';
import Table from '@/commonComponents/Table/Table.vue';


export default {
  components: {
    Card,
    Table,
  },
  data() {
    return {
      tableData: [
        { dimName: 'test', 'leads_num': 100, dimRatio: 10, leadsNumNoYearRatio: 10 },
        { dimName: 'test', 'leads_num': 100, dimRatio: 10, leadsNumNoYearRatio: 10 },
        { dimName: 'test', 'leads_num': 100, dimRatio: 10, leadsNumNoYearRatio: 10 },
        { dimName: 'test', 'leads_num': 100, dimRatio: 10, leadsNumNoYearRatio: 10 },
        { dimName: 'test', 'leads_num': 100, dimRatio: 10, leadsNumNoYearRatio: 10 },
        { dimName: 'test', 'leads_num': 100, dimRatio: 10, leadsNumNoYearRatio: 10 },
      ],
      columns: [
        { label: '渠道', dataIndex: 'dimName', width: '15%', customerSlot: 'slotName' },
        { label: '线索量', dataIndex: 'leads_num', width: '30%', sortable: false, sortOrder: null },
        { label: '占比', dataIndex: 'dimRatio', width: '30%', sortable: true, sortOrder: null },
        { label: '环比', dataIndex: 'leadsNumNoYearRatio', width: '25%', sortable: true, sortOrder: 'asc' },
      ]
    };
  },
  methods: {
    handleSort({dataIndex, order}) {
      console.log('dataIndex %s, order %s', dataIndex, order);
    },
    handleRowClick(item) {
      console.log('row click: ', item);
    }
  }
}
</script>
```
自定义插槽

```vue live
<template>
<Card title="table">
  <Table :data="tableData" :columns="columns" @orderChange="handleSort" @rowClick="handleRowClick">
            <template v-slot:index="item">
            <div class="gas-num"
                 :class="{'gas-num-top':item.scope.rowIndex<3}">{{item.scope.data}}</div>
          </template>
  </Table>
</Card>
</template>
<script>
import Card from '@/commonComponents/Card/Card.vue';
import Table from '@/commonComponents/Table/Table.vue';


export default {
  components: {
    Card,
    Table,
  },
  data() {
    return {
      tableData: [
        { index: 1, 'leads_num': 100, dimRatio: 10, leadsNumNoYearRatio: 10 },
        { index: 2, 'leads_num': 100, dimRatio: 10, leadsNumNoYearRatio: 10 },
        { index: 3, 'leads_num': 100, dimRatio: 10, leadsNumNoYearRatio: 10 },
        { index: 4, 'leads_num': 100, dimRatio: 10, leadsNumNoYearRatio: 10 },
        { index: 5, 'leads_num': 100, dimRatio: 10, leadsNumNoYearRatio: 10 },
        { index: 6, 'leads_num': 100, dimRatio: 10, leadsNumNoYearRatio: 10 },
      ],
      columns:[
        { label: '排名', dataIndex: 'index', width: '15%', customerSlot: 'index' },
        { label: '城市', dataIndex: 'leads_num', width: '30%', sortable: false, sortOrder: null },
        { label: '新增加油订单量', dataIndex: 'dimRatio', width: '35%', sortable: false, sortOrder: null },
        { label: '占比', dataIndex: 'leadsNumNoYearRatio', width: '25%', sortable: false, sortOrder: 'asc' },
      ]
    };
  },
  methods: {
    handleSort({dataIndex, order}) {
      console.log('dataIndex %s, order %s', dataIndex, order);
    },
    handleRowClick(item) {
      console.log('row click: ', item);
    }
  }
}
</script>
```
自定义样式

```vue live
<template>
<Card title="table">
  <Table :data="tableData" className="colorRow" :columns="columns" @orderChange="handleSort" @rowClick="handleRowClick">
            <template v-slot:index="item">
            <div class="gas-num"
                 :class="{'gas-num-top':item.scope.rowIndex<3}">{{item.scope.data}}</div>
          </template>
  </Table>
</Card>
</template>
<script>
import Card from '@/commonComponents/Card/Card.vue';
import Table from '@/commonComponents/Table/Table.vue';


export default {
  components: {
    Card,
    Table,
  },
  data() {
    return {
      tableData: [
        { index: 1, 'leads_num': 100, dimRatio: 10, leadsNumNoYearRatio: 10 },
        { index: 2, 'leads_num': 100, dimRatio: 10, leadsNumNoYearRatio: 10 },
        { index: 3, 'leads_num': 100, dimRatio: 10, leadsNumNoYearRatio: 10 },
        { index: 4, 'leads_num': 100, dimRatio: 10, leadsNumNoYearRatio: 10 },
        { index: 5, 'leads_num': 100, dimRatio: 10, leadsNumNoYearRatio: 10 },
        { index: 6, 'leads_num': 100, dimRatio: 10, leadsNumNoYearRatio: 10 },
      ],
      columns:[
        { label: '排名', dataIndex: 'index', width: '15%', customerSlot: 'index' },
        { label: '城市', dataIndex: 'leads_num', width: '30%', sortable: false, sortOrder: null },
        { label: '新增加油订单量', dataIndex: 'dimRatio', width: '35%', sortable: false, sortOrder: null },
        { label: '占比', dataIndex: 'leadsNumNoYearRatio', width: '25%', sortable: false, sortOrder: 'asc' },
      ]
    };
  },
  methods: {
    handleSort({dataIndex, order}) {
      console.log('dataIndex %s, order %s', dataIndex, order);
    },
    handleRowClick(item) {
      console.log('row click: ', item);
    }
  }
}
</script>
```
