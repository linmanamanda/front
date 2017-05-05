import * as types from '../mutation-types'

const state = {
  breadcrumbList: [
    {
      href: '/administrations/users',
      title: '用户信息管理'
    }
  ]
}

const mutations = {
  [types.BREADCRUMB_IN](state, nav) {
    state.breadcrumbList.push(nav)
  },
  [types.BREADCRUMB_OUT](state) {
    state.breadcrumbList.pop()
  }
}

const getters = {
  breadcrumbList: state => state.breadcrumbList
}

const actions = {
  breadcrumbIn({ commit, state }, nav) {
    commit(types.BREADCRUMB_IN)
  },
  breadcrumbOut({ commit, state}) {
    commit(types.BREADCRUMB_OUT)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}