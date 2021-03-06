import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuelidate from 'vuelidate';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import store from './store';

Vue.use(VueMaterial);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
