const state = {
  email: '',
  password: '',
  username: '',
  authority: '',
  status: ''
}

const mutations = {
  SET_EMAIL: (state, email) => {
    state.email = email
  },

  SET_USERNAME: (state, username) => {
    state.username = username
  },

  SET_AUTHORITY: (state, authority) => {
    state.authority = authority
  },

  SET_STATUS: (state, status) => {
    state.status = status
  },

  LOGOUT: (state) => {

  }
}

const actions = {
  login({ commit }, user) {
    
  }
}