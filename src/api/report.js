import { fetch } from '@/utils/fetch'

export default {
  getUserReports(params) { // 获取用户举报信息
    return fetch({
      url: '/reports/users',
      method: 'get',
      params
    })
  },

  banUser(data) { //将用户信息的状态置为封禁
    return fetch({
      url: '/reports/users',
      method: 'patch',
      data
    })
  },

  deleteUserReport(data) { // 删除用户举报信息
    return fetch({
      url: '/reports/users',
      method: 'delete',
      data
    })
  },

  getInvitationReports(params) { // 获取相约举报信息
    return fetch({
      url: '/reports/invitations',
      method: 'get',
      params
    })
  },

  banInvitation(data) { // 将相约信息的状态置为封禁
    return fetch({
      url: '/reports/invitations',
      method: 'patch',
      data
    })
  },

  deleteInvitationReport(data) { // 删除相约举报信息
    return fetch({
      url: '/reports/invitations',
      method: 'delete',
      data
    })
  },

  getReplyReports(params) { // 获取评论举报信息
    return fetch({
      url: '/reports/replys',
      method: 'get',
      params
    })
  },

  banReply(data) { // 将评论信息的状态置为封禁
    return fetch({
      url: '/reports/replys',
      method: 'patch',
      data
    })
  },

  deleteReplyReport(data) { // 删除评论举报信息
    return fetch({
      url: '/reports/replys',
      method: 'delete',
      data
    })
  }
}