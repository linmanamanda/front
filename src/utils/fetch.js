import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

export default function _fetch(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: 'http://127.0.0.1:3001'
    })

    instance(options)
      .then((response) => {
        const res = response.data
        if (res.code !== 20000) {
          Message({
            message: res.message,
            type: 'error',
            duration: 5 * 1000
          })

          if (res.code ===  50008 || res.code === 50014 || res.code === 50012) {
            Message({
              message: res.message,
              type: 'error',
              duration: 5 * 1000
            })

            store.dispatch('logout')
              .then(() => {
                router.push('/login')
              })
          }
          reject(res)
        }
        resolve(res)
      })
      .catch((error) => {
        Message({
          message: '发生异常错误，请刷新页面重试或联系程序员',
          type: 'error',
          duration: 5 * 1000
        })
        reject(error)
      })
  })
}

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
          message: error,
          type: 'error',
          duration: 5 * 1000
        })
        reject(error)
      })
  })
}