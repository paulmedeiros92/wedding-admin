import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { MdToolbar, MdButton, MdTabs } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(MdToolbar)
Vue.use(MdButton)
Vue.use(MdTabs)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
