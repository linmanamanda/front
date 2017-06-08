import Vue from 'vue'
import Router from 'vue-router'
import LoginView from '@/views/login'
import UserView from '@/views/user'
import HomeView from '@/views/home'
import InvitationView from '@/views/invitation'
import ReplyView from '@/views/reply'
import ReportUserView from '@/views/report/ReportUserView'
import ReportInvitationView from '@/views/report/ReportInvitationView'
import ReportReplyView from '@/views/report/ReportReplyView'
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
        path: 'reports/users',
        name: 'report_user',
        component: ReportUserView
      },
      {
        path: 'reports/replys',
        name: 'report_reply',
        component: ReportReplyView
      },
      {
        path: 'reports/invitations',
        name: 'report_invitation',
        component: ReportInvitationView
      },
      {
        path: 'charts',
        name: 'chart',
        component: ChartView
      }]
    },
  ]
})
