
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: 0,       // 判断当前 input:focus状态
    name: '',
    phone: '',
    address: '',
    payOfferId: '',       // 工资标准
    type: '',             // 类型 1、公共2、私有
    sex: '',              // 性别 1 男 2 女
    workerOffer: [],      // 工资标准
    offerIndex: 0 // 当前选中的工资标准 
  },

  // 输入框 获取焦点
  focus (e) {
    console.log(e)
    this.setData({
      state: e.target.dataset.state
    })
    console.log(this.data.state)
  },

  nameInp: function (e) {
    this.setData({
      name: e.detail.value 
    })
  },
  mobileInp: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  addressInp: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  offerChange: function (e) {
    console.log(typeof e.detail.value)
    this.setData({
      offerIndex: e.detail.value
    })
  },
  sexChange: function (e) {
    this.setData({
      sex: e.detail.value
    })
  },
  typeChange: function (e) {
    this.setData({
      type: e.detail.value
    })
  },

  submit: function () {
    let mobileReg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (!this.data.name) {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none'
      })
      return
    }
    if (!mobileReg.test(this.data.phone)) {
      wx.showToast({
        title: '电话格式不正确',
        icon: 'none'
      })
      return
    }
    if (!this.data.address) {
      wx.showToast({
        title: '地址不能为空',
        icon: 'none'
      })
      return
    }
    if (!this.data.sex) {
      wx.showToast({
        title: '请选择性别',
        icon: 'none'
      })
      return
    }
    if (!this.data.type) {
      wx.showToast({
        title: '请选择类型',
        icon: 'none'
      })
      return
    }
    
    app.ajax('xcx/user/addWorker', 'POST', {
      name: this.data.name,
      sex: this.data.sex,
      address: this.data.address,
      phone: this.data.phone,
      payOfferId: this.data.workerOffer[this.data.offerIndex]['id'],
      type: this.data.type,
    }).then(res => {
      if(res.data.success) {
        wx.showToast({
          title: res.data.msg,
          icon: 'success'
        })
      } else {
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        })
      }
      console.log(res.data.success)
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.ajax('xcx/user/getWorkerOffer', 'POST').then(res => {
      let workerOffer = res.data.body.data
      workerOffer.map((item, index) => {
        workerOffer[index].info = item.type + '：' + item.payOffer + '元'
      })
      this.setData({
        workerOffer: workerOffer
      })
    })
  }
})