export default {
  debug: true,
  state: {
    is_authenticated: window.localStorage.getItem('blog-token') ? true : false,
        // 用户登录后，就算刷新页面也能再次计算出 user_id
        user_id: window.localStorage.getItem('blog-token') ? JSON.parse(atob(window.localStorage.getItem('blog-token').split('.')[1])).user_id : 0
   },
   
  // 登录后 authenticated 状态设置为 True
  loginAction () {
    if (this.debug) { console.log('loginAction triggered') }
    this.state.is_authenticated = true
  },
  // 退出 authenticated 状态设置为 False
  logoutAction () {
    if (this.debug) console.log('logoutAction triggered')
    window.localStorage.removeItem('blog-token')
    this.state.is_authenticated = false
  }
}
