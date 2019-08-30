// pages/userMessage/userMessage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['男', '女'],//性别选择
    date: '2019-08-10',//生日默认时间
    index : 0,//性别默认男

  },
 showModal(e) {
   console.log(e.currentTarget.dataset.target);
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e){
    this.setData({
      modalName: null
    })
  },
  //性别改变
  changeSexy: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  //生日改变
  changeDate: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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