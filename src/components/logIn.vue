<template>
    <div class="loading">
        <cube-form
            :model="model"
            @validate="validateHandler"
            @submit="submitHandler">
            <cube-form-group>
                <cube-form-item :field="fields[0]"></cube-form-item>
                <cube-form-item :field="fields[1]"></cube-form-item>
            </cube-form-group>
            <cube-form-group>
                <cube-button type="submit">登陆</cube-button>
            </cube-form-group>
            <p class="register"><span @touchstart="$router.replace({name: 'register'})">注册</span></p>
        </cube-form>
    </div>
</template>

<script>
  import Cookie from 'js-cookie'
  import md5 from 'md5'
  export default {
    name: "logIn",
    data() {
      return {
        model: {
          account: null,
          password: null
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
            max: '12',
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
            max: '16',
          }
        },
        ]
    }
    },
    methods: {
      validateHandler (result) {
      },
      submitHandler() {
        if(this.model.account == null || this.model.account == ''){
          const toast4 = this.$createToast({
            time: 2000,
            txt: '用户名不能为空！',
            type: 'error'
          })
          toast4.show()
          return false
        }
        if(this.model.password == null || this.model.password == ''){
          const toast3 = this.$createToast({
            time: 2000,
            txt: '密码不能为空！',
            type: 'error'
          })
          toast3.show()
          return false
        }
        this.$httpFetch('/tellDream/login', {data: {
            account: this.model.account,
            password: md5(md5(this.model.password) + 'pou')
          },
          noLogin: true
        })
          .then(res => {
            Cookie.set('token', res.token)
            const toast2 = this.$createToast({
              time: 2000,
              txt: '登陆成功！',
              type: 'correct'
            })
            toast2.show()
            window.setTimeout(() => {
              this.$router.push({name: 'Home'})
            }, 1000)
          })
          .catch(err => {
            const toast = this.$createToast({
              time: 2000,
              txt: err.err,
              type: 'error'
            })
            toast.show()
          })
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