import { fetch } from '@/utils/fetch'

export default {
  /**
   * 根据搜索条件获取相约信息
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  getInvitations(params) {
    return fetch({
      url: '/invitations',
      method: 'get',
      params
    })
  },
  /**
   * 修改相约信息
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  updateInvitation(data) {
    return fetch({
      url: '/invitations',
      method: 'patch',
      data
    })
  },
  /**
   * 删除相约信息
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  deleteInvitation(data) {
    return fetch({
      url: '/invitations',
      method: 'delete',
      data
    })
  }
}