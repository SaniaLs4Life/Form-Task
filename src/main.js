import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import Container from './components/Container.vue'
import Success from './components/Success.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/userId/3', component: Container},
  {path: '/success', component: Success}
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.component('app-container', Container)
Vue.component('app-success', Success)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
