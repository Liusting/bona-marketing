Page({

  /**
   * 页面的初始数据
   */
  data: {
    currtab: 0,
    swipertab: [
      { name: '未使用', index: 0 },
      { name: '已使用', index: 1 },
      { name: '已过期', index: 2 },
    ],
    allOrder: [{
    },
    {

    },{},{}],
  },
  // 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
    this.getDeviceInfo()
  },

  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },

  /**
  * @Explain：选项卡点击切换
  */
  tabSwitch: function (e) {
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.target.dataset.current
      })
    }
  },

  tabChange: function (e) {
    this.setData({
      currtab: e.detail.current
    })
    this.orderShow()
  },
  orderShow: function () {
    let that = this
    switch (this.data.currtab) {
      case 0:
        that.allShow()
        break
      case 1:
        that.waitPayShow()
        break
      case 2:
        that.waitSendShow()
        break
    }
  },
  // 未使用
  allShow: function () {
    var that = this;
    this.setData({
      allOrder: that.allOrder
    })
  },
  // 已使用
  waitPayShow: function () {
    var that = this;
    this.setData({
      waitPayOrder: that.waitPayOrder
    })
  },
  // 已过期
  waitSendShow: function () {
    var that = this;
    this.setData({
      waitSendOrder: that.waitSendOrder
    })
  },

  // 点击立即使用
  cupon_use: function (e) {
    console.log(this.data.currtab);
    wx.showModal({
      title: '温馨提示',
      content: '您确认收到宝贝了吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.showToast({
            title: '收货成功',
            icon: 'success',
            duration: 2000,
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  }

})