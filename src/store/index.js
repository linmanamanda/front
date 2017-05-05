import Vue from 'vue'
import Vuex from 'vuex'
import breadcrumb from './modules/breadcrumb'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    breadcrumb
  }
})
