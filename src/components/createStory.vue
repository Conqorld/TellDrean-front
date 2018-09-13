<template>
    <div class="create-story">
        <div class="header">
            <span class="cancel" @touchstart="cancel">取消</span>
        </div>
        <div class="Main">
            <div class="content-line">
                <input v-model="title" type="text" class="content-input" placeholder="标题"/>
            </div>
            <div class="content-line">
                <text class="content-input"  @touchstart="pickDate">{{value}}</text>
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
      value: this.$moment(new Date()).format('YYYY-MM-DD'),
      title: null,
      content: null,
      tag: null,
      id: this.$route.query.id
    }
  },
  methods: {
    cancel () {
      this.$router.go(-1)
    },
    submit () {
      let str = this.tag ? this.tag.replace(/\s+/g, '').split('，') : null
      if (!this.title) {
        alert({message: '请输入标题！'})
        return false
      }
      if (str && str.length > 3) {
        alert({message: '标签最多只能有三个！'})
        return false
      }
      let params = {
        title: this.title,
        content: this.content,
        createTime: this.$moment(new Date()).format('YYYY-MM-DD') === this.$moment(this.value).format('YYYY-MM-DD') ? Date.parse(new Date(this.value + ' ' + this.$moment(new Date()).format('HH:mm:ss'))) : Date.parse(new Date(this.value + ' ' + '08:00:00')),
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
      let fetchParams = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        // credentials: 'include', // 将凭证也带上（例如cookies）
        body: JSON.stringify(params)
      }
      fetch(url, fetchParams).then(response => response.json())
        .then(data => {
          if (data.status === 1) {
            bus.$emit('openPrompt', msg)
            window.setTimeout(() => {
              this.$router.push({name: 'Home'})
            }, 500)
          }
        })
    },
    pickDate () {

    },
    getStoryDetail (id) {
      let fetchParams = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        // credentials: 'include', // 将凭证也带上（例如cookies）
        body: JSON.stringify({
          id: id
        })
      }
      fetch('/tellDream/getStoryDetail', fetchParams).then(response => response.json())
        .then(data => {
          if (data.status === 1) {
            let result = data.result
            this.value = this.$moment(new Date(result.createTime)).format('YYYY-MM-DD')
            this.title = result.title
            this.content = result.contents
            this.tag = result.tag.join('，')
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
        box-shadow 0 4px 6px $shadow-gray
    .Main
        background white
        .tag-line
            &:after
                height: 20px
                background $super-light-gray
        .content-line
            padding 0 48px
            border-bottom 3px solid $super-light-gray
            &.tag
                border-top 20px
                height 90px
                .content-input
                    top 16px
            &.last-line
                margin-bottom 2px
            .content-input
                height 72px
                line-height 72px
                font-size 28px
                color $black
                background white
            .content-textarea
                padding 20px 0
                height 520px
                font-size 28px
                color $black
                &:disabled
                    background white
    .footer
        position fixed
        height 100px
        line-height 100px
        width 100%
        text-align center
        font-size 32px
        bottom 0
        left 0
        box-shadow 0 -4px 6px $shadow-gray
        color white
        background $blue-green
    .header
        height 80px
        border-bottom 1px solid #aab8a3
        background $super-light-gray
        .cancel
            height 80px
            line-height 80px
            display inline-block
            padding 0 48px
            font-size 28px
</style>
