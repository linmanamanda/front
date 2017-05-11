import Vue from 'vue'
import Router from 'vue-router'
import LoginView from '@/views/login'
import WelcomeView from '@/views/welcome'
import UserView from '@/views/user'
import HomeView from '@/views/home'
import InvitationView from '@/views/invitation'
import ReplyView from '@/views/reply'
import ReportView from '@/views/report'
import ChartView from '@/views/chart'
import Layout from '@/views/layout/Layout'

Vue.use(Router)



export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/logins'
    },
    {
      path: '/logins',
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
        path: 'invitations',
        name: 'invitation',
        component: InvitationView
      },
      {
        path: 'replys',
        name: 'reply',
        component: ReplyView
      },
      {
        path: 'reports',
        name: 'report',
        component: ReportView
      },
      {
        path: 'charts',
        name: 'chart',
        component: ChartView
      },
      {
        path: 'welcomes',
        name: 'welcome',
        component: WelcomeView
      }]
    },
  ]
})
