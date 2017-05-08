const getters = {
  token: state => state.user.token,
  email: state => state.user.email,
  username: state => state.user.username,
  status: state => state.user.status,
  authority: state => state.user.authority
}

export default getters