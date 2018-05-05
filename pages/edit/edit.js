// pages/edit/edit.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: [],    // 员工列表
    total: '',        // 选中总人数
    manTotal: '',     // 选中男 人数
    womanTotal: ''    // 选中女 人数
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

      let total = 0,manTotal = 0,womanTotal = 0

      res.data.body.data.map((item, index) => {
        if (item.checkType === 2) {
          total++
          if (item.sex === 1) {
            // 男
            manTotal++
          } else if (item.sex === 2) {
            // 女
            womanTotal++
          }
        }
      })

      this.setData({
        userList: res.data.body.data,
        total: total,
        manTotal: manTotal,
        womanTotal: womanTotal
      })
    })
  },

  // 签到
  checkUser: function (e) {
    let index = e.detail.value[0] || e.target.dataset.index
    let sex = e.target.dataset.sex

    // checkType  1: 未出勤 2： 出勤
    if (e.detail.value[0]) {
      // 出勤
      this.data.userList[index].checkType = 2

      if (sex === 1) {
        // 男
        this.data.manTotal++
      } else if (sex === 2) {
        // 女
        this.data.womanTotal++
      }

      this.data.total++

    } else {
      // 未出勤
      this.data.userList[index].checkType = 1

      if (sex === 1) {
        // 男
        this.data.manTotal--
      } else if (sex === 2) {
        // 女
        this.data.womanTotal--
      }

      this.data.total--
    }

    this.setData({
      userList: this.data.userList,
      total: this.data.total,
      manTotal: this.data.manTotal,
      womanTotal: this.data.womanTotal
    })
  },
  // 临时结账
  checkTem (e) {
    let index = e.target.dataset.index

    // jieZhangType 0: 非临时结账  1： 临时结账
    if (this.data.userList[index].jieZhangType===0) {
      this.data.userList[index].jieZhangType = 1
    } else if (this.data.userList[index].jieZhangType === 1) {
      this.data.userList[index].jieZhangType = 0
    }

    this.setData({
      userList: this.data.userList
    })
  },
  // 提交 保存出席工作人员
  submit (e) {
    let userList = this.data.userList
    let arr = []
    userList.map((item, index)=>{
      let obj = {}
      if (item.checkType === 2) {
        obj.workerId = item.id
        if (item.jieZhangType === 1) {
          obj.type = '1'
        } else {
          obj.type = '0'
        }
        arr.push(obj)
      } else {
        return
      }
    })
    app.ajax("xcx/user/saveCheckWorker", "POST", {
      jsonData: JSON.stringify(arr)
    }).then(res => {
      wx.showToast({
        title: res.data.msg,
        icon: 'none'
      })
      if (res.data.success) {
        wx.switchTab({
          url: '../index/index',
        })
      }
    })
  },
  // 点击 管理人员
  manage: function () {
    wx.navigateTo({
      url: '../manage/manage',
    })
  }
})