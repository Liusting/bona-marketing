// pages/mine/mine.js
var app = getApp()
Component({
  data: {
    deviceW: '',//屏幕宽度
    deviceH: '', //屏幕高度
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
      // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    avatarUrl: "",//用户头像
    nickName: "",//用户昵称
    flag:false,
    flag1: true,
    //headItems
    headItems: [
      {
        id: 1,
        name: '余额',
        number:9.89
      },
      {
        id: 2,
        name: '积分',
        number:7840
      },
      // {
      //   id: 3,
      //   name: '卡',
      //   number:0
      // },
      {
        id: 4,
        name: '券',
        number:2
      }
    ],
    // orderItems
    orderItems: [
      {
        typeId: 1,
        icon:'pay',
        name: '待付款',
        badge: 7
      },
      {
        typeId: 2,
        icon:'send',
        name: '待发货',
        badge: 0
      },
      {
        typeId: 3,
        icon:'deliver',
        name: '待收货',
        badge: 120
      },
      {
        typeId: 4,
        icon:'edit',
        name: '待评价',
        badge: 2
      },
      {
        typeId: 5,
        icon: 'refund',
        name: '退货/售后',
        badge: 120,
      }
    ],
  },
  // tab切换的时候马上响应数据
  ready: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,//当前屏幕宽度
          deviceH: res.windowHeight//当前屏幕高度
        })
      }
    });

    this.bindGetUserInfo();
  },
  methods:{
  bindGetUserInfo: function (e) {
    var that = this;
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
                flag: true,
                flag1: false
              })
            }
          })
        }
      }
    })
  }
,
  toMyAccount:function(e){
    let id = e.currentTarget.dataset.id;
    switch(id){
      case 1: 
      wx.navigateTo({
        url: '../invest/invest',
      })
      break;
      case 2:
      wx.navigateTo({
        url: '../integral/integral',
      })
      break;
      case 3:
      wx.navigateTo({
        url: '../card/card',
      })
      break;
      case 4:
      wx.navigateTo({
        url: '../preferential/preferential',
      })
      break;
    }

  },
  //事件处理函数
  toOrder: function (e) {
    let typeId = e.currentTarget.dataset.typeid;//取遍历的id值
    switch (typeId){
      case 0:
        wx.navigateTo({
          url: '../sp_order_list/spOrderList?typeId=' + typeId //将要跳转id的值传参数过去
        });
        break;
      case 1:
        wx.navigateTo({
          url: '../sp_order_list/spOrderList?typeId=' + typeId//将要跳转id的值传参数过去
        });
        break;
      case 2:
        wx.navigateTo({
          url: '../sp_order_list/spOrderList?typeId=' + typeId//将要跳转id的值传参数过去
        });
        break;
      case 3:
        wx.navigateTo({
          url: '../sp_order_list/spOrderList?typeId=' + typeId//将要跳转id的值传参数过去
        });
        break;
      case 4:
        wx.navigateTo({
          url: '../sp_order_list/spOrderList?typeId=' + typeId//将要跳转id的值传参数过去
        });
        break;
      case 5: wx.navigateTo({
        url: '../me/refund',
      });
      break;
    }
  },
  // 我的优惠
  preferential: function () {
    let url = "../preferential/preferential";
    wx.navigateTo({
      url: url
    });
  },
  // 我的积分
  integral: function () {
    let url = "../integral/integral";
    wx.navigateTo({
      url: url
    });
  },
  // 账户安全
  accountSecurity: function () {
    let url = "../accountSecurity/accountSecurity";
    wx.navigateTo({
      url: url
    });
  },
  //收货地址
  address: function (e) {
    let url = "../addressList/addressList";
    wx.navigateTo({
      url: '../addressList/addressList?type=' + 3
    });
  },
  memberMessage: function(){
    let url = "../me/memberMessage";
    wx.navigateTo({
      url: url
    });
  },
  // 个人信息
  userMessage: function () {
    let url = "../userMessage/userMessage";
    wx.navigateTo({
      url: url
    });
  },
  onLoad: function () {

  },
  onShow:function(){

  }
  }
})