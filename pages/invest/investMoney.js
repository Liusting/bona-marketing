const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceW: '',//屏幕宽度
    deviceH: '', //屏幕高度
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    investmoney:'20',
    moneyNumber:'',
    moneyList:[
      {
        id:1,
        money:'20',
        check:true
      },
      {
        id: 2,
        money: '50',
        check: false
      },
      {
        id: 3,
        money: '100',
        check: false
      }, {
        id: 4,
        money: '200',
        check: false
      }
    ]
  },
  //立即充值
  invest:function(e){
    if(this.data.investmoney == ''&&this.data.investmoney == 0){
      wx.showToast({
        icon:'none',
        title: '充值金额有误',
      })
    }else{
      console.log(this.data.investmoney)
      wx.showToast({
        title: '充值成功',
        duration:2000
      })
    }
  },
  //其他充值金额
  moneyInput:function(e){
    this.setData({
      investmoney:e.detail.value
    })
  },
  Focus:function(e){
    let moneyl = this.data.moneyList;
    for(let i = 0; i < moneyl.length; i++){
      moneyl[i].check = false
    }
    this.setData({
      moneyList:moneyl,
      investmoney:0
    })
  },
  //充值金额
  investmoney:function(e){
    let id = e.currentTarget.dataset.id;
    let money = e.currentTarget.dataset.money;
    let moneyl = this.data.moneyList;
    for(let i = 0; i < moneyl.length; i++){
      if (moneyl[i].id == id){
        moneyl[i].check = true
      }else{
        moneyl[i].check = false
      }
    }
    this.setData({
      moneyList: moneyl,
      investmoney:money,
      moneyNumber:''
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
    let moneyl = that.data.moneyList;
    for(let i = 0;i < moneyl.length; i++){
      if(moneyl[i].check){
        moneyl[i].money = that.data.investmoney;
      }
    }
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