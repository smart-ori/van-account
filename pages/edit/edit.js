// pages/edit/edit.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.ajax('xcx/user/getAllWorker', 'POST').then(res => {
      this.setData({
        userList: res.data.body.data
      })
    })
  },

  // 签到
  checkUser: function (e) {
    let index = e.detail.value[0] || e.target.dataset.index
    if (e.detail.value[0]) {
      this.data.userList[index].attend = true
    } else {
      this.data.userList[index].attend = false
    }
    this.setData({
      userList: this.data.userList
    })
    
  },
  // 临时结账
  checkTem (e) {
    let index = e.detail.value[0] || e.target.dataset.index
    if (e.detail.value[0]) {
      this.data.userList[index].tem = true
    } else {
      this.data.userList[index].tem = false
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
      if (item.attend) {
        obj.workerId = item.id
        if (item.tem) {
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
    })
  },
  // 点击 添加人员
  addUser: function () {
    wx.navigateTo({
      url: '../add-user/add-user',
    })
  }
})