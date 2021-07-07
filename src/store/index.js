import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import data from "./items.json"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: data
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
