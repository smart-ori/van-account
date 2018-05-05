// pages/edit/edit.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: [],    // 员工列表
    total: '',       // 总人数
    manTotal: '',    // 男 总人数
    womanTotal: ''   // 女 总人数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // onshow
  onShow: function () {
    this.getAllWorker()
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    this.getAllWorker()
  },

  // 获取所有人员信息
  getAllWorker: function () {
    app.ajax('xcx/user/getAllWorker', 'POST').then(res => {

      wx.stopPullDownRefresh()

      this.setData({
        userList: res.data.body.data,
        total: res.data.body.data.length
      })

      let manTotal = 0,
          womanTotal = 0
      this.data.userList.map((item, index) => {
        if (item.sex === 1) {
          manTotal++
        } else {
          womanTotal++
        }
      })
      this.setData({
        manTotal: manTotal,
        womanTotal: womanTotal
      })
    })
  },

  // 添加人员

  addUser: function () {
    wx.navigateTo({
      url: '../add-user/add-user?operate=add'
    })
  },

  // 点击编辑 人员
  editUser: function (e) {
    let index = e.target.dataset.index
    let userInfo = this.data.userList[index]
    wx.setStorageSync('editUserInfo', JSON.stringify(userInfo))
    wx.navigateTo({
      url: '../add-user/add-user?operate=edit'
    })
  }

})