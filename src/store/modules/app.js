const state = {
  sidebar: {
    closed: localStorage.getItem('sidebarStatus') === 'true' ? true : false
  }
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    if (!state.sidebar.closed) {
      localStorage.setItem('sidebarStatus', true)
    } else {
      localStorage.setItem('sidebarStatus', false)
    }
    state.sidebar.closed = !state.sidebar.closed
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