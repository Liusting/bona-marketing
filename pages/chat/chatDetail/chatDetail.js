const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

/**
 * 初始化数据
 */
function initData(that) {
  inputVal = '';

  msgList = [{
      speaker: 'customer',
      contentType: 'text',
      content: '我怕是走错片场了...'
    },
    {
      speaker: 'server',
      contentType: 'text',
      content: '欢迎来到英雄联盟，敌军还有30秒到达战场，请做好准备！'
    }
  ]
  that.setData({
    msgList,
    inputVal
  })
}

/**
 * 计算msg总高度
 */
// function calScrollHeight(that, keyHeight) {
//   var query = wx.createSelectorQuery();
//   query.select('.scrollMsg').boundingClientRect(function(rect) {
//   }).exec();
// }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '',
    inputBottom: 0,
    inputValue: '',
    if_send: false,
    add: true,
    flag: true,
    deviceW: '', //屏幕宽度
    deviceH: '', //屏幕高度
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    bottom: 50,
    toolList: [{
        id: 1,
        name: '图片',
        icon: '../../../img/pictrue.png'
      },
      {
        id: 2,
        name: '拍摄',
        icon: '../../../img/camera.png'
      },
      {
        id: 3,
        name: '位置',
        icon: '../../../img/location.png'
      }
    ]
  },
  //返回
  BackPage() {
    wx.navigateBack({
      delta: 1
    });
  },
  add_icon_click: function() {
    var that = this;
    this.setData({
      flag: !that.data.flag
    })
    console.log(this.data.flag)
  },
  // 提交文字
  submitTo: function(e) {
    let that = this;
    if (that.data.inputValue == "") {
      return;
    } else {
      msgList.push({
        speaker: 'customer',
        contentType: 'text',
        content: that.data.inputValue
      })
      inputVal = '';
      that.setData({
        msgList,
        inputVal,
        if_send: false,
        inputValue: '',
        add: true,
        flag: true,
      });
    }
  },
  // 输入框
  bindKeyInput: function(e) {
    if (e.detail.value == "") {
      this.setData({
        if_send: false,
        inputValue: e.detail.value
      })
    } else {
      this.setData({
        if_send: true,
        inputValue: e.detail.value,
        flag: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    initData(this);
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          deviceW: res.windowWidth, //当前屏幕宽度
          deviceH: res.windowHeight //当前屏幕高度
        })
      }
    });
    // debugger;
    let height = that.data.deviceH - that.data.CustomBar - that.data.bottom;
    that.setData({
      scrollHeight: height
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 获取聚焦
   */
  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight)
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })

  },

  //失去聚焦(软键盘消失)
  blur: function(e) {
    var that = this;
    let height = that.data.deviceH - that.data.CustomBar - that.data.bottom;
    this.setData({
      scrollHeight: height,
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },

  /**
   * 发送点击监听
   */
  sendClick: function(e) {
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    })
    inputVal = '';
    this.setData({
      msgList,
      inputVal,
      if_send: false,
      inputValue: '',
      add: true,
      flag: true,
    });


  },

  /**
   * 退回上一页
   */
  toBackClick: function() {
    wx.navigateBack({})
  }

})