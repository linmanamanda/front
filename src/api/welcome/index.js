import rest from '@/api/index'
export default {
  name: 'Welcome API',
  getWelcomeInfo() {
    return rest.get('/welcomes')
  },
  postWelcomeInfo() {
    return rest.post('/welcomes', {
      email: 'linmanamanda@gmail.com',
      password: 'linman2491'
    })
  },
  putWelcomeInfo() {
    return rest.put('/welcomes', {
      email: 'linmanamanda@gmail.com',
      password: 'linman2491'
    })
  },
  patchWelcomeInfo() {
    return rest.patch('/welcomes', {
      email: 'linmanamanda@gmail.com',
      password: 'linman2491'
    })
  },
  deleteWelcomeInfo() {
    return rest.delete('/welcomes', {
      email: 'linmanamanda@gmail.com',
      password: 'linman2491'
    })
  }
}