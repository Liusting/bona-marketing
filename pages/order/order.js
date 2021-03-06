const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    bottom_view_height2: 100,
    deviceH: '',//当前屏幕高度
    deviceW:'',
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    load: true,
    address_info: {}, //地址信息
    preferential_info: {},//商品优惠信息
    goods_info: [], //商品信息
    goods_count: '', //商品件数
    goods_freight: '', //运费
    goods_price: '', //商品价格
    total_price: '', //合计价格
    itemId: '', //商品id
    type: '', //选项
    order_message: '', //订单留言
    cart_ids: [], // 购物车商品id
    addressId: '',
    modeName:'快递',
    typeList:'',
    show: true,
    flag: false,
    flag1: true,
    flag2: 0,
    flag3:true,
    mode: [
     { type: '0', name: '快递', checked:'true' },
     { type: '1', name: '门店自提' }, 
     { type: '2', name: '商家配送' }, 
     { type: '3', name: '系统配送'}
     ],
    item: {
      iconfontBack: "icon-arrowleft",
      navigationBarTitle: "确认订单",
      statusBarHeight: app.globalData.statusBarHeight
    },
    statusBarHeight: app.globalData.statusBarHeight,
    timeList:[{
      id:'0',
      time:'09:00-10:00'
    }, {
      id: '1',
      time: '10:00-11:00'
      }, {
      id: '2',
      time: '11:00-12:00'
      }, {
      id: '3',
      time: '12:00-13:00'
      }, {
      id: '4',
      time: '13:00-14:00'
      }, {
      id: '0',
      time: '14:00-15:00'
      }, {
      id: '0',
      time: '15:00-16:00'
      }, {
        id: '0',
        time: '16:00-17:00'
      }, {
        id: '0',
        time: '17:00-18:00'
      }, {
        id: '0',
        time: '18:00-19:00'
      }, {
        id: '0',
        time: '19:00-20:00'
      }, {
        id: '0',
        time: '20:00-21:00'
      }, {
        id: '0',
        time: '21:00-22:00'
      }]
  },
  //choose time by myself
  selectTime: function(e){
    console.log(e);
  },
  //选择支付方式
  selectPay: function(e){
    console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    if(id == 1){
      this.deliver();
    }
  },
  //选择今天/明天/后天
  switchNav: function (e) {
    var page = this;
    var id = e.target.id;
    if (this.data.currentTab == id) {
      return false;
    } else {
      page.setData({
        currentTab: id
      });
    }
    page.setData({
      flag2: id
    });
  },
