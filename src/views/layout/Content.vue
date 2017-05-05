<template>
  <div class="content">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'Content',
  }
</script>

<style lang="stylus" scoped>
  .content
    padding 20px
</style>