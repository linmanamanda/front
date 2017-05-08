import Vue from 'vue'
import Router from 'vue-router'
import LoginView from '@/views/login'
import WelcomeView from '@/views/welcome'
import UserView from '@/views/user'
import HomeView from '@/views/home'
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
      path: '/administrations',
      name: 'administration',
      component: Layout,
      children: [
      {
        path: 'users',
        name: 'user',
        component: UserView
      },
      {
        path: 'homes',
        name: 'home',
        component: HomeView
      },
      {
        path: 'welcomes',
        name: 'welcome',
        component: WelcomeView
      }]
    },
  ]
})
