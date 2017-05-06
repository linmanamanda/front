<template>
  <div class="login-view">
    <el-form 
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      class="login-form">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="email">
        <i class="iconfont icon-mail_fill"></i>
        <el-input 
          name="email" 
          type="text" 
          v-model="loginForm.email" 
          placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <i class="iconfont icon-lock_fill"></i>
        <el-input 
          name="password" 
          type="password" 
          v-model="loginForm.password" 
          placeholder="密码">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button 
          type="primary" 
          style="width: 100%"
          :loading="loading" 
          @click="login('loginForm')">登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
	name: 'login-view',
	data() {
		return {
      // 登录表单域
			loginForm: {
				email: 'linmanamanda@gmail.com',
				password: ''
			},

      // 登录表单域验证规则
      loginRules: {
        email: [
          {
            type: 'email',
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '长度在6-12个字符之间',
            min: 6,
            max: 12,
            trigger: 'blur'
          }
        ]
      },

      loadding: false
		}
	},
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loadding = true
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="stylus">
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
    .el-form-item
      border 1px solid rgba(255, 255, 255, 0.1)
      background-color rgba(0, 0, 0, 0.1)
      border-radius 5px
      color #454545
      .el-form-item__content
        display flex
        align-items center
      .iconfont
        padding 6px 5px 6px 15px
        color #889aa4
      .el-input
        width 85%
        input  
          background transparent
          border 0px
          -webkit-appearance none
          border-radius 0px
          padding 12px 5px 12px 15px
          color #eeeeee
          height 47px
</style>