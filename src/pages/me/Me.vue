<template>
  <div class="container">
    <div class="userinfo" @click='login' v-if="canIUse" open-type="getUserInfo">
      <img :src="userInfo.avatarUrl">
      <p>{{userInfo.nickName}}</p>
    </div>
    <year-progress></year-progress>
    <button v-if="userInfo.openId" @click='scanBook' class="btn">添加图书</button>
  </div>
</template>

<script>
import { post, showSuccess, showModel } from 'utils/utils'
import qcloud from 'wafer2-client-sdk'
import { addBookUrl, loginUrl } from 'api/api'
import YearProgress from 'components/YearProgress'
export default {
  name: 'Me',
  components: {
    YearProgress
  },
  data () {
    return {
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      userInfo: {
        avatarUrl: '../../../static/img/unlogin.png',
        nickName: '点击登录'
      }
    }
  },
  methods: {
    async addBook (isbn) {
      const res = await post(addBookUrl, {
        isbn,
        openid: this.userInfo.openId
      })
      console.log(res)
      showModel('添加成功', `《${res.title}》添加成功`)
    },
    scanBook () {
      wx.scanCode({
        success: res => {
          if (res.result) {
            this.addBook(res.result)
          }
        }
      })
    },
    login () {
      let user = wx.getStorageSync('userinfo')
      if (!user) {
        qcloud.setLoginUrl(loginUrl)
        qcloud.login({
          success: userInfo => {
            try {
              showSuccess('登陆成功')
              wx.setStorageSync('userinfo', userInfo)
              this.userInfo = userInfo
            } catch (e) {
            }
          },
          fail: err => {
            console.log('登录失败', err)
          }
        })
      }
    }
  },
  onShow () {
    let userInfo = wx.getStorageSync('userinfo')
    if (userInfo) {
      this.userInfo = userInfo
    }
  }
}
</script>

<style lang="scss">
.container {
  padding: 30rpx;
  .userinfo {
    margin-top: 100rpx;
    text-align: center;
    img {
      width: 150rpx;
      height: 150rpx;
      margin: 20rpx;
      border-radius: 50%;
    }
  }
}
</style>
