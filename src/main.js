import 'babel-polyfill';
import App from './App.vue';
import router from './router/';
import store from './store/';
import axios from './axios/';

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

if (process.env.VUE_APP_VCONSOLE == 'show') {
  import("vconsole/dist/vconsole.min").then(Module => {
    new Module.default();
    console.log('版本：', process.env.VUE_APP_VERSION)
  });
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')