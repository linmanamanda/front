import { fetch } from '@/utils/fetch'

export default {
  /**
   * 根据搜索条件获取用户信息
   * @param  {object} params 搜索条件信息
   * @return {object} 包含用户信息的promise对象
   */
  getUsers(params) {
    return fetch({
      url: '/users',
      method: 'get',
      params
    })
  },

  /**
   * 修改用户信息
   * @param  {object} data [description]
   * @return {[type]}      [description]
   */
  updateUser(data) {
    return fetch({
      url: '/users',
      method: 'patch',
      data
    })
  },

  /**
   * 删除用户信息
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  deleteUser(data) {
    return fetch({
      url: '/users',
      method: 'delete',
      data
    })
  }
}