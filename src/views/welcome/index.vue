<template>
  <div>
    <p>welcome information - {{welcome}}</p>
    <button @click="getWelcome">get welcome</button>
    <button @click="postWelcomeInfo">post welcome</button>
    <button @click="putWelcomeInfo">put welcome</button>
    <button @click="patchWelcomeInfo">patch welcome</button>
    <button @click="deleteWelcomeInfo">delete welcome</button>
  </div>
</template>

<script>
  import service from '@/api/welcome/index'
  export default {
    name: 'welcome',
    data() {
      return {
        welcome: ''
      }
    },
    methods: {
      getWelcome() {
        service.getWelcomeInfo()
          .then((res) => {
            this.welcome = res
          })
          .catch((err) => {
            
          })
      },
      postWelcomeInfo() {
        service.postWelcomeInfo()
          .then((res) => {
            this.welcome = res
          })
          .catch((err) => {

          })
      },
      putWelcomeInfo() {
        service.putWelcomeInfo()
          .then((res) => {
            this.welcome = res
          })
          .catch((err) => {

          })
      },
      patchWelcomeInfo() {
        service.patchWelcomeInfo()
          .then((res) => {
            this.welcome = res
          })
          .catch((err) => {

          })
      },
      deleteWelcomeInfo() {
        service.deleteWelcomeInfo()
          .then((res) => {
            this.welcome = res
          })
          .catch((err) => {

          })
      }
    }
  }
</script>