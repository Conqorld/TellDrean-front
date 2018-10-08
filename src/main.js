import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router'
import 'amfe-flexible'
import {Style, Button, Input, Textarea, Form, Toast, Picker, Dialog, DatePicker, Scroll} from 'cube-ui'
import HttpFtch from './utils/useHttp'
import Cookie from 'js-cookie'

let store = require('./store')

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (!Cookie.get('token') && to.name !== 'logIn' && to.name !== 'register') {
    next('/logIn')
  }else {
    next()
  }
})
Vue.use(VueRouter)
Vue.use(HttpFtch)
Vue.use(Button)
Vue.use(Input)
Vue.use(Textarea)
Vue.use(Form)
Vue.use(Toast)
Vue.use(Picker)
Vue.use(Dialog)
Vue.use(DatePicker)
Vue.use(Scroll)
Vue.config.productionTip = false
Vue.use(require('vue-moment'))
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
