const getters = {
  // user --> getter
  token: state => state.user.token,
  email: state => state.user.email,
  username: state => state.user.username,
  status: state => state.user.status,
  authority: state => state.user.authority,

  // app --> getter
  sidebarIsClosed: state => state.app.sidebarIsClosed
}

export default getters