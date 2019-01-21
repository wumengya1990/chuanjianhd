import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    userRole:0,
    apiUrl: window.localStorage.ApiUrl
  },
  mutations: {
    saveApiUrl(state, data) {
      state.apiUrl = data;
      window.localStorage.setItem("ApiUrl", data); //就是这里，保存到了 localStorage 中
      console.log("api写入Store与localStorage中：" + data);
    },
    saveToken(state, data) {
      state.token = data;
      window.localStorage.setItem("Token", data); //就是这里，保存到了 localStorage 中
      console.log("token写入Store与localStorage中：" + data);
    },
    saveRole(state, data) {
      state.userRole = data;
      window.localStorage.setItem("userRole", data);
      console.log("userRole写入Store与localStorage中：" + data);
    }

  },
  actions: {

  }
})
