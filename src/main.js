import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "./assets/scss/style.scss";

import BootstrapVue from "./plugins/bootstrapVue.js";
import FontAwesome from "./plugins/fontawesome.js";

Vue.use(BootstrapVue);
Vue.use(FontAwesome);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
