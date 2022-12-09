import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import VueCookies from "vue-cookies";
import store from "./utils/store";
import moment from "moment"; //JavaScript日期处理库
import "element-ui/lib/theme-chalk/index.css";
import "/public/css/iconfont.css";
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueCookies);
Vue.prototype.$moment = moment;
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
