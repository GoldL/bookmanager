<template>
  <div></div>
</template>

<script>
// import { get } from './utils/utils'
import qcloud from 'wafer2-client-sdk'
import config from './utils/config'
export default {
  created () {
    qcloud.setLoginUrl(config.loginUrl)
    qcloud.login({
      success: function (userInfo) {
        console.log('登录成功', userInfo)
      },
      fail: function (err) {
        console.log('登录失败', err)
      }
    })
  }
}
</script>
