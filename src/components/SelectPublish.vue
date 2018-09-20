<template>
    <div class="select-publish" v-show="value">
        <div class="content-box">
            <div class="public-content-box">
                <div class="round bule" @touchstart="jumpCreate('createPlotStory')">剧情</div>
                <div class="round pink" @touchstart="jumpCreate('createStory')">普通</div>
            </div>
            <div class="close-box" @touchstart="closePopou">
                x
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
            padding 30px 0
            .round
                height 120px
                width 120px
                line-height 120px
                text-align center
                border-radius 50%
                color white
                font-size 40px
                &.bule
                    background $dark-bule
                &.pink
                    background $pink
        .close-box
            height 120px
            color $light-gray
            line-height 120px
            text-align center
            font-size 32px
</style>
