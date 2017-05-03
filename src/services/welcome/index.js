import rest from '@/services/index'
export default {
  name: 'Welcome API',
  getWelcomeInfo() {
    return rest.get('/welcome')
  },
  postWelcomeInfo() {
    return rest.post('/welcome', {
      email: 'linmanamanda@gmail.com',
      password: 'linman2491'
    })
  },
  putWelcomeInfo() {
    return rest.put('/welcome', {
      email: 'linmanamanda@gmail.com',
      password: 'linman2491'
    })
  },
  patchWelcomeInfo() {
    return rest.patch('/welcome', {
      email: 'linmanamanda@gmail.com',
      password: 'linman2491'
    })
  },
  deleteWelcomeInfo() {
    return rest.delete('/welcome', {
      email: 'linmanamanda@gmail.com',
      password: 'linman2491'
    })
  }
}