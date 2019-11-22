// pages/footprints/footprints.js
var app = getApp();
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
    flag:true,
    flag2:true,
    footList:[
      {
        id: 1,
        time:'今天',
        goodList:[
          {
            id:1,
            name:'苹果11',
            money:23,
            check:false
          },
          {
            id: 2,
            name: '小米10',
            money: 23,
            check: false
          },
          {
            id: 3,
            name: '华为20',
            money: 23,
            check: false
          }
        ]
      },
      {
        id: 2,
        time: '昨天',
        goodList: [
          {
            id: 1,
            name: '苹果11',
            money: 23,
            check: false
          },
          {
            id: 2,
            name: '小米10',
            money: 23,
            check: false
          },
          {
            id: 3,
            name: '华为20',
            money: 23,
            check: false
          }
        ]
      }
    ]
  },
  selectALL:function(){
    let footList = this.data.footList;
    for (let i = 0; i < footList.length;i++){
      let goodList = footList[i].goodList;
      for(let j = 0;j < goodList.length;j++){
        goodList[j].check = !goodList[j].check
      }
    }
    this.setData({
      flag2: !this.data.flag2,
      footList: footList
    })
  },
  edit:function(){
    this.setData({
      flag:!this.data.flag
    })
  },
  deletecheck:function(e){
    // console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    let footList = this.data.footList;
    for (let i = 0; i < footList.length; i++) {
      let goodList = footList[i].goodList;
      for (let j = 0; j < goodList.length; j++) {
        if(goodList[j].id == id){
          goodList[j].check = !goodList[j].check;
        }
      }
    }
    
    this.setData({
      flag1:!this.data.flag1,
      footList: footList,
    })
    this.jusAll();
  },
  jusAll:function(){
    let lenIndex = 0;
    let footList = this.data.footList;
    for (let i = 0; i < footList.length; i++) {
      let goodList = footList[i].goodList;
      for (let j = 0; j < goodList.length; j++) {
        if (goodList[j].check) {
          lenIndex++;
        }
      }
    }
    this.setData({
      // flag2: goodList.length == lenIndex
    })
    console.log(lenIndex);
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