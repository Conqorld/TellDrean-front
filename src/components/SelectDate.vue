<template>
    <div class="select-date" @touchstart.self="closePopou" v-show="value">
        <div class="content-box">
            <div class="header">
                <span @touchstart="currentYear--" v-if="currentYear > minYear" class="text"> 《 </span>
                <span v-if="currentYear <= minYear" class="text disabled"> 《 </span>
                <span class="text">{{currentYear}}</span>
                <span @touchstart="currentYear++" v-if="currentYear < maxYear" class="text"> 》 </span>
                <span v-if="currentYear >= maxYear" class="text disabled"> 》 </span>
            </div>
            <div class="mouth-box">
                <div class="mouth-line">
                    <div @touchstart="defaultMouth = 0" :class="defaultMouth == 0?'every-mouth active':'every-mouth'">1月</div>
                    <div @touchstart="defaultMouth = 1" :class="defaultMouth == 1?'every-mouth active':'every-mouth'">2月</div>
                    <div @touchstart="defaultMouth = 2" :class="defaultMouth == 2?'every-mouth active':'every-mouth'">3月</div>
                    <div @touchstart="defaultMouth = 3" :class="defaultMouth == 3?'every-mouth active':'every-mouth'">4月</div>
                </div>
                <div class="mouth-line">
                    <div @touchstart="defaultMouth = 4" :class="defaultMouth == 4?'every-mouth active':'every-mouth'">5月</div>
                    <div @touchstart="defaultMouth = 5" :class="defaultMouth == 5?'every-mouth active':'every-mouth'">6月</div>
                    <div @touchstart="defaultMouth = 6" :class="defaultMouth == 6?'every-mouth active':'every-mouth'">7月</div>
                    <div @touchstart="defaultMouth = 7" :class="defaultMouth == 7?'every-mouth active':'every-mouth'">8月</div>
                </div>
                <div class="mouth-line">
                    <div @touchstart="defaultMouth = 8" :class="defaultMouth == 8?'every-mouth active':'every-mouth'">9月</div>
                    <div @touchstart="defaultMouth = 9" :class="defaultMouth == 9?'every-mouth active':'every-mouth'">10月</div>
                    <div @touchstart="defaultMouth = 10" :class="defaultMouth == 10?'every-mouth active':'every-mouth'">11月</div>
                    <div @touchstart="defaultMouth = 11" :class="defaultMouth == 11?'every-mouth active':'every-mouth'">12月</div>
                </div>
            </div>
            <div class="footer">
                <div class="btn cancel" @touchstart="cancel">取消</div>
                <div class="btn confirm" @touchstart="confirm">确定</div>
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
            padding 20px 30px 10px 30px
            height 250px
            shadow(2px, 4px, 8px)
            .mouth-box
                .mouth-line
                    display flex
                    flex-direction row
                    justify-content space-around
                    /*margin-bottom 20px*/
                    .every-mouth
                        width 40px
                        height 40px
                        border-radius 50%
                        line-height 40px
                        font-size 14px
                        text-align center
                        color $pink
                        &.active
                            background $pink
                            color white
            .footer
                display flex
                flex-direction row
                justify-content center
                margin-top 30px
                .btn
                    width 60px
                    border-radius 4px
                    border 1px solid $pink
                    padding 4px
                    margin 0 10px
                    font-size 14px
                    text-align center
                    &.cancel
                        color $pink
                    &.confirm
                        background $pink
                        color white
            .header
                flex-direction row
                justify-content space-around
                text-align center
                margin-bottom 20px
                .text
                    font-size 16px
                    color $pink
                    &.disabled
                        color $super-light-gray
</style>
