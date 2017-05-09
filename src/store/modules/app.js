const state = {
  // 侧边栏是否处于闭合状态
  sidebarIsClosed: sessionStorage.getItem('sidebar_is_closed') === 'true' ? true : false
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    if (!state.sidebarIsClosed) {
      sessionStorage.setItem('sidebar_is_closed', true)
    } else {
      sessionStorage.setItem('sidebar_is_closed', false)
    }
    state.sidebarIsClosed = !state.sidebarIsClosed
  }
}

const actions = {
  toggleSideBar: ({ commit }) => {
    commit('TOGGLE_SIDEBAR')
  }
}


export default {
  state,
  mutations,
  actions
}