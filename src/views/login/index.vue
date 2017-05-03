<template>
  <div class="login-view">
    <Login></Login>
  </div>
</template>

<script>
import Login from '@/components/login/Login'
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
    Login
  }
}
</script>

<style lang="stylus" scoped>
.login-view 
  display flex
  height 100vh
  min-width 400px
  background-color #2d3a4b
</style>