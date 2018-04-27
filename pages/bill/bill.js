//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    billType: 'tem',    // 当前显示账单类型 （临时账单、周账单）
    temBill: {},        // 临时账单
    weekBill: {}        // 周账单
  },
  
  onLoad: function () {

  },

  onShow: function () {
    this.getMomentBill()
  },

  //事件处理函数


  // 选择临时账单 周账单
  selectBill: function (e) {
    this.setData({
      billType: e.target.dataset.type
    })
  },


  getMomentBill() {
    app.ajax('xcx/user/getMomentBill', 'POST').then(res => {
      this.setData({
        temBill: res.data.body.data
      })
    })
  }

})
