<template>
    <div class="select-publish" v-show="value">
        <div class="content-box">
            <div class="public-content-box">
                <text class="round bule" @touchstart="jumpCreate('createPlotStory')">剧情</text>
                <text class="round pink" @touchstart="jumpCreate('createStory')">普通</text>
            </div>
            <div class="close-box" @touchstart="closePopou">
                <text class="text">x</text>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SelectPublish',
  props: ['value'],
  computed: {
    inputListeners: function () {
      var vm = this
      return Object.assign({},
        this.$listeners,
        {
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  methods: {
    closePopou () {
      this.$emit('input', false)
    },
    jumpCreate (name) {
      this.closePopou()
      this.$router.push({name: name})
    }
  },
  created () { }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../assets/style/base.styl"
.select-publish
    height 100%
    width 100%
    position fixed
    top 0
    left 0
    background white
    .content-box
        position absolute
        width 100%
        bottom 0
        left 0
        .public-content-box
            display flex
            flex-direction row
            justify-content space-around
            align-items center
            padding 60px 0
            .round
                height 240px
                width 240px
                line-height 240px
                text-align center
                border-radius 50%
                color white
                font-size 80px
                &.bule
                    background $dark-bule
                &.pink
                    background $pink
        .close-box
            height 240px
            color $light-gray
            .text
                line-height 240px
                text-align center
                font-size 64px
</style>
