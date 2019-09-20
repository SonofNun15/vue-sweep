import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import BootstrapVue from 'bootstrap-vue';
import configIcons from './icons';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted(el) {
    // Focus the element
    el.focus();
  },
});

configIcons();

new Vue({
  router,
  store,
  render: (createElement) => createElement(App),
}).$mount('#app');
