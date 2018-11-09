<template>
    <div id="home">
        <Header>
            <div class="header-msg-box" @touchstart="isSelectDate = true">
               {{currentYear}}年 {{currentMouth + 1}}月
            </div>
        </Header>
        <Main>
            <cube-scroll ref="scroll">
                <div class="contents-box">
                    <div class="content-box" v-for="story in thisMonthData" :key="story.id" @click="jumpStoryDetail(story)">
                        <h2 class="h2">{{story.title}}</h2>
                        <div class="content content-else" style="-webkit-box-orient: vertical;" v-if="story.character">人物：{{story.character}}</div>
                        <div class="back content content-else" style="-webkit-box-orient: vertical;" v-if="story.background">故事背景：{{story.background}}</div>
                        <div class="event-content content content-text" v-if="story.event !== null" v-for="(ev, index) in story.event" :key="index">
                            事件{{index+1}}：{{ev}}
                        </div>
                        <div class="content content-text" style="-webkit-box-orient: vertical;"  v-if="story.contents !== null">
                            {{story.contents}}
                        </div>
                        <div class="thin-line" style="margin:20px 0 20px 0"></div>
                        <div class="bottom-info">
                            <div class="tags-box">
                                <span class="del" @touchstart.stop="delSubmit(story.id)">删</span>
                                <div class="tag" v-for="(tag, index) in story.tag" :key="index">
                                    <span class="text">{{tag}}</span>
                                </div>
                            </div>
                            <span class="update-time">{{story.createTime / 1000|moment("YYYY-MM-DD")}}</span>
                        </div>
                    </div>
                    <div class="no-more" v-if="thisMonthData.length > 0">已经没有更多了</div>
                    <div class="no-more thismonth-no-dream" v-if="thisMonthData.length <= 0">这个月还没有做梦哦~</div>
                </div>
            </cube-scroll>
        </Main>
        <Footer>
            <span class="add-button" @touchstart="isOpen = true">述</span>
        </Footer>
        <selectPublish v-model="isOpen"></selectPublish>
        <selectDate :originalMouth="currentMouth"
                v-model="isSelectDate"
                :originalYear="currentYear"
                :minYear="new Date(this.minDate).getFullYear()"
                :maxYear="new Date(this.maxDate).getFullYear()"
                :chooseDateCallBack="chooseDateCallBack">
        </selectDate>
    </div>
