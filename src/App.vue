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
        const toast = this.$createToast({
          time: 2000,
          txt: text
        })
        toast.show()
      })
    }
  }
</script>

<style scoped>

</style>
