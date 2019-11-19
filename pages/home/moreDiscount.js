var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currtab: 0,
    swipertab: [
      { name: '08:00', index: 0 },
      { name: '10:00', index: 1 },
      { name: '12:00', index: 2 },
      { name: '14:00', index: 3 },
      { name: '16:00', index: 4 },
    ],
    orderList: [],
    deviceW: '',//屏幕宽度
    deviceH: '', //屏幕高度
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,

  },
  // 
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (e) {

  },
  onLoad: function (e) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight);
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
    this.setData({
      currtab: e.typeId
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
  },

  // 订单详情页
  orderDetail: function () {
  },

  /**
  * @Explain：选项卡点击切换
  */
  tabSwitch: function (e) {
    var that = this
    if (this.data.currtab === e.currentTarget.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.currentTarget.dataset.current
      })
    }
  },
})