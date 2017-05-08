<template>
  <div class="home-view">
      <p>邮箱： {{ email }}</p>
      <p>状态： {{ status }}</p>
      <p>权限： {{ authority }}</p>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    computed: {
      email() {
        return this.$store.getters.email
      },
      status() {
        const statusMap = {
          0: '正常',
          1: '封禁',
        }
   
        return statusMap[this.$store.getters.status]
      },
      authority() {
        const authorityMap = {
          0: '普通用户',
          1: '管理员',
          2: '超级管理员',
        }

        return authorityMap[this.$store.getters.authority]
      },
    }
  }
</script>

<style lang="stylus" scoped>
  
</style>