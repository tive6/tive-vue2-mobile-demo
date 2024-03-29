import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const _import = (path) => () => import(`@/views/${path}.vue`)

const routes = [
  {
    path: '/',
    name: 'home',
    component: _import('index'),
    meta: {
      title: 'Vue2.0 + VantUI',
    },
  },
  {
    path: '/swiper',
    name: 'swiper',
    component: _import('swiper'),
    meta: {
      title: 'swiper demo',
    },
  },
  {
    path: '*',
    redirect: '/',
  },
];

const routers = new Router({
  mode: 'history',
  base: '/tive-vue2-mobile-demo/',
  linkActiveClass: '',
  linkExactActiveClass: 'tive-item-active',
  routes: [
    ...routes
  ],
})

routers.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

routers.afterEach((to, from, next) => {
  window.scroll(0, 0)
})

export default routers
