//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},       // 登录用户信息
    userList: [],       // 出勤人员
    checkWorkdata: {},  // 出勤总体情况
    loading: true
  },
  //事件处理函数

  

  onLoad: function () {
    wx.getUserInfo({
      success: (res) => {
        this.setData({
          userInfo: res.userInfo
        })
      }
    })
    wx.showLoading({
      title: 'aa',
      mask: true
    })
    if (app.globalData.isLogin) {
      this.getCheckWorker()
    } else {
      app.login().then(res => {
        this.getCheckWorker()
      })
    }
    
  },

  onShow: function () {
    if (app.globalData.isLogin) {
      app.ajax('xcx/user/getCheckWorker', 'POST').then(res => {
        wx.hideLoading()
        this.setData({
          userList: res.data.body.checkWorkJoindata,
          checkWorkdata: res.data.body.checkWorkdata,
          loading: false
        })
      })
    }
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    if (app.globalData.isLogin) {
      this.getCheckWorker().then(res => {
        if (res.data.success) {
          wx.stopPullDownRefresh()
        }
        
      })
    } else {
      app.login().then(res => {
        this.getCheckWorker().then(res => {
          if (res.data.success) {
            wx.stopPullDownRefresh()
          }
        })
      })
    }
  },

  // 获取当天出勤人员

  getCheckWorker: function() {
    return new Promise ((resolve, reject) => {
      app.ajax('xcx/user/getCheckWorker', 'POST').then(res => {
        wx.hideLoading()
        if (res.data.success) {
          this.setData({
            userList: res.data.body.checkWorkJoindata,
            checkWorkdata: res.data.body.checkWorkdata,
            loading: false
          })
          resolve(res)
        } else {
          reject(res)
        }
        
      })
    })
    
  },

  // 添加出勤人员
  editStaff: function () {
    wx.switchTab({
      url: '../edit/edit',
    })
  },
})
