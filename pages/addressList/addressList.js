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
    addressList: [],
    type:''
  },
  // 获取微信用户收货地址
  // 修改地址
  editAddress:function(e){
    // console.log(e);
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    let phone = e.currentTarget.dataset.phone;
    let provinceName = e.currentTarget.dataset.provincename;
    let cityName = e.currentTarget.dataset.cityname;
    let countyName = e.currentTarget.dataset.countyname;
    let addressdetail = e.currentTarget.dataset.addressdetail;
    // console.log(e.currentTarget.dataset.id);
    // let addlist = JSON.stringify(e.currentTarget.dataset);
    wx.navigateTo({
      url: '../address/editAddress?id=' + id + '&provinceName=' + provinceName + '&cityName=' + cityName + '&countyName=' + countyName + '&addressdetail=' + addressdetail + '&name=' + name + '&phone=' + phone,
    })
  },
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
                  provinceName: provinceName,
                  cityName: cityName,
                  countyName: countyName,
                  addressdetail: addressdetail,
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
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,//当前屏幕宽度
          deviceH: res.windowHeight//当前屏幕高度
        })
      }
    });
    this.setData({
      type: options.type
    })
    wx.request({
      url: app.ipAndPort + '/spAddress/getAddressList',
      method: 'POST',
      data: {
        userId: 3
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        let resData = res.data;
        console.log(resData);
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
    var that = this;
    wx.request({
      url: app.ipAndPort + '/spAddress/getAddressList',
      method: 'POST',
      data: {
        userId: 3
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
// 点击新增收货地址
  addAddress: function () {
    // debugger;
    wx.navigateTo({ url: '../address/address' });
  },
  //点击地址
  addClick: function(e){
    // console.log(e);
    //根据传入的类型来判断点击地址出现什么效果 2：从订单页进来  3：从地址管理进来
    if(this.data.type == 2){
      var address = e.currentTarget.dataset;
      wx.setStorage({
        key: 'addressId',
        data: address,
        success: function (res) {
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }else{

    }
  }
})