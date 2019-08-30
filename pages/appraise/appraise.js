// pages/appraise/appraise.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starDesc: '非常好',
    starDesc1: '非常好',
    starDesc2: '非常好',
    index:5,
    index1: 5,
    index2: 5,
    serviceStar:[],
    mannerStar:[],
    id:'',//订单id
    stars: [
      {
        flag: 1,
        bgImg: '/images/star/star_light.png',
        bgfImg: '/images/star/star_black.png',
        message: '非常差'
      },
      {
        flag: 1,
        bgImg: '/images/star/star_light.png',
        bgfImg: '/images/star/star_black.png',
        message: '差'
      },
      {
        flag: 1,
        bgImg: '/images/star/star_light.png',
        bgfImg: '/images/star/star_black.png',
        message: '一般'
      },
      {
        flag: 1,
        bgImg: '/images/star/star_light.png',
        bgfImg: '/images/star/star_black.png',
        message: '好'
      },
      {
        flag: 1,
        bgImg: '/images/star/star_light.png',
        bgfImg: '/images/star/star_black.png',
        message: '非常好'
      }
    ]
  },
  starClick: function (e) {
    var that = this;
    for (var i = 0; i < that.data.stars.length; i++) {
      var allItem = 'stars[' + i + '].flag';
      that.setData({
        [allItem]: 2
      })
    }
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i <= index; i++) {
      var item = 'stars[' + i + '].flag';
      that.setData({
        [item]: 1
      })
    }
    // 评价星星文字说明
    this.setData({
      starDesc: this.data.stars[index].message,
      index: index+1
    })
  },
  serviceStarClick: function (e) {
    var that = this;
    for (var i = 0; i < that.data.serviceStar.length; i++) {
      var allItem = 'serviceStar[' + i + '].flag';
      that.setData({
        [allItem]: 2
      })
    }
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i <= index; i++) {
      var item = 'serviceStar[' + i + '].flag';
      that.setData({
        [item]: 1
      })
    }
    // 评价星星文字说明
    this.setData({
      starDesc1: this.data.serviceStar[index].message,
      index1: index+1
    })
  },
  mannerStarClick: function (e) {
    var that = this;
    for (var i = 0; i < that.data.mannerStar.length; i++) {
      var allItem = 'mannerStar[' + i + '].flag';
      that.setData({
        [allItem]: 2
      })
    }
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i <= index; i++) {
      var item = 'mannerStar[' + i + '].flag';
      that.setData({
        [item]: 1
      })
    }
    // 评价星星文字说明
    this.setData({
      starDesc2: this.data.mannerStar[index].message,
      index2: index+1
    })
  },
  bindFormSubmit: function (e) {
    console.log(e.detail.value.textarea);
    wx.request({
      url: app.ipAndPort + '/spOrder/getAppraise',
      method: 'POST',
      data:{
        id: this.data.id,
        desc_star: this.data.index,
        service_star: this.data.index1,
        manner_star: this.data.index2
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function(res){
        wx.showToast({
          title: '主人~评价成功',
          icon:'success',
          duration:5000,
          success:function(res){
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let serviceStar = this.data.stars;
    let mannerStar = this.data.stars;
    this.setData({
      serviceStar: serviceStar,
      mannerStar: mannerStar,
      id: options.itemId
    })
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})