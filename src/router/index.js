import Vue from 'vue'
import Router from 'vue-router'
import LoginView from '../views/login/index'
import WelcomeView from '../views/welcome/index'
import UserView from '../views/user/index'
// import Layout from '@/components/common/Layout'
import Layout from '@/views/layout/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/layout',
      name: 'layout',
      component: Layout
    },
    // {
    //   path: '/administrations',
    //   name: 'administration',
    //   component: Layout,
    //   children: [
    //   {
    //     path: 'users',
    //     name: 'user',
    //     component: UserView
    //   },
    //   {
    //     path: 'welcomes',
    //     name: 'welcome',
    //     component: WelcomeView
    //   }]
    // }
  ]
})
