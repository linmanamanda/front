import { fetch } from '@/utils/fetch'

/**
 * 用户登录
 * @param  {string} email    用户邮箱信息
 * @param  {string} password 用户密码信息
 * @return {[type]}          [description]
 */
export function login(email, password) {

  const data = {
    email,
    password
  }
  return fetch({
    url: '/logins',
    method: 'post',
    data
  })
}

