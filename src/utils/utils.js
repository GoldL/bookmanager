import { ERROK } from 'api/config'

export function get (url, data) {
  return request(url, 'GET', data)
}

export function post (url, data) {
  return request(url, 'POST', data)
}

function request (url, method, data, header = { }) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      header,
      url: url,
      success: res => {
        if (res.data.code === ERROK) {
          resolve(res.data.data)
        } else {
          showModel('失败', res.data.data.msg)
          reject(res.data)
        }
      }
    })
  })
}

export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

export function showModel (title, content) {
  wx.showModel({
    title,
    content,
    showCancel: false
  })
}
