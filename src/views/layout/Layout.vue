<template>
  <div class="layout" :class="{ 'hide-sidebar': isClosed }">
    <div class="sidebar-container" >
      <SideBar class="sidebar"></SideBar>
    </div>
    <div class="main-container">
      <StatusBar></StatusBar>
      <Content></Content>
    </div>
  </div>
</template>

<script>
  import SideBar from './SideBar'
  import StatusBar from './StatusBar'
  import Content from './Content'
  export default {
    name: 'layout',
    components: {
      SideBar,
      StatusBar,
      Content
    },
    computed: {
      isClosed() {
        return this.$store.state.app.sidebar.closed
      }
    }
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
    .sidebar
      transition all .28s ease-out
    .main-container
      transition all .28s ease-out
</style>