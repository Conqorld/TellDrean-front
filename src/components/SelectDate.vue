<template>
    <div class="select-date" @touchstart.self="closePopou" v-show="value">
        <div class="content-box">
            <div class="header">
                <text @touchstart="currentYear--" v-if="currentYear > minYear" class="text"> 《 </text>
                <text v-if="currentYear <= minYear" class="text disabled"> 《 </text>
                <text class="text">{{currentYear}}</text>
                <text @touchstart="currentYear++" v-if="currentYear < maxYear" class="text"> 》 </text>
                <text v-if="currentYear >= maxYear" class="text disabled"> 》 </text>
            </div>
            <div class="mouth-box">
                <div class="mouth-line">
                    <div @touchstart="defaultMouth = 0" :class="defaultMouth == 0?'every-mouth active':'every-mouth'"><text class="text">1月</text></div>
                    <div @touchstart="defaultMouth = 1" :class="defaultMouth == 1?'every-mouth active':'every-mouth'"><text class="text">2月</text></div>
                    <div @touchstart="defaultMouth = 2" :class="defaultMouth == 2?'every-mouth active':'every-mouth'"><text class="text">3月</text></div>
                    <div @touchstart="defaultMouth = 3" :class="defaultMouth == 3?'every-mouth active':'every-mouth'"><text class="text">4月</text></div>
                </div>
                <div class="mouth-line">
                    <div @touchstart="defaultMouth = 4" :class="defaultMouth == 4?'every-mouth active':'every-mouth'"><text class="text">5月</text></div>
                    <div @touchstart="defaultMouth = 5" :class="defaultMouth == 5?'every-mouth active':'every-mouth'"><text class="text">6月</text></div>
                    <div @touchstart="defaultMouth = 6" :class="defaultMouth == 6?'every-mouth active':'every-mouth'"><text class="text">7月</text></div>
                    <div @touchstart="defaultMouth = 7" :class="defaultMouth == 7?'every-mouth active':'every-mouth'"><text class="text">8月</text></div>
                </div>
                <div class="mouth-line">
                    <div @touchstart="defaultMouth = 8" :class="defaultMouth == 8?'every-mouth active':'every-mouth'"><text class="text">9月</text></div>
                    <div @touchstart="defaultMouth = 9" :class="defaultMouth == 9?'every-mouth active':'every-mouth'"><text class="text">10月</text></div>
                    <div @touchstart="defaultMouth = 10" :class="defaultMouth == 10?'every-mouth active':'every-mouth'"><text class="text">11月</text></div>
                    <div @touchstart="defaultMouth = 11" :class="defaultMouth == 11?'every-mouth active':'every-mouth'"><text class="text">12月</text></div>
                </div>
            </div>
            <div class="footer">
                <div class="btn cancel" @touchstart="cancel"><text class="text">取消</text></div>
                <div class="btn confirm" @touchstart="confirm"><text class="text">确定</text></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SelectDate',
  props: ['value', 'originalMouth', 'originalYear', 'minYear', 'maxYear', 'chooseDateCallBack'],
  data () {
    return {
      defaultMouth: null,
      currentYear: null
    }
  },
  computed: {
  },
  watch: {
    originalMouth (newValue, oldValue) {
      this.defaultMouth = newValue
    },
    originalYear (newValue, oldValue) {
      this.currentYear = newValue
    }
  },
  methods: {
    closePopou () {
      this.$emit('input', false)
    },
    cancel () {
      this.defaultMouth = this.originalMouth
      this.currentYear = this.originalYear
      this.closePopou()
    },
    confirm () {
      if (this.defaultMouth == null) {
        return false
      }
      this.chooseDateCallBack(this.currentYear, this.defaultMouth)
      this.closePopou()
    }
  },
  created () {
    this.defaultMouth = this.originalMouth
    this.currentYear = this.originalYear
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../assets/style/base.styl"
    .select-date
        height 100%
        width 100%
        position fixed
        top 0
        left 0
        .content-box
            background white
            padding 40px 60px 20px 60px
            height 500px
            shadow(2px, 4px, 8px)
            .mouth-box
                .mouth-line
                    flex-direction row
                    justify-content space-around
                    /*margin-bottom 20px*/
                    .every-mouth
                        width 80px
                        height 80px
                        border-radius 50%
                        &.active
                            background $pink
                            .text
                                color white
                    .text
                        line-height 80px
                        font-size 28px
                        text-align center
                        color $pink
            .footer
                flex-direction row
                justify-content center
                margin-top 40px
                .btn
                    width 120px
                    border-radius 8px
                    border 1px solid $pink
                    padding 8px
                    margin 0 20px
                    .text
                        font-size 28px
                        text-align center
                    &.cancel
                        .text
                            color $pink
                    &.confirm
                        background $pink
                        .text
                            color white
            .header
                flex-direction row
                justify-content space-around
                text-align center
                margin-bottom 40px
                .text
                    font-size 32px
                    color $pink
                    &.disabled
                        color $super-light-gray
</style>
