import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Vant from "vant";
import "vant/lib/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { serverUrl } from "./utils/tools";

// 全局过滤器
Vue.filter("imgDal", (val) => {
  // console.log(val)
  if (val) {
    if (val.startsWith("http")) {
      return val;
    }
    return serverUrl + val;
  } else {
    return "https://img1.baidu.com/it/u=300038710,3137349852&fm=26&fmt=auto&gp=0.jpg";
  }
});
Vue.use(ElementUI);
Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
