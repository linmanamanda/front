import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:3001'

export default {
  get(url, params = {}) {
    const config = {
      url: url,
      method: 'get',
      params: params,
      responseType: 'json'
    }

    return axios.request(config)
  },
  
  post(url, data = {}) {
    const config = {
      url: url,
      method: 'post',
      data: data,
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'json'
    }

    return axios.request(config)
  },

  patch(url, data = {}) {
    const config = {
      url: url,
      method: 'patch',
      data: data,
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'json'
    }

    return axios.request(config)
  },

  put(url, data = {}) {
    const config = {
      url: url,
      method: 'put',
      data: data,
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'json'
    }

    return axios.request(config)
  },

  delete(url, data = {}) {
    const config = {
      url: url,
      method: 'delete',
      data: data,
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'json'
    }

    return axios.request(config)
  }
}