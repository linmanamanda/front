<template>
  <div class="main-content">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'MainContent',
  }
</script>

<style lang="stylus">
  .main-content
    padding 20px
    .filter-container
      margin-bottom 15px
      .filter-item
        margin-bottom 10px
    .el-pagination
      padding 0
      margin-top 15px
    .invitation-table-expand
      font-size 0
      label
        width 100px
        color #99a9bf
      .el-form-item
        margin-right 0 !important
        margin-bottom 0
        width 50%
</style>