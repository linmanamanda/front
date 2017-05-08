import { fetch } from '@/utils/fetch'

export default {
  /**
   * 获取所有用户信息
   * @return {[type]} [description]
   */
  getUsers(params) {
    return fetch({
      url: '/users',
      method: 'get',
      params
    })
  }
}