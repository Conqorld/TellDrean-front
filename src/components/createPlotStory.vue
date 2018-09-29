<template>
    <div class="create--plot-story">
        <div class="header">
            <span class="cancel" @touchstart="cancel">取消</span>
        </div>
        <div class="Main">
            <div class="content-line border-bottom-line">
                <input v-model="title" type="text" class="content-input" placeholder="标题"/>
            </div>
            <div class="content-line border-bottom-line">
                <div class="content-input"  @touchstart="pickDate">{{value|moment("YYYY-MM-DD")}}</div>
            </div>
            <div class="content-line border-bottom-line">
                <input v-model="character" class="content-input" placeholder="人物">
            </div>
            <div class="content-line last-line shadow-box">
                <textarea v-model="background" class="content-textarea" placeholder="背景/世界观"></textarea>
            </div>
            <div class="big-line"></div>
            <div class="content-line last-line plot-content border-bottom-line" v-for="(item, index) in content" :key="index">
                <textarea v-model="content[index]" class="content-textarea" :placeholder="'情节' + (index + 1)"></textarea>
                <div @touchstart="subContent(index)" class="substruction">-</div>
            </div>
            <div class="add-content" @touchstart="addContent">增加情节 &nbsp;+</div>
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
      value: new Date(),
      title: null,
      content: [''],
      tag: null,
      id: this.$route.query.id,
      character: null,
      background: null,
      datePicker: null
    }
  },
  methods: {
    cancel () {
      this.$router.go(-1)
    },
    subContent (index) {
      this.$createDialog({
        type: 'confirm',
        title: '确认删除这个故事？',
        content: '',
        confirmBtn: {
          text: '删除',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '取消',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {
          this.content.splice(index, 1)
        },
      }).show()
    },
    addContent () {
      this.content.push('')
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
      let isToday = this.$moment(new Date()).format('YYYY-MM-DD') === this.$moment(this.value).format('YYYY-MM-DD')
      let params = {
        title: this.title,
        event: this.content,
        createTime: isToday ? Date.parse(new Date()) : Date.parse(new Date(this.value)),
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
      this.$httpFetch(url, {
        data: params
      })
        .then(data => {
          if (data.status === 1) {
            bus.$emit('openPrompt', msg)
            this.$store.default.dispatch('setDate', {year: new Date(this.value).getFullYear(), mouth: new Date(this.value).getMonth()})
            window.setTimeout(() => {
              this.$router.push({name: 'Home'})
            }, 1000)
          }
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
            box-shadow 0 2px 3px $shadow-gray
            margin-bottom 2px
        .Main
            max-height calc(100% - 90px)
            overflow-y scroll
            background white
            .add-content
                height 40px
                text-align center
                line-height 40px
                font-size 14px
                color $blue-green
            .big-line
                height 10px
                background $super-light-gray
            .tag-line
                &:after
                    height: 10px
                    background $super-light-gray
            .plot-content
                display flex
                flex-direction row
                justify-content space-between
                .content-textarea
                    flex 1
                .substruction
                    height 120px
                    line-height 120px
                    width 30px
                    margin-right -24px
                    background $light-gray
                    text-align center
                    color white
                    flex-direction row
                    justify-content center
                    align-items center
                    flex-shrink 0
                    font-size 28px
                    color white
            .content-line
                padding 0 24px
                &.border-bottom-line
                    border-bottom 3px solid $super-light-gray
                &.tag
                    border-top 10px solid $super-light-gray
                .content-input
                    height 36px
                    line-height 36px
                    font-size 14px
                    color $black
                    background white
                    width 100%
                    &:focus
                        outline none
                .content-textarea
                    padding 10px 0
                    height 120px
                    font-size 14px
                    color $black
                    box-sizing border-box
                    width 100%
                    &:focus
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
