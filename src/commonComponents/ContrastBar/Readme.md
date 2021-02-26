<!--
 * @desc: 
 * @author: zhangxin
 * @Date: 2020-08-28 13:44:00
 * @LastEditors: zhangxin
 * @LastEditTime: 2020-09-01 10:18:18
-->
对比进度条组件:

```vue live
<template>
        <ContrastBar :data="[1500,300]"></ContrastBar>
</template>
```
自定义进度条颜色
```vue live
<template>
        <ContrastBar :data="[500,300]" :colorList="['#4CB1FF','#1ED7D6']"></ContrastBar>
          </template>
```
自定义进度条颜色
```vue live
<template>
        <ContrastBar :data="[500,300]" :colorList="['#DEAEC4','#8DB253']"   :bodyStyle="style"/>
  </template>
<script>
  export default {
    data() {
      return { style:{height:'30px',width:'300px'}}
    },
  }
</script> 
        
```