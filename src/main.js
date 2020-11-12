import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

// HighCharts Vue
import HighchartsVue from 'highcharts-vue'
// import Highcharts from "highcharts"
// import darkUnica from "highcharts/themes/dark-unica"
// darkUnica(Highcharts);
Vue.use(HighchartsVue)

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
