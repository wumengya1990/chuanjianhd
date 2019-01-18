import Vue from 'vue'
import Router from 'vue-router'

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
    },
    {
      path: '/teacher/tActivityList',
      name: 'tActivityList',
      component: () => import('./components/teacher/activityList.vue')
    },
    {
      path: '/teacher/tActivityContent',
      name: 'tActivityContent',
      component: () => import('./components/teacher/activityContent.vue')
    },
    {
      path: '/schoolAdmin/scActivityList',             //活动列表
      name: 'tActivityList',
      component: () => import('./components/schoolAdmin/activityList.vue')
    },
    {
      path: '/schoolAdmin/scActivityContent',          //活动内容
      name: 'tActivityContent',
      component: () => import('./components/schoolAdmin/activityContent.vue')
    }
  ]
})