</template>
<script>
import SelectPublish from './SelectPublish'
import SelectDate from './SelectDate'
export default {
  data () {
    return {
      isOpen: false,
      isSelectDate: false,
      thisMonthData: [],
      maxDate: null,
      minDate: null,
      currentYear: new Date().getFullYear(),
      currentMouth: new Date().getMonth()
    }
  },
  components: {
    selectPublish: SelectPublish,
    selectDate: SelectDate
  },
  created () {
      let mouthStore = this.$store.default.state.mouthStore
      let yearStore = this.$store.default.state.yearStore
      if (mouthStore !== null && yearStore !== null) {
        this.currentYear = yearStore
        this.currentMouth = mouthStore
      }
      this.getMonthData(new Date(this.currentYear, this.currentMouth, 1), new Date(this.currentYear, this.currentMouth + 1, 0))
      this.getRangeMonth()

  },
  methods: {
    chooseDateCallBack (yaer, mouth) {
      this.getMonthData(new Date(yaer, mouth, 1), new Date(yaer, mouth + 1, 0))
      this.currentYear = yaer
      this.currentMouth = mouth
    },
    jumpStoryDetail (story) {
      this.$store.default.dispatch('setDate', {year: this.currentYear, mouth: this.currentMouth})
      this.$router.push({name: 'showStoryDetail', query: { id: story.id }})
    },
    delSubmit (id) {

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
          this.delStory(id)
        },
      }).show()
    },
    delStory (id) {
      this.$httpFetch('/tellDream/deleteStory',
        {data: {id: id}})
        .then(data => {
          if (data.status === 1) {
            this.thisMonthData = this.thisMonthData.filter(item => item.id !== id)
          }
        })
    },
    getMonthData (createTime, endTime) {
      this.$httpFetch('/tellDream/getStory', {data: {
        createTime: Date.parse(createTime) / 1000,
        endTime: Date.parse(endTime) / 1000
      }})
        .then(data => {
          this.thisMonthData = data
        })
    },
    getRangeMonth () {
      this.$httpFetch('/tellDream/getMinMouth')
        .then(data => {
          this.minDate = data.minDate
          this.maxDate = data.maxDate
        })
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../assets/style/base.styl"；
#home
    height 100%
    width 100%
    display flex
    flex-direction column
    justify-items space-between
    position fixed
    left 0
    top 0
    background url("http://p4v45pf9g.bkt.clouddn.com/HomeBack.jpg")
    background-size cover
    background-position center
    background-repeat no-repeat
    Header
        margin-top 10px
        .header-msg-box
            height 36px
            width 90%
            margin 0 auto
            background rgba(255, 255, 255, .8)
            border-radius 36px
            text-align center
            font-size 18px
            line-height 36px
    Main
        box-sizing border-box
        flex 1
        flex-shrink 0
        width 100%
        height calc(100% - 96px)
        .contents-box
            width 90%
            margin 0 auto
            padding 10px 0
            .no-more
                height 40px
                line-height 40px
                font-size 14px
                background rgba(255, 255, 255, .9)
                text-align center
                border-radius 4px
                color $light-gray
                &.thismonth-no-dream
                    height 120px
                    line-height 120px
            .content-box
                background rgba(255, 255, 255, .9)
                border-radius 4px
                box-sizing border-box
                padding 10px 15px 20px 15px
                margin-bottom 20px
                .h2
                    font-size 18px
                    line-height 2
                .event-content
                    margin-top 10px
                    font-size 14px
                    .content
                        margin-bottom 5px
                .content
                    font-size 14px
                    line-height 1.6
                .content-text
                    display -webkit-box
                    -webkit-box-orient vertical
                    -webkit-line-clamp 5
                    overflow hidden
                    text-overflow ellipsis
                    white-space normal
                .content-else
                    display -webkit-box
                    -webkit-box-orient vertical
                    -webkit-line-clamp 3
                    overflow hidden
                    text-overflow ellipsis
                    white-space normal
                    word-wrap break-word
                .back
                    margin-top 10px
                .bottom-info
                    display flex
                    flex-direction row
                    justify-content space-between
                    align-items center
                    margin-top 30px
                    span
                        font-size 12px
                        color $light-gray
                    .tags-box
                        display flex
                        flex 1
                        align-items center
                        justify-content flex-start
                        flex-direction row
                        .del
                            margin-right 8px
                            display inline
                            text-decoration line-through
                            font-size 12px
                            color $dark-bule
                        .tag
                            margin-right 6px
                            display inline
                            font-size 12px
                    .update-time
                        flex-shrink 0
                        font-size 12px
                .thin-line
                    position relative
                    border none
                    margin 20px 0 10px 0
                    &:after
                        content ""
                        position absolute
                        left 0
                        background $light-gray
                        width 100%
                        height 1px
                        -webkit-transform scaleY(0.5)
                        transform scaleY(0.5)
                        -webkit-transform-origin 0 0
                        transform-origin 0 0
    Footer
        height 50px
        box-shadow 0 -2px 3px $shadow-gray
        background white
        .add-button
            display block
            height 43px
            width 43px
            margin 3px auto
            border-radius 50%
            background rgba(101, 104, 209, 1)
            box-sizing border-box
            border 2px solid $light-bule-green
            font-size 18px
            color $light-bule-green
            text-align center
            line-height 41px
            font-weight 600
</style>
