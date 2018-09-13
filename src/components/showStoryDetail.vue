<template>
    <div class="show-story-detail">
        <div class="header">
            <text class="cancel" @touchstart="cancel">返回</text>
            <image @touchstart="jumpStoryEdit()" class="edit-icon" style="width:40px;height:40px" resize="contain" src="http://p4v45pf9g.bkt.clouddn.com/edit.png"></image>
        </div>
        <div class="main">
            <text class="title">{{title}}</text>
            <div class="tags-box">
                <text class="tag" v-for="tag in tags" :key="tag">{{tag}}</text>
            </div>
            <text class="create-time">{{createTime}}</text>
            <div class="big-line"></div>
            <div>
                <text class="story-conten" v-if="character !== null">人物：{{character}}</text>
                <text class="story-conten margin-top" v-if="background !== null">故事背景：{{background}}</text>
                <div v-if="background !== null" class="">
                    <text class="story-conten margin-top" v-for="(item, index) in event" :key="index">事件{{index + 1}}：{{item}}</text>
                </div>
                <text class="story-conten">{{content}}</text>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'showStoryDetail',
  data () {
    return {
      id: this.$route.query.id,
      createTime: this.$moment(new Date()).format('YYYY-MM-DD'),
      title: '',
      content: '',
      tags: '',
      background: null,
      character: null,
      event: null
    }
  },
  methods: {
    jumpStoryEdit () {
      if (this.type === 'normal') {
        this.$router.push({name: 'createStory', query: { id: this.id }})
      } else {
        this.$router.push({name: 'createPlotStory', query: { id: this.id }})
      }
    },
    cancel () {
      this.$router.go(-1)
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
            this.createTime = this.$moment(new Date(result.createTime)).format('YYYY-MM-DD')
            this.title = result.title
            this.content = result.contents
            this.tags = result.tag
            this.background = result.background
            this.character = result.character
            this.event = result.event
            this.type = result.type
          }
        })
    }
  },
  created () {
    this.getStoryDetail(this.$route.query.id)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../assets/style/base.styl"
.show-story-detail
    background url("http://p4v45pf9g.bkt.clouddn.com/DetailBack2.jpg")
    background-repeat repeat
    position fixed
    height 100%
    width 100%
    top 0
    left 0
    .main
        padding 48px
        margin 48px 48px
        background rgba(255, 255, 255, .7)
        border-radius 8px
        shadow(4px, 4px, 6px)
        .story-conten
            font-size 28px
        .margin-top
            margin-top 20px
        .big-line
            height 4px
            background  $super-light-gray
            margin-top 40px
            margin-bottom 40px
        .title
            font-size 32px
            color $black
            line-height 2
        .create-time
            font-size 24px
            color $light-gray
        .tags-box
            flex-direction row
            .tag
                margin-right 10px
                font-size 24px
                color $light-gray
    .header
        flex-direction row
        align-items center
        justify-content space-between
        background white
        shadow(0, 2px, 4px)
        .edit-icon
            float right
            margin-right 48px
        .cancel
            display inline-block
            height 80px
            width 80px
            box-sizing content-box
            line-height 80px
            padding 0 48px
            font-size 28px
</style>
