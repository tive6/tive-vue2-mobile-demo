<!--
 * @desc: 
 * @author: zhangxin
 * @Date: 2020-08-28 13:44:00
 * @LastEditors: zhangxin
 * @LastEditTime: 2020-09-01 15:30:45
-->
基础卡片组件:

```vue live
<Card title='卡片标题' :select="['全部','单一']" >

卡片内容<br/><br/>
卡片内容<br/><br/>
卡片内容<br/><br/>
卡片内容<br/><br/>

<template v-slot:time>2020.01.01</template>
<template v-slot:subtitle>首次加油订单量占比:53%</template>
</Card>
```