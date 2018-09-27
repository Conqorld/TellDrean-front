<template>
    <div class="create-story">
        <div class="header">
            <span class="cancel" @touchstart="cancel">取消</span>
        </div>
        <div class="Main">
            <div class="content-line border-bottom-line">
                <input v-model="title" type="text" class="content-input" placeholder="标题"/>
            </div>
            <div class="content-line border-bottom-line">
                <div class="content-input" @touchstart="pickDate">{{value|moment("YYYY-MM-DD")}}</div>
            </div>
            <div class="content-line last-line shadow-box">
                <textarea v-model="content" class="content-textarea" placeholder="内容"></textarea>
            </div>
            <div class="thin-line tag-line"></div>
            <div class="content-line tag shadow-box">
                <input v-model="tag" style="border-bottom: none" type="text" class="content-input" placeholder="#添加标签，多个标签用逗号分隔"/>
            </div>
        </div>
        <div class="footer" @touchstart="submit">
            发&emsp;布
        </div>
    </div>
</template>

<script>
import bus from '../assets/js/eventbus'
export default {
  name: 'createStory',
  data () {
    return {
      value: new Date(),
      title: null,
      content: null,
      tag: null,
      id: this.$route.query.id,
      datePicker: null
    }
  },
  methods: {
    cancel () {
      this.$router.go(-1)
    },
    submit () {
      let str = this.tag ? this.tag.replace(/\s+/g, '').split('，') : null
      if (!this.title) {
        this.$createDialog({
          type: 'alert',
          title: '请输入标题！',
          icon: 'cubeic-warm'
        }).show()
        return false
      }
      if (str && str.length > 3) {
        this.$createDialog({
          type: 'alert',
          title: '标签最多只能有三个！',
          icon: 'cubeic-warm'
        }).show()
        return false
      }
      let params = {
        title: this.title,
        content: this.content,
        createTime: this.$moment(new Date()).format('YYYY-MM-DD') === this.$moment(this.value).format('YYYY-MM-DD') ? Date.parse(new Date()) : Date.parse(new Date(this.$moment(this.value).format('YYYY-MM-DD')+ ' ' + '08:00:00')),
        tag: str,
        type: 'normal'
      }
      let url = '/tellDream/createStory'
      let msg = '创建成功!'
      if (this.id) {
        params.id = this.id
        url = '/tellDream/upDateStory'
        msg = '修改成功!'
      }
      this.$httpFetch(url, {data: params})
        .then(data => {
          if (data.status === 1) {
            bus.$emit('openPrompt', msg)
            this.$store.default.dispatch('setDate', {year: new Date(this.value).getFullYear(), mouth: new Date(this.value).getMonth()})
            window.setTimeout(() => {
              this.$router.push({name: 'Home'})
            }, 1000)
          }
        })
        .catch(err => {
          this.$createDialog({
            type: 'alert',
            title: err.err,
            icon: 'cubeic-warm'
          }).show()
        })
    },
    pickDate () {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: '选择日期',
          min: new Date(2008, 7, 8),
          max: new Date(),
          value: this.value,
          onSelect: this.selectHandle,
          maskClosable: false
        })
      }

      this.datePicker.show()
    },
    selectHandle(date) {
      this.value = date
    },
    getStoryDetail (id) {
      this.$httpFetch('/tellDream/getStoryDetail', {data: {id: id}})
        .then(data => {
          if (data.status === 1) {
            let result = data.result
            this.value = new Date(result.createTime)
            this.title = result.title
            this.content = result.contents
            this.tag = result.tag?result.tag.join('，'):null
          }
        })
    }
  },
  created () {
    let id = this.$route.query.id
    if (id) {
      this.getStoryDetail(id)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../assets/style/base.styl"
.create-story
    height 100%
    width 100%
    position fixed
    top 0
    left 0
    background $super-light-gray
    .shadow-box
        box-shadow 0 2px 3px $shadow-gray
    .Main
        background white
        .tag-line
            &:after
                height: 10px
                background $super-light-gray
        .content-line
            padding 0 24px
            &.border-bottom-line
                border-bottom 3px solid $super-light-gray
            &.tag
                border-top 10px
                padding-top 4px
                padding-bottom 4px
                .content-input
                    top 8px
                    width 100%
            &.last-line
                margin-bottom 2px
            .content-input
                height 36px
                line-height 36px
                font-size 14px
                color $black
                background white
                width 100%
                &:focus
                    border none
                    outline none
            .content-textarea
                padding 10px 0
                height 260px
                font-size 14px
                color $black
                width 100%
                &:focus
                    border none
                    outline none
                &:disabled
                    background white
    .footer
        position fixed
        height 50px
        line-height 50px
        width 100%
        text-align center
        font-size 16px
        bottom 0
        left 0
        box-shadow 0 -2px 3px $shadow-gray
        color white
        background $blue-green
    .header
        height 40px
        border-bottom 1px solid #aab8a3
        background $super-light-gray
        .cancel
            height 40px
            line-height 40px
            display inline-block
            padding 0 24px
            font-size 14px
</style>
