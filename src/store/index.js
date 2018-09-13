import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

export default new vuex.Store({
  state: {
    yearStore: null,
    mouthStore: null
  },
  mutations: {
    setYear (state, year) {
      state.yearStore = year
    },
    setMouth (state, mouth) {
      state.mouthStore = mouth
    }
  },
  actions: {
    setDate (context, date) {
      context.commit('setYear', date.year)
      context.commit('setMouth', date.mouth)
    }
  }
})
