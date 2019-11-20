var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "",//用户头像
    nickName: "",//用户昵称
    name:null,
    array: ['男', '女'],//性别选择
    date: null,//生日
    index : null,//
    phoneNumber:null,
    id:'',
    deviceW: '',//屏幕宽度
    deviceH: '', //屏幕高度
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
  },
 showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e){
    this.setData({
      modalName: null
    })
  },
  formSubmit:function(e){

    this.setData({
      name:e.detail.value.userName
    })
    this.updateMessage();
  },
  phoneNumberSubmit:function(e){
    // console.log(e.detail.value.phoneNumber);
    this.setData({
      phoneNumber: e.detail.value.phoneNumber
    })
    this.updateMessage();
  },
  //性别改变
  changeSexy: function (e) {
    this.setData({
      index: e.detail.value
    })
    this.updateMessage();
  },
  //生日改变
  changeDate: function (e) {
    this.setData({
      date: e.detail.value
    })
    this.updateMessage();
  },
  updateMessage:function(e){
    let name = this.data.name;
    let phoneNumber = this.data.phoneNumber;
    let sexy = this.data.index;
    let birthDay = this.data.date;
    let id = this.data.id;
    wx.request({
      url: app.ipAndPort + '/spUser/updateUserMessage',
      method: 'POST',
      data: {
        id: id,
        name: name,
        phoneNumber: phoneNumber,
        sexy: sexy,
        birthDay: birthDay
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success:function(res){
        if(res.data.code == 1){
          wx.showToast({
            title: '更改信息成功',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,//当前屏幕宽度
          deviceH: res.windowHeight//当前屏幕高度
        })
      }
    });

    wx.request({
      url: app.ipAndPort + '/spUser/getUserMessage',
      method: 'POST',
      data:{
        id:2
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success:function(res){
        let userMessage = res.data;
        that.setData({
          name: userMessage[0].name,
          phoneNumber: userMessage[0].phoneNumber,
          index: userMessage[0].sexy,
          date: userMessage[0].birthDay,
          id: userMessage[0].id
        })
      }

    });
    // 判断是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo
              var nickName = userInfo.nickName;//获取微信用户昵称
              var avatarUrl = userInfo.avatarUrl; //获取微信用户头像存放的Url 
              that.setData({
                avatarUrl: avatarUrl,
                nickName: nickName,
              })
            }
          })
        }
      }
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