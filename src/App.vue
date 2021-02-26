<!--
 * @desc:
 * @author: zhangxin
 * @Date: 2020-06-13 10:42:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-29 15:51:41
-->
<template>
  <div id="app">
    <head-nav />
    <template v-if="process">
      <router-view v-if="!$route.meta.keepAlive"
                   :key="this.$route.path" />
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"
                     :key="this.$route.path" />
      </keep-alive>
    </template>
    <template v-else>
      <router-view v-if="isRouterAlive"
                   :key="this.$route.path" />
    </template>
  </div>
</template>

<script>
import HeadNav from '@/components/headNav.vue';

export default {
  name: 'App',
  components: {
    HeadNav,
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      process: false,
      isRouterAlive: true,
    };
  },
  created() {
    // 查看sessionStorage里面是否有存储信息，有就恢复
    if (sessionStorage.getItem('app-store')) {
      this.$store.replaceState({ ...this.$store.state, ...JSON.parse(sessionStorage.getItem('app-store')) });
    }
    // 刷新前保留store中存储的信息
    window.addEventListener('unload', () => {
      sessionStorage.setItem('app-store', JSON.stringify(this.$store.state));
    });
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>
