<template>
  <div class="login">
    <h1 class="title">系统登录</h1>
    <div class="input-group">
      <i class="iconfont icon-mail_fill"></i>
      <input type="text" name="email" placeholder="email" v-model="email">
    </div>
    <div class="input-group">
      <i class="iconfont icon-unlock_fill"></i>
      <input type="password" name="password"
      placeholder="password" v-model="password">
    </div>
    <button>登录</button>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        email: 'linmanamanda@gmail.com',
        password: 'linman2491'
      }
    },
    methods: {
      signin() {

      } 
    }
  }  
</script>

<style lang="stylus" scoped>
.login 
  position absolute
  left 0
  right 0
  width 400px
  padding 35px 35px 15px 35px
  margin 120px auto
  .title
    margin 0px auto 40px auto
    font-size 26px
    color #eee
    text-align center
    font-weight bold
  .input-group
    display flex
    align-items center
    height 48px
    border 1px solid rgba(255, 255, 255, 0.1)
    background rgba(0, 0, 0, 0.1)
    border-radius 5px
    padding-left 15px
    margin-bottom 22px
    color #454545
    font-size 14px
  .iconfont
    font-size 18px
    color #889aa4
  input
    flex 1
    padding 12px 15px
    background-color transparent
    outline none 
    border none
    color #fff
  input::-webkit-input-placeholder 
    color #889aa4 
  button 
    width 100%
    padding 10px 15px
    background-color #4db3ff
    border-width 0
    border-color #4db3ff
    border-radius 4px
    color #fff
    font-size 14px
</style>