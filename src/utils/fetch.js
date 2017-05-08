import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'
import store from '../store'

export function fetch(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: 'http://127.0.0.1:3001',
      timeout: 2000
    })
    instance(options)
      .then((response) => {
        const res = response.data
        resolve(res)
      })
      .catch((error) => {
        Message({
          message: '网络错误，请稍后再试！',
          type: 'error',
          showClose: true,
          duration: 0
        })
        // reject(error)
      })
  })
}

