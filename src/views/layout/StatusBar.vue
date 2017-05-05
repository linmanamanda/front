<template>
  <div class="status-bar">
    <i class="iconfont icon-other sidebar-btn" :class="{'is-active': isActive }" @click="toggleSideBar"></i>
    <el-dropdown>
      <span class="el-dropdown-link">
        <img src="../../assets/kh.jpg" class="user-avatar">
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>首页</el-dropdown-item>
        <el-dropdown-item>设置</el-dropdown-item>
        <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  export default {
    name: 'StatusBar',
    computed: {
      isActive() {
        return this.$store.state.app.sidebar.closed
      }
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('toggleSideBar')
      },
      logout() {
        
      }
    }
  }
</script>

<style lang="stylus" scoped>
.status-bar
  height 60px
  display flex
  align-items center
  justify-content space-between
  padding 0px 15px
  background #fff
  box-shadow 0 1px 1px rgba(0,0,0,.1)
  .sidebar-btn
    font-size 35px
    cursor pointer
    transition .38s
    transform-origin 50% 50%
  .sidebar-btn.is-active
    transform rotate(90deg)
  .user-avatar
    width 40px
    height 40px
</style>