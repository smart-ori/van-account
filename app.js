//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 登录
    // this.login()
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  
  // 登录
  login: function () {
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId

          wx.request({
            url: 'https://www.meijile.xin/api/xcx/login',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              code: res.code
            },
            success: res => {
              if (res.data.success) {
                this.globalData.token = res.data.body.token
                wx.setStorageSync('token', res.data.body.token)
              }
              resolve(res)
            },
            fail: err => {
              wx.showToast({
                title: '登录异常',
                icon: 'none'
              })
              reject(err)
            }
          })

        }
      })
    })
    
  },

  // Promise请求
  ajax: function (url, method, data) {
    let baseUrl = 'https://www.meijile.xin/api/'
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        method: method,
        data: data,
        header: {
          'Authentication': wx.getStorageSync('token'), // 默认值
          "content-type": method === 'POST' ? "application/x-www-form-urlencoded" :"application/json"
        },
        success: res => {
          resolve(res)
        },
        fail: err => {
          reject(err)
        }
      })
    })
    
  },
  globalData: {
    userInfo: null,
    token: ''
  }
})