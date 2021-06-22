import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Control from './views/Control.vue'
import Dashboard from './views/Dashboard.vue'

import Reportes from './views/Reportes.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Dashboard
    },
    {
      path: '/calidad',
      name: 'calidad',
      component: Control
    },
    {
      path: '/reportes',
      name: 'reportes',
      component: Reportes
    },
  ]
})
