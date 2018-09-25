<template>
    <div class="loading">
        <cube-form
                :model="model"
                @validate="validateHandler"
                @submit="submitHandler">
            <cube-form-group>
                <cube-form-item :field="fields[0]"></cube-form-item>
                <cube-form-item :field="fields[1]"></cube-form-item>
                <cube-form-item :field="fields[2]"></cube-form-item>
            </cube-form-group>
            <cube-form-group>
                <cube-button type="submit">注册</cube-button>
            </cube-form-group>
            <p class="register"><span @touchstart="$router.replace({name: 'logIn'})">去登陆</span></p>
        </cube-form>
    </div>
</template>

<script>
  import Cookie from 'js-cookie'
  import md5 from 'md5'
  export default {
    name: "register",
    data() {
      return {
        model: {
          account: null,
          password: null,
          repassword: null
        },
        fields: [
          {
            type: 'input',
            modelKey: 'account',
            label: '用户名',
            props: {
              placeholder: '请输入用户名',
            },
            rules: {
              min: '3',
              max: '12'
            }
          },
          {
            type: 'input',
            modelKey: 'password',
            label: '密码',
            props: {
              placeholder: '请输入用户密码',
              type: 'password'
            },
            rules: {
              min: '3',
              max: '16'
            }
          },
          {
            type: 'input',
            modelKey: 'repassword',
            label: '重复密码',
            props: {
              placeholder: '重复密码必须和密码一致',
              type: 'password'
            },
            rules: {
              min: '3',
              max: '16'
            }
          }
        ]
      }
    },
    methods: {
      validateHandler (result) {
      },
      submitHandler() {
        if (this.model.password !== this.model.repassword) {
          const toast1 = this.$createToast({
            time: 1000,
            txt: '密码不一致，请重新输入！',
            type: 'error'
          })
          toast1.show()
          return false
        }

        (async () => {
          let haveUser = await this.$httpFetch('/tellDream/getUserByName', {data: {
              account: this.model.account},noLogin: true})
          if(haveUser.haveUser){
            const toast = this.$createToast({
              time: 1000,
              txt: '用户名已存在！',
              type: 'error'
            })
            toast.show()
            return false
          }

          this.$httpFetch('/tellDream/register', {data: {
              account: this.model.account,
              passWord: md5(this.model.password)
            },
            noLogin: true
          })
            .then(res => {
              Cookie.set('token', res.token)
              const toast2 = this.$createToast({
                time: 2000,
                txt: '注册成功！',
                type: 'correct'
              })
              toast2.show()
              window.setTimeout(() => {
                this.$router.push({name: 'Home'})
              }, 1000)
            })
            .catch(err => {
              const toast3 = this.$createToast({
                time: 1000,
                txt: err.err,
                type: 'error'
              })
              toast3.show()
            })
        })()
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../assets/style/base.styl"
    .loading
        height 100vh
        width 100vw
        display flex
        flex-direction column
        align-items center
        justify-content center
        background linear-gradient(to top , $pink 10%, $dark-bule 30%)
        .register
            color white
            margin-top 10px
            font-size 12px
            font-weight 300
            text-decoration underline
            text-align right
        .cube-form
            background none
            .cube-btn
                margin-top 20px
        .cube-form-item
            background white
            border-radius 4px
            margin-bottom 20px
            border-bottom none
</style>