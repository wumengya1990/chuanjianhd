import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'links',
      component: () => import('./views/links.vue') 
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/activityContent',
      name: 'activityContent',
      component: () => import('./views/activityContent.vue')
    },
    {
      path: '/student/sActivityList',
      name: 'sActivityList',
      component: () => import('./components/student/activityList.vue')
    },
    {
      path: '/student/sActivityContent',
      name: 'sActivityContent',
      component: () => import('./components/student/activityContent.vue')
    }
  ]
})
