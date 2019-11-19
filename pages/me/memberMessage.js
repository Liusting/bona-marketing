const app = getApp();
Page({
  data: {
    deviceW: '',//屏幕宽度
    deviceH: '', //屏幕高度
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    iconList: [ 
      {
        icon: 'medalfill',
        color: 'blue',
        name: '身份铭牌'
      },
      {
        icon: 'medalfill',
        color: 'blue',
        name: '身份铭牌'
      },
      {
      icon: 'goods',
      color: 'blue',
      name: '购物折扣'
    }, {
      icon: 'presentfill',
      color: 'purple',
      name: '生日好礼'
    }]
  },
  onLoad() {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,//当前屏幕宽度
          deviceH: res.windowHeight//当前屏幕高度
        })
      }
    });
    setTimeout(function () {
      that.setData({
        loading: true
      })
    }, 500)
  },
  //立即升级会员
  upgrade:function(e){
    
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  SetColor(e) {
    this.setData({
      color: e.currentTarget.dataset.color,
      modalName: null
    })
  },
  SetActive(e) {
    this.setData({
      active: e.detail.value
    })
  }
})