import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'
import Utils from './common/utils'
import Vuex from 'vuex'
import store from './store'
import filters from './common/filters'
import { ajax } from './api/ajax'
import 'lib-flexible'
import './assets/css/style.scss'

import {
  Icon, Popup, Toast, Dialog,
  Lazyload, Tabbar, TabbarItem,
} from 'vant'

const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  // 只有在测试环境开启
  // log日志
  // const Vconsole = require('vconsole');
  // new Vconsole();
}

Vue.use(Icon)
  .use(Popup)
  .use(Toast)
  .use(Dialog)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Lazyload, {});

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

// 引入基本模板
Vue.prototype.$http = {
  ajax,
}
Vue.prototype.$utils = Utils
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
