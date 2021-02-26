基础 tab 组件:

```vue live
<template>
  <Card title="tab">
    <Tabs v-model="defaultTab" :tabs="tabs" @change="handleOverviewTab"> </Tabs>
  </Card>
</template>
<script>
import Card from '@/commonComponents/Card/Card.vue';
import Tabs from '@/commonComponents/Tabs/Tabs.vue';

export default {
  components: {
    Card,
    Tabs,
  },
  data() {
    return {
      tabs: [
        { type: 'tab1', name: 'tab1' },
        { type: 'tab2', name: 'tab2' },
      ],
      default: 'tab1',
    };
  },
  methods: {
    change(type) {
      console.log('type: ', type);
    },
  },
};
</script>
```
