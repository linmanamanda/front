import { fetch } from '@/utils/fetch'

export function login(email, password) {
  const data = {
    email,
    password
  }
  return fetch({
    url: '/login',
    method: 'POST',
    data: data
  })
}

