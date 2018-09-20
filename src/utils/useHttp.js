import HttpReq from './HttpRequest'
let MyPlugin = {
  install: function (Vue,) {
    Vue.prototype.$httpFetch = HttpReq
  }
}

export default MyPlugin