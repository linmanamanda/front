import { fetch } from '@/utils/fetch'

export default {
  /**
   * 根据搜索条件获取相约信息
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  getUserReports(params) {
    return fetch({
      url: '/reports/users',
      method: 'get',
      params
    })
  },
  /**
   * 修改相约信息
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  updateUserReport(data) {
    return fetch({
      url: '/reports/users',
      method: 'patch',
      data
    })
  },
  /**
   * 删除相约信息
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  deleteUserReport(data) {
    return fetch({
      url: '/reports/users',
      method: 'delete',
      data
    })
  }
}