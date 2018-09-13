<template>
    <div class="create--plot-story">
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
            <div class="content-line">
                <input v-model="character" class="content-input" placeholder="人物"></input>
            </div>
            <div class="content-line last-line shadow-box">
                <textarea v-model="background" class="content-textarea" placeholder="背景/世界观"></textarea>
            </div>
            <div class="big-line"></div>
            <div class="content-line last-line plot-content" v-for="(item, index) in content" :key="index">
                <textarea v-model="content[index]" class="content-textarea" :placeholder="'情节' + (index + 1)"></textarea>
                <div class="substruction">
                    <text class="text" @touchstart="subContent(index)">-</text>
                </div>
            </div>
            <text class="add-content" @touchstart="addContent">增加情节 &nbsp;+</text>
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
  name: 'createPlotStory',
  data () {
    return {
      value: this.$moment(new Date()).format('YYYY-MM-DD'),
      title: null,
      content: [''],
      tag: null,
      id: this.$route.query.id,
      character: null,
      background: null
    }
  },
  methods: {
    cancel () {
      this.$router.go(-1)
    },
    subContent (index) {
      this.content.splice(index, 1)
    },
    addContent () {
      this.content.push('')
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
        event: this.content,
        createTime: this.$moment(new Date()).format('YYYY-MM-DD') === this.$moment(this.value).format('YYYY-MM-DD') ? Date.parse(new Date(this.value + ' ' + this.$moment(new Date()).format('HH:mm:ss'))) : Date.parse(new Date(this.value + ' ' + '08:00:00')),
        tag: str,
        background: this.background,
        character: this.character,
        type: 'plot'
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
      // picker.pickDate({
      //   value: this.value,
      //   max: this.$moment(new Date()).format('YYYY-MM-DD')
      // }, event => {
      //   if (event.result === 'success') {
      //     this.value = event.data
      //   }
      // })
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
            this.background = result.background
            this.character = result.character
            this.content = result.event
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
    .create--plot-story
        height 100%
        width 100%
        position fixed
        top 0
        left 0
        background $super-light-gray
        .shadow-box
            box-shadow 0 4px 6px $shadow-gray
            margin-bottom 4px
        .Main
            max-height calc(100vh - 180px)
            overflow-y scroll
            background white
            .add-content
                height 60px
                text-align center
                line-height 60px
                font-size 28px
                color $blue-green
            .big-line
                height 20px
                background $super-light-gray
            .tag-line
                &:after
                    height: 20px
                    background $super-light-gray
            .plot-content
                flex-direction row
                justify-content space-between
                .content-textarea
                    flex 1
                .substruction
                    height 150px
                    width 60px
                    margin-right -48px
                    background $light-gray
                    text-align center
                    color white
                    flex-direction row
                    justify-content center
                    align-items center
                    flex-shrink 0
                    .text
                        font-size 68px
                        color white
            .content-line
                padding 0 48px
                border-bottom 3px solid $super-light-gray
                &.tag
                    border-top 20px solid $super-light-gray
                .content-input
                    height 72px
                    line-height 72px
                    font-size 28px
                    color $black
                    background white
                .content-textarea
                    padding 20px 0
                    height 150px
                    font-size 28px
                    color $black
                    box-sizing border-box
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