//配送方式选择
  radioselect: function(e){
    if (e.currentTarget.dataset.item.type == 1){
      this.setData({
        flag:true,
        flag1: false
      })
    }else if (e.currentTarget.dataset.item.type == 2) {
      this.setData({
        flag: false,
        flag1: true,
        flag3: false
      })
    }else if (e.currentTarget.dataset.item.type == 0 ){
      this.setData({
        flag: false,
        flag1: true
      })
    }
    this.setData({
      modeName: e.currentTarget.dataset.item.name
    })
  },
  //选择地址
  bindaddress: function () {
      wx.navigateTo({
        url: '../addressList/addressList?type=' + 2
      })
  },
  // 留言
  bindwaitMsg: function (event) {
    this.setData({
      order_message: event.detail.value, // 订单留言
    })
  },
  //优惠券
  preferential:function(){
    wx.navigateTo({
      url: '../preferential/preferential'
    })
  },

  /**
   * 支付订单
   */
  payOrder: function (orderHash, order_id) {
    var that = this;
    var order_hash = orderHash;
    console.log(order_hash)
    //呼起微信支付
    MBC.Ajax({
      url: api.getPayConfig,
      is_login: true,
      data: {
        hash: order_hash,
        platform: 'miniProgram',
        channel: 'weixin'
      },
      success: function (res) {
        wx.requestPayment({
          'timeStamp': res.result.parameters.timeStamp,
          'nonceStr': res.result.parameters.nonceStr,
          'package': res.result.parameters.package,
          'signType': 'MD5',
          'paySign': res.result.parameters.paySign,
          'success': function (res) {
            console.log(res);
            MBC.Ajax({
              url: api.payOrder,
              is_login: true,
              data: {
                hash: order_hash
              },
              success: function (res) {
                console.log(res)
                var status = res.result.status;
                if (status == 2) {
                  wx.showToast({
                    title: '支付成功',
                  });
                  wx.redirectTo({
                    url: '../orderInfo/orderInfo?order_id=' + order_id,
                  })

                } else {
                  wx.showToast({
                    title: '支付失败，请稍后刷新',
                  })
                }

              }
            })
          },
          'fail': function (res) {
            console.log(res);
            wx.redirectTo({
              url: '../orderInfo/orderInfo?order_id=' + order_id,
            })
          }
        })
      }
    })

  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  //提交订单
  deliver:function(e){
    wx.request({
      url: app.ipAndPort + '/spOrder/addOrder',
      method: 'POST',
      data: {
        item_id: this.data.itemId,
        type_id:'2',
        user_id:'2',
        trade_status:'2',
        pay_status:'1',
        money:this.data.goods_price,
        number: this.data.goods_count,
        total_price: this.data.total_price,
        remark: this.data.order_message
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
      }
    })
  },
  // //  提交订单
  // bindSubmitOrder: function (e) {
  //   var form_id = e.detail.formId;
  //   var that = this;
  //   var type = this.data.type;
  //   if (type == 1) {
  //     MBC.Ajax({
  //       url: api.submit,
  //       is_login: true,
  //       data: {
  //         form_id: form_id,
  //         order_message: this.data.order_message, //地址信息
  //         address_id: this.data.address_info.address_id, //地址id
  //         receiver_name: this.data.address_info.receiver_name, //收件人姓名
  //         receiver_phone: this.data.address_info.receiver_phone, //收件手机号
  //         receiver_city: this.data.address_info.city, //收件城市
  //         receiver_address_details: this.data.address_info.detail_address, //收件详细地址
  //         type: this.data.type, //选项
  //         goods_id: this.data.goods_id, //商品id
  //         goods_num: this.data.goods_num, //商品数量
  //       },
  //       success: function (res) {
  //         that.payOrder(res.result.hash, res.result.order_id);
  //       },
  //       fail: function (res) {

  //       }
  //     })
  //   } else if (type == 2) {
  //     MBC.Ajax({
  //       url: api.submit,
  //       is_login: true,
  //       data: {
  //         form_id: form_id,
  //         order_message: this.data.order_message, //地址信息
  //         address_id: this.data.address_info.address_id, //地址id
  //         receiver_name: this.data.address_info.receiver_name, //收件人姓名
  //         receiver_phone: this.data.address_info.receiver_phone, //收件手机号
  //         receiver_city: this.data.address_info.city, //收件城市
  //         receiver_address_details: this.data.address_info.detail_address, //收件详细地址
  //         type: this.data.type, //选项
  //         cart_ids: this.data.cart_ids, //购物车id
  //       },
  //       success: function (res) {
  //         that.payOrder(res.result.hash, res.result.order_id);
  //       },
  //       fail: function (res) {

  //       }
  //     })
  //   }

  // },
  //返回上一页
  onBack: function () {
    wx.navigateBack({
      delta: 1
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight);
        console.log(res.windowWidth);
        that.setData({
          deviceW: res.windowWidth,//当前屏幕宽度
          deviceH: res.windowHeight//当前屏幕高度
        })
      }
    }),
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    // var model = JSON.parse(options.spClickMap);
    // for(let i = 0; i< model.length; i++){
    //   console.log(model[i]);
    // }
    // console.log(options);
  
    var type = options.type;//用来判断是购物车下单还是详情页下单
    if (type == 1) {
      that.setData({
        goods_price: options.money,
        goods_count: options.GMSL,
        typeList: options.spClickMap,
        total_price: options.money * options.GMSL,
        itemId: options.itemId
      })
    }else if(type == 2){
      
    }
      // console.log(this.data.goods_info)
    //   // 立即购买
    //   //直接购买
    //   MBC.Ajax({
    //     url: api.confirm,
    //     is_login: true,
    //     data: {
    //       goods_id: that.data.goods_id,
    //       goods_num: that.data.goods_num,
    //       type: type
    //     },
    //     success: function (res) {
    //       console.log(res);
    //       that.setData({
    //         address_info: res.result.address_info, //地址信息
    //         goods_info: res.result.goods_info, //商品信息
    //         goods_count: res.result.goods_count, //商品件数
    //         goods_freight: res.result.goods_freight, //运费
    //         goods_price: res.result.goods_price, //商品价格
    //         total_price: res.result.total_price, //合计价格
    //       })

    //     },
    //     fail: function (res) {
    //       console.log(res);
    //       //获取信息失败
    //     }
    //   })

    // }
    //  else {
    //   that.setData({
    //     type: options.type,
    //     cart_ids: JSON.parse(options.cart_ids),
    //   })
    //   //   购物车
    //   MBC.Ajax({
    //     url: api.confirm,
    //     is_login: true,
    //     data: {
    //       cart_ids: that.data.cart_ids,
    //       type: type
    //     },
    //     success: function (res) {
    //       console.log(res);
    //       that.setData({
    //         address_info: res.result.address_info, //地址信息
    //         goods_info: res.result.goods_info, //商品信息
    //         goods_count: res.result.goods_count, //商品件数
    //         goods_freight: res.result.goods_freight, //运费
    //         goods_price: res.result.goods_price, //商品价格
    //         total_price: res.result.total_price, //合计价格
    //       })

    //     },
    //     fail: function (res) {
    //       console.log(res);
    //       //获取信息失败
    //     }
    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // /**
  //  * 生命周期函数--监听页面显示
  //  */
  onShow: function (options) {
    var that = this;
    //获取收货地址缓存数据
    wx.getStorage({
      key: 'addressId',
      success: function (res) {
        that.setData({
          address_info: res.data
        })
      }
    })
    //获取优惠金额缓存数据
    wx.getStorage({
      key: 'preferential',
      success: function (res) {
        that.setData({
          preferential_info: res.data
        })
      }
    })
  //   var that = this;
  //   var goods_id = that.data.goods_id;
  //   var goods_num = that.data.goods_num;
  //   var type = that.data.type;
  //   var cart_ids = that.data.cart_ids;
  //   console.log(that.data.address_id);
  //   // if (type == 1) {

  //   // } else if (type == 2) {

  //   // }
  //   if (that.data.address_id) {
  //     // 获取指定地址信息
  //     MBC.Ajax({
  //       url: api.getOne,
  //       is_login: true,
  //       data: {
  //         address_id: that.data.address_id
  //       },
  //       success: function (res) {
  //         that.setData({
  //           address_info: res.result.address_info
  //         })
  //       },
  //       fail: function (res) {

  //       }
  //     })
  //   }

  },

  // /**
  //  * 生命周期函数--监听页面隐藏
  //  */
  // onHide: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面卸载
  //  */
  // onUnload: function () {

  // },

  // /**
  //  * 页面相关事件处理函数--监听用户下拉动作
  //  */
  // onPullDownRefresh: function () {

  // },

  // /**
  //  * 页面上拉触底事件的处理函数
  //  */
  // onReachBottom: function () {

  // },

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {

  // }
  onReady() {
    wx.hideLoading()
  },
})
