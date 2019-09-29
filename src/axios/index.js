import {
  resolve
} from "any-promise";

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // let userInfo = getUserInfo();
  // if (userInfo.token) {
  //   config.headers['token'] = userInfo.token;
  // }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
const http = {
  post(service, params) {
    return new Promise((resolve, reject) => {
      axios.post(service, params).then(res => {
        fnSuccess(res, resolve)
      }).catch(err => {
        reject(err)
      })
    })
  }
};
const fnSuccess = (data, resolve) => {
  resolve(data)
}
export default http;