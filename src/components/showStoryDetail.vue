<template>
    <div class="show-story-detail">
        <div class="header">
            <span class="cancel" @touchstart="cancel">返回</span>
            <img @touchstart="jumpStoryEdit()" class="edit-icon" style="width:20px;height:20px" src="http://p4v45pf9g.bkt.clouddn.com/edit.png">
        </div>
        <div class="main">
            <h2 class="title">{{title}}</h2>
            <div class="tags-box" v-if="tags != null">
                <span class="tag" v-for="tag in tags" :key="tag">{{tag}}</span>
            </div>
            <span class="create-time">{{createTime}}</span>
            <div class="big-line"></div>
            <div>
                <div class="story-conten" v-if="character !== null">人物：{{character}}</div>
                <div class="story-conten margin-top" v-if="background !== null">故事背景：{{background}}</div>
                <div v-if="background !== null" class="">
                    <div class="story-conten margin-top" v-for="(item, index) in event" :key="index">事件{{index + 1}}：{{item}}</div>
                </div>
                <div class="story-conten">{{content}}</div>
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
      this.$httpFetch('/tellDream/getStoryDetail', {data: {id: id}})
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
    overflow-y scroll
    -webkit-overflow-scrolling touch
    top 0
    left 0
    .main
        padding 24px
        margin 24px 24px
        margin-top 64px
        background rgba(255, 255, 255, .7)
        border-radius 4px
        shadow(2px, 2px, 3px)
        .story-conten
            font-size 14px
            line-height 1.6
        .margin-top
            margin-top 10px
        .big-line
            height 2px
            background  $super-light-gray
            margin-top 10px
            margin-bottom 10px
        .title
            font-size 16px
            color $black
            line-height 2
        .create-time
            font-size 12px
            color $light-gray
        .tags-box
            flex-direction row
            .tag
                margin-right 6px
                font-size 12px
                color $light-gray
    .header
        position fixed
        width 100%
        top 0
        left 0
        display flex
        flex-direction row
        align-items center
        justify-content space-between
        background white
        shadow(0, 2px, 4px)
        .edit-icon
            margin-right 24px
        .cancel
            display inline-block
            height 40px
            width 40px
            box-sizing content-box
            line-height 40px
            padding 0 24px
            font-size 14px
</style>
