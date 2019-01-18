import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import { Tab, Tabs, List, Tag, Actionsheet, Button, Icon, Panel } from 'vant'
import './assets/css/main.css'
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

Vue.use(VideoPlayer)
Vue.use(Tab).use(Tabs).use(List).use(Tag).use(Actionsheet).use(Button).use(Icon).use(Panel)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
