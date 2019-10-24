var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
  // 
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (e) {
  },
  onLoad: function (e) {
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
 
  },
  //联系卖家
  chat:function(e){
    wx.navigateTo({
      url: '../sp_order_list/chat',
    })
  },
  //拨打电话
  call:function(e){
    wx.makePhoneCall({
      phoneNumber: '13047838940',
    })
  },
//点击店铺
  shop:function(){
    wx.navigateTo({
      url: '../shop/shop'
    })
  },
  // 取消订单
  closeOrder: function (e) {
    var that = this;
    wx.showModal({
      title: '温馨提示',
      content: '确定取消订单吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})