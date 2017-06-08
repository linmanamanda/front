<template>
  <div class="layout" :class="{ 'hide-sidebar': isClosed }">
    <div class="sidebar-container" >
      <h1 class="slogan" v-show="!isClosed">“来相约”系统服务端</h1>
      <h1 class="slogan__close slogan" v-show="isClosed">约</h1>
      <SideBar class="sidebar"></SideBar>
    </div>
    <div class="main-container">
      <StatusBar></StatusBar>
      <MainContent></MainContent>
    </div>
  </div>
</template>

<script>
  import SideBar from './SideBar'
  import StatusBar from './StatusBar'
  import MainContent from './MainContent'
  export default {
    name: 'layout',
    components: {
      SideBar,
      StatusBar,
      MainContent
    },
    computed: {
      isClosed() {
        return this.$store.getters.sidebarIsClosed
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .layout
    height 100vh
    padding-left 180px
    &.hide-sidebar
      padding-left 40px
      .sidebar-container
        transform translate(-140px, 0)
        .sidebar
          transform translate(132px, 0)
        &:hover
          transform translate(0, 0)
          .sidebar
            transform translate(0, 0)
    .sidebar-container
      width 180px
      height 100%
      position fixed
      left 0
      z-index 9999
      overflow hidden
      background-color #324157
      transition all .28s ease-out
    .slogan
      padding 10px 15px
      color #fff
      font-size 16px
    .slogan__close
      text-align right
    .sidebar
      transition all .28s ease-out
    .main-container
      transition all .28s ease-out
</style>