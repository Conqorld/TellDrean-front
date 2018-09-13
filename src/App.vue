<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<script>
  import bus from './assets/js/eventbus'
  export default {
    name: 'App',
    data () {
      return {
      }
    },
    methods: {
      },
    created () {
      bus.$on('openPrompt', (text) => {
        console.log(text)
      })
    }
  }
</script>

<style scoped>

</style>
