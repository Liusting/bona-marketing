const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address_info: {}, //地址信息
    preferential_info: {},//商品优惠信息
    goods_info: [], //商品信息
    goods_count: '', //商品件数
    goods_freight: '', //运费
    goods_price: '', //商品价格
    total_price: '', //合计价格
    item: {
      iconfontBack: "icon-arrowleft",
      navigationBarTitle: "确认订单",
      statusBarHeight: app.globalData.statusBarHeight
    },
    statusBarHeight: app.globalData.statusBarHeight,
    goods_id: '', //商品id
    goods_num: '', //商品数量
    type: '', //选项
    order_message: '', //订单留言
    cart_ids: [], // 购物车商品id
    addressId: '',
    show:true
  },
  //选择地址
  bindaddress: function () {
    // console.log(this.data.type)
      wx.navigateTo({
        url: '../addressList/addressList?type=' + this.data.type
      })
  },
  // 留言
  bindwaitMsg: function (event) {
    console.log(event.detail.value);
    this.setData({
      order_message: event.detail.value, // 订单留言
    })
  },
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
    var model = JSON.parse(options.model);
    // console.log(this.data.preferential_info)
    // this.setData({
    //   goods_count: options.GMSL,
    //   goods_price: options.money

    // })
    // // total_price = goods_count * goods_price;
    // // console.log(goods_count * goods_price);
    // console.log(model)
    var that = this;
    var type = options.type;//用来判断是购物车下单还是详情页下单


    // if (type == 1) {
      that.setData({
    //     goods_id: options.itemId,//商品id
    //     goods_num: options.GMSL,//商品数量
        type: options.type,
        goods_info: model
      })
      console.log(this.data.goods_info)
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

  // /**
  //  * 生命周期函数--监听页面初次渲染完成
  //  */
  // onReady: function () {

  // },

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
})
