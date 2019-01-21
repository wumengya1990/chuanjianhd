import Vue from 'vue'
import router from './router'
import axios from 'axios'
// 配置API接口地址
var root = window.localStorage.ApiUrl;

// 引用axios
// var axios = require("axios");
// 自定义判断元素类型JS
function toType(obj) {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase();
}
// 参数过滤函数
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key];
    }
    if (toType(o[key]) === "string") {
      o[key] = o[key].trim();
    } else if (toType(o[key]) === "object") {
      o[key] = filterNull(o[key]);
    } else if (toType(o[key]) === "array") {
      o[key] = filterNull(o[key]);
    }
  }
  return o;
}

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (window.localStorage.Token) { //store.state.token 获取不到值
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = "Bearer " + window.localStorage.Token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          window.localStorage.setItem("Token", "");
          // 返回 401 清除token信息并跳转到登录页面
          router.replace({
            path: "/login",
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
      }
    }
    return Promise.reject(error.response.data); // 返回接口返回的错误信息
  }
);
/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/
//接口访问
function apiAxios(method, url, params, success, failure) {
  if (params) {
    params = filterNull(params);
  }
  if (root == undefined || root == "") {
    root = Vue.prototype.apiUrl;
    console.log("root未取得值，获取全局变量apiUrl:" + root);
  }
  axios({
      method: method,
      url: url,
      data: method === "POST" || method === "PUT" ? params : null,
      params: method === "GET" || method === "DELETE" ? params : null,
      baseURL: root,
      // `headers` 是即将被发送的自定义请求头
      withCredentials: false
    })
    .then(res => {
      success(res.data);
    })
    .catch(err => {
      if (failure == undefined) {
        if (err.hasOwnProperty("response")) {
          let res = err.response;
          if (err.hasOwnProperty("status")) {
            console.log("Api接口错误, HTTP CODE: " + res.status);
          }
          console.log(res);
        } else {
          console.log(err);
        }
      } else {
        failure(err);
      }
    });
}
//上传文件
function axiosFile(url, params, success, failure) {
  let formParam = new FormData();
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      formParam.append(key, params[key]);
    }
  }
  axios({
      method: 'post',
      url: url,
      data: formParam,
      baseURL: root,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: false
    })
    .then(res => {
      success(res.data);
    })
    .catch(err => {
      if (failure == undefined) {
        if (err.hasOwnProperty("response")) {
          let res = err.response;
          if (err.hasOwnProperty("status")) {
            console.log("Api接口错误, HTTP CODE: " + res.status);
          }
          console.log(res);
        } else {
          console.log(err);
        }
      } else {
        failure(err);
      }
    });
}
//附件下载
function downloadFile(url, params) {
  axios({
      method: "GET",
      url: url,
      params: params,
      responseType: "blob",
      baseURL: root, //"http://192.168.0.112:8086",
      // `headers` 是即将被发送的自定义请求头
      withCredentials: false
    })
    .then(res => {
      if (res.status === 200 && res.data) {
        let urlObject = window.URL || window.webkitURL || window;
        let blob = new Blob([res.data]); // 假设文件为pdf
        //let ahref = root + "/BKFiles/" + params.filePath;
        let link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        link.href = urlObject.createObjectURL(blob);
        link.download = params.fileName;
        link.click();
        link.remove();
      } else {
        // 其它情况
      }
    })
    .catch(err => {
      if (err.hasOwnProperty("response")) {
        let res = err.response;
        if (err.hasOwnProperty("status")) {
          console.log("Api接口错误, HTTP CODE: " + res.status);
        }
        console.log(res);
      } else {
        console.log(err);
      }
    });

}
//打开下载文件
function openFile(name, path) {
  window.open(
    root +
    "/api/Base/DownLoad" +
    "?fileName=" +
    name +
    "&filePath=" +
    path
  );
}

// 返回在vue模板中的调用接口
export default {
  get: function (url, params, success, failure) {
    return apiAxios("GET", url, params, success, failure);
  },
  post: function (url, params, success, failure) {
    return apiAxios("POST", url, params, success, failure);
  },
  put: function (url, params, success, failure) {
    return apiAxios("PUT", url, params, success, failure);
  },
  delete: function (url, params, success, failure) {
    return apiAxios("DELETE", url, params, success, failure);
  },
  uploadFile: function (url, params, success, failure) {
    return axiosFile(url, params, success, failure);
  },
  downloadFile: function (url, params) {
    return downloadFile(url, params);
  },
  openFile: function (name, path) {
    return openFile(name, path);
  },
  apiUrl: root
};
