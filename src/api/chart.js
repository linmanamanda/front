import { fetch } from '@/utils/fetch'

export default {
  getCharts(params) {
    return fetch({
      url: '/charts',
      method: 'get',
      params
    })
  },
}