<template>
    <div id="home">
        <Header>
            <div class="header-msg-box" @touchstart="isSelectDate = true">
               {{currentYear}}年 {{currentMouth + 1}}月
            </div>
        </Header>
        <Main>
            <div class="contents-box">
                <div class="content-box" v-for="story in thisMonthData" :key="story.id" @touchstart="jumpStoryDetail(story)">
                    <text class="h2">{{story.title}}</text>
                    <div class="content">
                        <text class="explain text" v-if="story.character">人物：{{story.character}}</text>
                    </div>
                    <div class="back content" v-if="story.background">
                        <text lines="3" class="text">故事背景：{{story.background}}</text>
                    </div>
                    <div class="event-content" v-if="story.event !== null">
                        <text lines="3" class="text" v-for="(ev, index) in story.event" :key="index">事件{{index+1}}：{{ev}}</text>
                    </div>
                    <div class="content">
                        <text  lines="5" class="text">{{story.contents}}</text>
                    </div>
                    <div class="thin-line" style="margin:40px 0 20px 0"></div>
                    <div class="bottom-info">
                        <div class="tags-box">
                            <div class="del" @touchstart="delSubmit(story.id)">
                                <text class="text">删</text>
                            </div>
                            <div class="tag" v-for="(tag, index) in story.tag" :key="index">
                                <text class="text">{{tag}}</text>
                            </div>
                        </div>
                        <text class="update-time">{{story.createTime / 1000|moment("YYYY-MM-DD")}}</text>
                    </div>
                </div>
                <text class="no-more" v-if="thisMonthData.length > 0">已经没有更多了</text>
                <text class="no-more thismonth-no-dream" v-if="thisMonthData.length <= 0">这个月还没有做梦哦~</text>
            </div>
        </Main>
        <Footer>
            <text class="add-button" @touchstart="isOpen = true">述</text>
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
import HttpReq from '../utils/HttpRequest'
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
    (async () => {
      // let yearStore = await getStorage('yearStore')
      // let mouthStore = await getStorage('mouthStore')
      // if (yearStore.result !== 'failed' && mouthStore.result !== 'failed') {
      //   this.currentYear = parseInt(yearStore.data)
      //   this.currentMouth = parseInt(mouthStore.data)
      // }
      this.getMonthData(new Date(this.currentYear, this.currentMouth, 1), new Date(this.currentYear, this.currentMouth + 1, 0))
      this.getMinMonth()
    })()
  },
  methods: {
    chooseDateCallBack (yaer, mouth) {
      this.getMonthData(new Date(yaer, mouth, 1), new Date(yaer, mouth + 1, 0))
      this.currentYear = yaer
      this.currentMouth = mouth
    },
    jumpStoryDetail (story) {
      // this.$store.default.dispatch('setDate', {year: this.currentYear, mouth: this.currentMouth})
      // setStorage('yearStore', this.currentYear).then((res) => {
      //   return setStorage('mouthStore', this.currentMouth)
      // })
      //   .then((res) => {
          this.$router.push({name: 'showStoryDetail', query: { id: story.id }})
        // })
    },
    delSubmit (id) {
      // modal.confirm({
      //   message: '确认删除这个故事？',
      //   okTitle: '删除',
      //   cancelTitle: '再想想'
      // }, res => {
      //   if (res === '删除') {
      //     this.delStory(id)
      //   } else if (res === '差一点点') {}
      // })
    },
    delStory (id) {
      HttpReq('/tellDream/deleteStory',
        {data: {id: id}})
        .then(data => {
          if (data.status === 1) {
            this.thisMonthData = this.thisMonthData.filter(item => item.id !== id)
          }
        })
    },
    getMonthData (createTime, endTime) {
      HttpReq('/tellDream/getStory', {data: {
        createTime: Date.parse(createTime) / 1000,
        endTime: Date.parse(endTime) / 1000
      }})
        .then(data => {
          this.thisMonthData = data
        })
    },
    getMinMonth () {
      HttpReq('/tellDream/getMinMouth')
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
    height 100vh
    width 100vw
    display flex
    position fixed
    left 0
    top 0
    background url("http://pdleo6j6h.bkt.clouddn.com/HomeBack.jpg")
    background-size cover
    background-repeat no-repeat
    Header
        width 100%
        position absolute
        top .2rem
        left 0
        .header-msg-box
            height 1rem
            width 90%
            margin 0 auto
            background rgba(255, 255, 255, .8)
            border-radius 2rem
            text-align center
            font-size .45rem
            text-align center
            line-height 1rem
    Main
        height calc(100% - 100px)
        width 100%
        margin-top 100px
        padding 20px 0
        .contents-box
            width 90%
            margin 0 auto
            .no-more
                height 80px
                line-height 80px
                font-size 28px
                background rgba(255, 255, 255, .9)
                text-align center
                border-radius 4px
                color $light-gray
                &.thismonth-no-dream
                    height 240px
                    line-height 240px
            .content-box
                /*max-height 400px*/
                background rgba(255, 255, 255, .9)
                border-radius 4px
                box-sizing border-box
                padding 20px 30px 40px 30px
                margin-bottom 40px
                .h2
                    font-size 36px
                    line-height 2
                .event-content
                    margin-top 20px
                    .text
                        font-size 28px
                    .content
                        margin-bottom 10px
                .content
                    font-size 28px
                    .text
                        font-size 28px
                .back
                    margin-top 20px
                .bottom-info
                    display flex
                    flex-direction row
                    justify-content space-between
                    align-items center
                    span
                        font-size 24px
                        color $light-gray
                    .tags-box
                        display display
                        flex 1
                        align-items center
                        justify-content flex-start
                        flex-direction row
                        .del
                            margin-right 16px
                            display inline
                            .text
                                text-decoration line-through
                                font-size 24px
                                color $dark-bule
                        .tag
                            margin-right 10px
                            display inline
                            .text
                                font-size 24px
                    .update-time
                        flex-shrink 0
                        font-size 24px
                .thin-line
                    position relative
                    border none
                    margin 40px 0 20px 0
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
        width 100%
        position absolute
        bottom 0
        left 0
        height 100px
        box-shadow 0 -4px 6px $shadow-gray
        background white
        .add-button
            height 86px
            width 86px
            margin 12px auto
            border-radius 50%
            background rgba(101, 104, 209, 1)
            box-sizing border-box
            border 4px solid $light-bule-green
            font-size 36px
            color $light-bule-green
            text-align center
            line-height 82px
            font-weight 600
</style>
