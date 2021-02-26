并排 button 组件:

```vue live
<template>
  <Card title="dbutton">
    <DButton></DButton>
  </Card>
</template>
<script>
import Card from '@/commonComponents/Card/Card.vue';
import DButton from '@/commonComponents/DButton/DButton.vue';

export default {
  components: {
    Card,
    DButton
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
