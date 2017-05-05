<template>
  <el-menu mode="vertical" theme="dark" :default-active="$route.path">
    <template v-for="item in permissRouters" v-if="!item.hidden">
      <router-link :to="item.path" v-if="!item.sub">
        <el-menu-item :index="item.path">
          <i :class="`${item.icon}`" class="iconfont"></i>
          <span>{{item.title}}</span>
        </el-menu-item>
      </router-link>
      <el-submenu v-else :index="item.path">
        <template slot="title">
          <i :class="`${item.icon}`" class="iconfont"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item-group>
          <router-link :to="subItem.path" v-for="subItem in item.sub">
            <el-menu-item :index="subItem.path">{{subItem.title}}</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
  const permissRouters = [
    {
      title: '用户信息管理',
      icon: 'icon-mine_fill',
      path: '/administrations/users',
      hidden: false,
    },
    {
      title: '相约信息管理',
      icon: 'icon-order_fill',
      path: '/administrations/invitations',
      hidden: false,
    },
    {
      title: '评论信息管理',
      icon: 'icon-message_fill',
      path: '/administrations/replys',
      hidden: false,
    },
    {
      title: '举报信息管理',
      icon: 'icon-prompt_fill',
      path: '/administrations/reports',
      sub: [
        {
          title: '用户举报信息管理',
          icon: 'information',
          path: '/administrations/reports/users',
          hidden: false,
        },
        {
          title: '相约举报信息管理',
          icon: 'information',
          path: '/administrations/reports/invitations',
          hidden: false,
        },
        {
          title: '评论举报信息管理',
          icon: 'information',
          path: '/administrations/reports/replys',
          hidden: false,
        },
      ],
      hidden: false,
    },
    {
      title: '数据报表',
      icon: 'icon-dynamic_fill',
      path: '/administrations/datas',
      hidden: false,
    }
  ]

  export default {
    name: 'SideBar',
    data() {
      return {
        permissRouters: permissRouters
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .iconfont
    margin-right 10px
</style>