// pages/chat/chat.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    deviceW: '', //屏幕宽度
    deviceH: '', //屏幕高度
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    messageList: [{
        id: 1,
        name: '顺德家具城',
        time: '19/10/03'
      },
      {
        id: 1,
        name: '乐从大福家具城',
        time: '19/10/03'
      },
      {
        id: 1,
        name: '顺德喜羊羊家具城',
        time: '19/10/03'
      }
    ]
  },
  ready: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          deviceW: res.windowWidth, //当前屏幕宽度
          deviceH: res.windowHeight //当前屏幕高度
        })
      }
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    chatDetail: function() {
      wx.navigateTo({
        url: '../chat/chatDetail/chatDetail',
      })
    }
  }
})