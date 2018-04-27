// component/tem-bill/tem-bill.js
const app = getApp()
Component({

  //组件的属性列表
  properties: {
    temBill: {
      type: Object,
      value: '',
      observer: function (newVal, oldVal) {
        console.log(newVal)
      }
    }
  },

  //组件的初始数据
  data: {
    bill: {},    // 账单信息
    entity: {}   // 账单明细信息
  },

  attached: function () {
    // this.getMomentBill()
  },

  ready: function () {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getMomentBill () {
      app.ajax('xcx/user/getMomentBill', 'POST').then(res => {
        this.setData({
          bill: res.data.body.data,
          entity: res.data.body.data.xcxCheckWorkEntity
        })
      })
    }
  }
})
