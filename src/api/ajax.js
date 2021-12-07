import axios from 'axios';
import store from '@/store';
import { Toast, Dialog } from 'vant';

// axios.default.retry = 3 // 重试次数
// axios.default.retryDelay = 1000
const instance = axios.create({
  timeout: 5000,
});

// 不重定向白名单
const whiteList = ['/api/xx/xx', '/api/xx/xxx'];

// request拦截器
instance.interceptors.request.use(
  async (config) => {
    let token = store.getters['User/getUserToken'];
    config.headers['access-token'] = token;
    //无token拦截处理
    if (!token) {
      // do something
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

function getToken (config) {
  return new Promise((resolve) => {
    store.dispatch('User/getUserToken').then((response) => {
      // 原参数二次请求
      if (response) {
        config.config.headers['access-token'] = response;
      }
      axios.request(config.config).then((resetData) => {
        resolve(resetData);
      });
    });
  });
}
// 异步处理response请求
async function responseData (response) {
  const res = response.data;
  let code = res.Status !== undefined ? res.Status : res.code;
  if (res == 'SUCCESS') {
    code = 0
  }
  if (code + '' !== '0' && code + '' != '403') {
    // 过滤403
    if (+code === 40101 || +code === 401) {
      // token 过期续约
      return await getToken(response);
    }
  }
  return response;
}
instance.interceptors.response.use(responseData, (error) => {
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1 && !whiteList.includes(error.url)) {

    var newHttp = new Promise(function (resolve) {
      resolve();
    });
    // 返回一个promise实例，同时重新发起请求，config请求配置，包扩请求头和请求参数
    return newHttp
      .then(function () {
        return axios(error.config);
      })
      .catch((res) => {
        console.log('超时', res);
      });
  }
  return Promise.reject(new Error(`url=>【${response.config.url}】`));
});

export const ajax = (opts = {}) => {
  return new Promise((resolve, reject) => {
    let url = opts.url;
    let callback = opts.callback;
    instance({
      url: url,
      method: opts.method || 'GET',
      headers: Object.assign(
        {
          'content-type': 'application/json',
          'Cache-Control': 'no-transform',
        },
        opts.headers
      ),
      data: opts.data,
      params: opts.params,
    })
      .then((res) => {
        callback && callback(res);
        let data = null;
        if (res.data.hasOwnProperty('code') && res.data.code === 0) {
          data = res.data.records;
        } else {
          data = res.data.Result;
        }
        resolve(data);
      })
      .catch((e) => {
        console.log(e)
        reject(e);
      });
  });
};
