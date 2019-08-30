const app = getApp();
Page({
  data: {
     shouJiHao:''
  },

  talks: function (e) {
    this.setData({
      shouJiHao: e.detail.value
    })
  },

  dengLv:function(e){
    wx.request({
      url: 'http://192.168.43.209:8081/login/submit',
      method: 'POST',
      data: {
        name: this.data.shouJiHao,
        passWork: '123456'
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        var data = res.data;
        wx.navigateTo({
          url: '/pages/'+data　　// 页面 B
        })
      }
    })
  }
})