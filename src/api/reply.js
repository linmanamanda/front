import { fetch } from '@/utils/fetch'

export default {
  /**
   * 根据搜索条件获取评论信息
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  getReplys(params) {
    return fetch({
      url: '/replys',
      method: 'get',
      params
    })
  },
  /**
   * 修改评论信息
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  updateReply(data) {
    return fetch({
      url: '/reply',
      method: 'patch',
      data
    })
  },
  /**
   * 删除评论信息
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  deleteReply(data) {
    return fetch({
      url: '/reply',
      method: 'delete',
      data
    })
  }
}