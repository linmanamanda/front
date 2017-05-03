import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login/index'
import Welcome from '../views/welcome/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome
    }
  ]
})
