import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router'
import 'amfe-flexible'
import './cube-ui'
let store = require('./store')

const router = new VueRouter({
  routes
})

Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.use(require('vue-moment'))
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
