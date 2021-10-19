import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { serverUrl, getToken } from "./tools";

const instance = axios.create({
  baseURL: serverUrl, // 表示网络请求的基础地址
  timeout: 5000, // 网络请求超时时间
});

// Add a request interceptor
// 每一次发起请求之前执行
instance.interceptors.request.use(
  function(config) {
    NProgress.start(); // 启动进度条
    // Do something before request is sent
    config.headers["token"] = getToken(); // 在每一次请求之前设置token值
    // console.log(getToken());
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
// 每一次请求完成之后执行
instance.interceptors.response.use(
  function(response) {
    NProgress.done(); // 结束进度条

    // console.log("完成了");
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data; // 这里处理以下返回结果，只返回data数据
  },
  function(error) {
    NProgress.done(); // 结束进度条
    // console.dir(error);
    if (error.response?.status == 401) {
      window.location.href = "#/login"; // 如果401表示未授权，可以跳转到登录页
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

/**
 * 封装get请求
 * @param {*} url
 * @param {*} params
 * @returns
 */
export const get = (url, params) => instance.get(url, { params });

// export function get(url, params) {
//   return instance.get(url, { params: params });
// }

/**
 * post
 * @param {*} url
 * @param {*} data
 * @returns
 */
export const post = (url, data) => instance.post(url, data);

/**
 * put
 * @param {*} url
 * @param {*} data
 * @returns
 */
export const put = (url, data) => instance.put(url, data);

/**
 * del
 * @param {*} url
 * @returns
 */
export const del = (url) => instance.delete(url);
