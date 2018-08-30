import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Container from './components/Container.vue'
import Success from './components/Success.vue'

Vue.use(VueRouter)

Vue.component('app-container', Container)
Vue.component('app-success', Success)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
