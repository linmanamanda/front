import { login } from '@/api/login'

const state = {
  email: '',
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

  SET_TOKEN: (state, token) => {
    state.token = token
  },

  LOGOUT: (state) => {

  }
}

const actions = {
  login({ commit }, user) {
    const email = user.email.trim()
    const password = user.password.trim()

    return new Promise((resolve, reject) => {
      login(email, password)
        .then((response) => {
          const code =  response.code

          if (code === 0) {

            const data = response.data
            const authority = data.authority

            if (authority === 0) {
              reject(new Error('您当前登录的用户权限不足，请切换用户！'))
            } else {
              const token = data.token
              localStorage.setItem('token', token)
              commit('SET_TOKEN', token)
              commit('SET_EMAIL', email)
              commit('SET_USERNAME', data.username)
              commit('SET_STATUS', data.status)
              commit('SET_AUTHORITY', data.authority)
              resolve()
            }
          } else if (code === 1) {
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
        commit('SET_STATUS', -1)
        commit('SET_AUTHORITY', -1)
        localStorage.removeItem('token')
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