Page({

  /**
   * 页面的初始数据
   */
  data: {
    currtab: 0,
    swipertab: [
      { name: '积分明细', index: 0 },
      { name: '收入积分', index: 1 },
      { name: '积分使用', index: 2 },
    ], 
    integralDetail:[
      { create_time:'2019-08-12 09:34:43',name:'乘车积分',number:'89'},
      { create_time: '2019-08-12 09:34:43', name: '乘车积分', number: '89' },
      { create_time: '2019-08-12 09:34:43', name: '乘车积分', number: '89' },
      { create_time: '2019-08-12 09:34:43', name: '兑换车票', number: '-8999' }
    ],
    integralIncome: [
      { create_time: '2019-08-12 09:34:43', name: '乘车积分', number: '89' },
      { create_time: '2019-08-12 09:34:43', name: '乘车积分', number: '89' },
      { create_time: '2019-08-12 09:34:43', name: '乘车积分', number: '89' }
    ],
    integralUse: [
      { create_time: '2019-08-12 09:34:43', name: '兑换车票', number: '-8900' },
      { create_time: '2019-08-12 09:34:43', name: '兑换车票', number: '-8900' },
      { create_time: '2019-08-12 09:34:43', name: '积分兑换', number: '-8900' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({
      currtab: e.typeId
    })
    this.orderShow()
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
    this.integralShow()
  },
  integralShow: function () {
    let that = this
    switch (this.data.currtab) {
      case 0:
        that.integralDetailShow()
        break
      case 1:
        that.integralIncomeShow()
        break
      case 2:
        that.integralUseShow()
        break
    }
  },
  // 积分明细
  integralDetailShow: function () {
    var that = this;
    this.setData({
      integralDetail: that.data.integralDetail
    })
  },
  //收入积分 
  integralIncomeShow: function () {
    var that = this;
    this.setData({
      integralIncome: that.data.integralIncome
    })
  },
  // 积分使用
  integralUseShow: function () {
    var that = this;
    this.setData({
      integralUse: that.data.integralUse
    })
  },
})