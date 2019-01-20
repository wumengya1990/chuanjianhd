import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import { Tab, Tabs, List, Tag, Actionsheet, Button, Icon, Panel, Field, Popup, DatetimePicker  } from 'vant'
import './assets/css/main.css'
import VideoPlayer from 'vue-video-player'


import echarts from 'echarts'

Vue.prototype.$echarts = echarts 


require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')


Vue.use(VideoPlayer)
Vue.use(Tab).use(Tabs).use(List).use(Tag).use(Actionsheet).use(Button).use(Icon).use(Panel).use(Field).use(Popup).use(DatetimePicker)



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
