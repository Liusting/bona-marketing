var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currtab: 0,
    pay_status:'',//支付状态
    swipertab: [
      { name: '全部', index: 0}, 
      { name: '待付款', index: 1 },  
      { name: '待发货', index: 2 },
      { name: '待收货', index: 3 },
      { name: '待评价', index: 4 },
      ],
    orderList: [],
  },
// 
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(e){
    this.orderListShow();
  },
  onLoad: function (e) {
    this.setData({
      currtab: e.typeId
    })
    this.orderListShow();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
    this.getDeviceInfo()
  },

  // 订单详情页
  orderDetail:function(){
    wx.navigateTo({
      url: '../sp_order_list/orderDetail',
    })
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
    var pay_status = '';
    var that = this;
    if (e.detail.current == 1){
      pay_status = 0;
    } else if (e.detail.current == 2||3||4){
      pay_status = 1;
    }
    this.setData({ 
      currtab: e.detail.current,
      pay_status: pay_status
      })
    if (this.data.currtab == 1 || 2 || 3 || 4) {
      that.orderListShow();
    }
  },
  orderListShow: function () {
    var that = this;
    wx.request({
      url: app.ipAndPort + '/spOrder/getOrderList',
      method: 'POST',
      data: {
        pay_status: this.data.pay_status,
        trade_status: this.data.currtab
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        let orderList = res.data.orderList
        that.setData({
          orderList: orderList
        })
      }
    })
  },
// 点击立即评价
appraise:function(e){
  wx.navigateTo({
    url: '../appraise/appraise?itemId=' + e.currentTarget.dataset.id +'&index='+this.data.currtab,
  })
},
// 取消订单
cancelOrder: function(e){
  var that = this;
  wx.showModal({
    title: '温馨提示',
    content: '确定取消订单吗？',
    success(res) {
      if (res.confirm) {
        wx.request({
          url: app.ipAndPort + '/spOrder/canCelList',
          method: 'POST',
          data: {
            id : e.currentTarget.dataset.id
          },
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (res) {
            if(res.code == 1){
              that.orderListShow();
              wx.showToast({
                title: '取消订单成功',
                icon: 'success',
                duration: 2000,
              })
            }
          }
        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
},
// 确认收货
confirmGet:function(e){
  console.log(e);
  var that = this;
  wx.showModal({
    title: '温馨提示',
    content: '您确认收到宝贝了吗？',
    success(res) {
      if (res.confirm) {
        wx.request({
          url: app.ipAndPort + '/spOrder/confirmReceive',
          method: 'POST',
          data: {
            id: e.currentTarget.dataset.id,
            trade_status: that.data.currtab
          },
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (res) {
            if (res.code == 1) {
              that.orderListShow();
              wx.showToast({
                title: '收货成功',
                icon: 'success',
                duration: 2000,
              })
            }
          }
        })
      }
    }
  })
},
//提醒卖家发货
remind:function(){
  wx.showToast({
    title: '主人~提醒成功',
    icon:'success'
  })
}
})