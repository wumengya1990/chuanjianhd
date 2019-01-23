import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'ConnectPage',
      component: () => import('./views/ConnectPage.vue') 
    },
    // {
    //   path: '/',
    //   name: 'links',
    //   component: () => import('./views/links.vue') 
    // },
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
      path: '/schoolAdmin/scActivityList',             //校管活动列表
      name: 'scActivityList',
      component: () => import('./components/schoolAdmin/activityList.vue')
    },
    {
      path: '/schoolAdmin/scActivityContent',          //校管活动内容
      name: 'scActivityContent',
      component: () => import('./components/schoolAdmin/activityContent.vue')
    },
    {
      path: '/areaAdmin/arActivityList',             //区管活动列表
      name: 'arActivityList',
      component: () => import('./components/areaAdmin/activityList.vue')
    },
    {
      path: '/areaAdmin/arActivityContent',          //区管活动内容
      name: 'arActivityContent',
      component: () => import('./components/areaAdmin/activityContent.vue')
    },
    {
      path: '/areaAdmin/createActivity',          //区管创建活动内容
      name: 'createActivity',
      component: () => import('./components/areaAdmin/createActivity.vue')
    },
    {
      path: '/charts',          //区管图表
      name: 'miancharts',
      component: () => import('./views/charts.vue')
    }
    
  ]
})

//添加路由过滤
router.beforeEach((to, from, next) => {
  if (to.meta.Authorize) {
    // 判断该路由是否需要登录权限
    if (window.localStorage.Token) {
      // 通过vuex state获取当前的token是否存在
      let uRole = Number(window.localStorage.userRole);
      if (uRole <= to.meta.userRole) {
        next();
      } else {
        next({
          path: "/shareSchool",
          query: {
            redirect: to.fullPath
          } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        });
      }
    } else {
      window.localStorage.setItem("Token", "");
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});

export default router;
