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

<style lang="stylus" scoped>
  .main-content
    padding 20px
</style>