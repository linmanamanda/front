import { login } from '@/api/login'

const state = {
  email: sessionStorage.getItem('email'),
  username: sessionStorage.getItem('username'),
  authority: sessionStorage.getItem('authority'),
  status: sessionStorage.getItem('status'),
  token: sessionStorage.getItem('token')
}

const mutations = {
  SET_EMAIL: (state, email) => {
    state.email = email
    sessionStorage.setItem('email', email)
  },

  SET_USERNAME: (state, username) => {
    state.username = username
    sessionStorage.setItem('username', username)
  },

  SET_AUTHORITY: (state, authority) => {
    state.authority = authority
    sessionStorage.setItem('authority', authority)
  },

  SET_STATUS: (state, status) => {
    state.status = status
    sessionStorage.setItem('status', status)
  },

  SET_TOKEN: (state, token) => {
    state.token = token
    sessionStorage.setItem('token', token)
  },

  LOGOUT: (state) => {

  }
}

const actions = {
  login({ commit }, user) {
    let email = user.email.trim()
    let password = user.password.trim()

    return new Promise((resolve, reject) => {
      login(email, password)
        .then((response) => {
          let code =  response.code

          if (code === 0) {

            let data = response.data
            let authority = data.authority

            if (authority === 0) {
              reject(new Error('当前身份为普通用户，权限不足'))
            } else {
              commit('SET_EMAIL', email)
              commit('SET_USERNAME', data.username)
              commit('SET_TOKEN', data.token)
              commit('SET_STATUS', data.status)
              commit('SET_AUTHORITY', data.authority)
              resolve()
            }
          } else {
            reject(response.error)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        commit('SET_TOKEN', '')
        commit('SET_EMAIL', '')
        commit('SET_USERNAME', '')
        commit('SET_STATUS', '')
        commit('SET_AUTHORITY', '')
        commit('SET_TOKEN', '')
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },
}

export default {
  state,
  mutations,
  actions
}