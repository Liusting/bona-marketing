// pages/mine/mine.js
var app = getApp()
Page({
  data: {
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
      {
        id: 3,
        name: '卡',
        number:0
      },
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
        url: 'bill',
        imageurl: '../../images/person/personal_pay.png',
      },
      {
        typeId: 2,
        icon:'send',
        name: '待发货',
        url: 'bill',
        imageurl: '../../images/person/personal_shipped.png',
      },
      {
        typeId: 3,
        icon:'deliver',
        name: '已发货',
        url: 'bill',
        imageurl: '../../images/person/personal_receipt.png'
      },
      {
        typeId: 4,
        icon:'edit',
        name: '待评价',
        url: 'bill',
        imageurl: '../../images/person/personal_comment.png'
      },
      {
        typeId: 5,
        icon: 'edit',
        name: '退货维权',
        url: 'bill',
        imageurl: '../../images/person/personal_comment.png'
      }
    ],
  },
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
    wx.navigateTo({
      url: '../sp_order_list/spOrderList?typeId=' + typeId//将要跳转id的值传参数过去
    })
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
      url: '../addressList/addressList'
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

})