//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userList: []
  },
  //事件处理函数

  onLoad: function () {
    app.login().then(res => {
      app.ajax('xcx/user/getCheckWorker', 'POST').then(res => {
        console.log(res)
          this.setData({
            userList: res.data.body.checkWorkJoindata
          })
      })
    })
  },
})
