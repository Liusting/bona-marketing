var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],
  },
  // 获取微信用户收货地址
  getWeixinAddress:function(e){
    let that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.address']) {
          wx.chooseAddress({
            success(res) {
              var addresseeName = res.userName;
              var phoneNumber = res.telNumber;
              var provinceName = res.provinceName;//收货人省份
              var cityName = res.cityName;//收货人城市
              var countyName = res.countyName;//收货人县级市
              var addressdetail = res.detailInfo;//收货人具体地址
              wx.request({
                url: app.ipAndPort + '/spAddress/insertAddress',
                method: 'POST',
                data: {
                  addresseeName: addresseeName,
                  phoneNumber: phoneNumber,
                  address: provinceName + cityName + countyName + addressdetail,
                  userId: 3
                },
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                success: function (res) {
                  let resData = res.data;
                  if (resData.code == '1') {
                    that.onLoad();
                  }
                }
              })
            }
          })
        } else {
          if (res.authSetting['scope.address'] == false) {
            wx.openSetting({
              success(res) {
              }
            })
          } else {
            wx.chooseAddress({
              success(res) {
                console.log(res.userName)
                console.log(res.provinceName)
                console.log(res.cityName)
                console.log(res.countyName)
                console.log(res.detailInfo)
                console.log(res.telNumber)
              }
            })
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.ipAndPort + '/spAddress/getAddressList',
      method: 'POST',
      data: {
        userId: 2
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        let resData = res.data;
        that.setData({
          addressList: resData
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
  },
// 点击新增收货地址
  addAddress: function () {
    wx.navigateTo({ url: '../address/address' });
  },
  //点击地址
  addClick: function(e){
    var address = e.currentTarget.dataset;
    wx.setStorage({
      key: 'addressId',
      data: address,
      success: function(res){
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
//  删除地址
  delAddress: function (e) {
    var that = this;
    wx.request({
      url: app.ipAndPort + '/spAddress/deleteAddress',
      method: 'POST',
      data: {
        id: e.currentTarget.dataset.id
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        that.onLoad();
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000,
        })
      }    
    })

  }
})