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
    console.log(app.globalData)
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
    app.login().then(res => {
      app.ajax('xcx/user/getCheckWorker', 'POST').then(res => {
        wx.hideLoading()
        this.setData({
          userList: res.data.body.checkWorkJoindata,
          checkWorkdata: res.data.body.checkWorkdata,
          loading: false
        })
      })
    })
  },

  onShow: function () {
    console.log('a')
  },

  // 添加出勤人员
  editStaff: function () {
    wx.switchTab({
      url: '../edit/edit',
    })
  },
})
