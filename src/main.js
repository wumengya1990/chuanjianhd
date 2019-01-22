import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './assets/css/main.css'
import VideoPlayer from 'vue-video-player'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Tab, Tabs, List, Tag, Actionsheet, Button, Icon, Panel, Field, Popup, DatetimePicker, Notify, Stepper, PullRefresh, Cell } from 'vant'

Vue.prototype.$echarts = echarts 


require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')


Vue.use(VideoPlayer)
Vue.use(ElementUI)
Vue.use(Tab).use(Tabs).use(List).use(Tag).use(Actionsheet).use(Button).use(Icon).use(Panel).use(Field).use(Popup).use(DatetimePicker).use(Notify).use(Stepper).use(PullRefresh).use(Cell)

Vue.config.productionTip = false

// 处理ajax请求
// 引用API文件
import api from "./http.js";
// 将API方法绑定到全局
Vue.prototype.$api = api;


//清空字符串前后的空格
String.prototype.Trim = function () {
  return this.replace(/(^\s*)|(\s*$)/g, "");
}

//判断是否为空
let isNullOrEmpty = function (value) {
  if (value == null || value == undefined || value.toString().Trim() == "") {
    return true;
  } else {
    return false;
  }
}
//判断是否为空或0
let isNullOrZero = function (value) {
  if (value == null || value == undefined || value.toString().Trim() == "" || value == 0) {
    return true;
  } else {
    return false; 
  }
}

//加载loading数据
let vload = function (msg, timeOut) {
  let defMsg = "加载中...";
  if (!isNullOrEmpty(msg)) {
    defMsg = msg;
  }
  let defTimeOut = 0;
  if (!isNullOrEmpty(timeOut)) {
    defTimeOut = timeOut;
  }
  const toast = Toast.loading({
    duration: defTimeOut, // 持续展示 toast
    mask: true, // 是否显示背景蒙层
    message: defMsg
  });
  return toast;
}

Vue.prototype.$isNull = isNullOrEmpty;
Vue.prototype.$isZero = isNullOrZero;
Vue.prototype.$vloading = vload;

//全局通知方法
Vue.prototype.$vnotify = function (msg, timeOut, bgColor, color) {
  if (isNullOrEmpty(msg)) {
    return;
  }
  let defTimeOut = 3000;
  if (!isNullOrEmpty(timeOut)) {
    defTimeOut = timeOut;
  }
  let defBgColor = "#1989fa";
  if (!isNullOrEmpty(bgColor)) {
    defBgColor = bgColor;
  }
  let defColor = "#fff";
  if (!isNullOrEmpty(color)) {
    defColor = color;
  }
  Notify({
    message: msg,
    duration: defTimeOut,
    color: defColor,
    background: defBgColor
  });
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
