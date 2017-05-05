<template>
  <div class="login-view">
    <el-form :model="loginForm" class="login-form">
      <h3 class="title">系统登录</h3>
      <el-form-item>
        <i class="iconfont icon-mail_fill"></i>
        <el-input name="email" type="text" v-model="loginForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item>
        <i class="iconfont icon-lock_fill"></i>
        <el-input name="password" type="password" v-model="loginForm.password" placeholder="">密码</el-input>
      </el-form-item>
      <el-form-item>
        <el-button>登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
	name: 'login-view',
	data() {
		return {
			loginForm: {
				email: 'linmanamanda@gmail.com',
				password: 'linman2491'
			}
		}
	},
  components: {
  }
}
</script>

<style lang="stylus" scoped>
.login-view 
  display flex
  justify-content center
  align-items center
  height 100vh
  min-width 400px
  background-color #2d3a4b
  .login-form
    width 400px
    padding 35px 35px 15px 35px
    .title
      margin-bottom 40px
      text-align center
      font-size 26px
      font-weight bold
      color #eee
    .el-input__inner
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #eeeeee;
      height: 47px;
    .el-input
      display inline-block
      width 85%
</style>