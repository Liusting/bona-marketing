var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: [],
    provinceName: '',//省份
    cityName: '',//市
    countyName: '',//区
    addressdetail:'',
    addresseeName:'',
    phoneNumber:'',
    id:'',
    deviceW: '',//屏幕宽度
    deviceH: '', //屏幕高度
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,

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
    let region =  [];
    region.push(options.provinceName);
    region.push(options.cityName);
    region.push(options.countyName);
  
    this.setData({
      provinceName: options.provinceName,
      cityName: options.cityName,
      countyName: options.countyName,
      addresseeName: options.name,
      phoneNumber: options.phone,
      addressdetail: options.addressdetail,
      region: region,
      id:options.id
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value,
      provinceName: e.detail.value[0],//省份
      cityName: e.detail.value[1],//市
      countyName: e.detail.value[2],//区
    })
  },
  //  删除地址
  delAddress: function (e) {
    var that = this;
    wx.request({
      url: app.ipAndPort + '/spAddress/deleteAddress',
      method: 'POST',
      data: {
        id: this.data.id
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        wx.navigateBack({
          delta: 1
        })
      }
    })

  },
  //点击保存
  saveAddress: function (e) {
    var warn = "";
    var that = this;
    var flag = false;//控制弹窗关闭
    var addresseeName = e.detail.value.addresseeName; //收货人姓名
    var phoneNumber = e.detail.value.phoneNumber;//收货人电话号码
    var provinceName = this.data.provinceName;//收货人省份
    var cityName = this.data.cityName;//收货人城市
    var countyName = this.data.countyName;//收货人县级市
    var addressdetail = e.detail.value.addressdetail;//收货人具体地址

    // 校验
    if (e.detail.value.addresseeName == "") {
      warn = "请填写您的姓名！";
    } else if (e.detail.value.phoneNumber == "") {
      warn = "请填写您的手机号！";
    } else if (!(/^1(3|4|5|7|8|9)\d{9}$/.test(e.detail.value.phoneNumber))) {
      warn = "手机号格式不正确";
    } else if (e.detail.value.addressdetail == "") {
      warn = "请输入您的具体地址";
    } else {
      flag = true;
      wx.request({
        url: app.ipAndPort + '/spAddress/updateAddress',
        method: 'POST',
        data: {
          id:this.data.id,
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
            wx.navigateBack({

            })
          }
        }
      })
    }
    if (flag == false) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    }
  }
})