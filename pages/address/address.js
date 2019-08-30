var app = getApp();
var area = require('../../utils/area.js');
var areaInfo = []; //所有省市区县数据
var provinces = []; //省
var provinceNames = []; //省名称
var citys = []; //城市
var cityNames = []; //城市名称
var countys = []; //区县
var countyNames = []; //区县名称
var value = [0, 0, 0]; //数据位置下标
var addressList = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    provinceIndex: 0, //省份
    cityIndex: 0, //城市
    countyIndex: 0, //区县
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    area.getAreaInfo(function (arr) {
      areaInfo = arr;
      //获取省份数据
      that.getProvinceData();
    });
  },
  // 获取省份数据
  getProvinceData: function () {
    var that = this;
    var s;
    provinces = [];
    provinceNames = [];
    var num = 0;
    for (var i = 0; i < areaInfo.length; i++) {
      s = areaInfo[i];
      if (s.di == "00" && s.xian == "00") {
        provinces[num] = s;
        provinceNames[num] = s.name;
        num++;
      }
    }
    that.setData({
      provinceNames: provinceNames
    })

    that.getCityArr();
    that.getCountyInfo();
  },

  // 获取城市数据
  getCityArr: function (count = 0) {
    var c;
    citys = [];
    cityNames = [];
    var num = 0;
    for (var i = 0; i < areaInfo.length; i++) {
      c = areaInfo[i];
      if (c.xian == "00" && c.sheng == provinces[count].sheng && c.di != "00") {
        citys[num] = c;
        cityNames[num] = c.name;
        num++;
      }
    }
    if (citys.length == 0) {
      citys[0] = {
        name: ''
      };
      cityNames[0] = {
        name: ''
      };
    }
    var that = this;
    that.setData({
      citys: citys,
      cityNames: cityNames
    })
    that.getCountyInfo(count, 0);
  },

  // 获取区县数据
  getCountyInfo: function (column0 = 0, column1 = 0) {
    var c;
    countys = [];
    countyNames = [];
    var num = 0;
    for (var i = 0; i < areaInfo.length; i++) {
      c = areaInfo[i];
      if (c.xian != "00" && c.sheng == provinces[column0].sheng && c.di == citys[column1].di) {
        countys[num] = c;
        countyNames[num] = c.name;
        num++;
      }
    }
    if (countys.length == 0) {
      countys[0] = {
        name: ''
      };
      countyNames[0] = {
        name: ''
      };
    }
    var that = this;
    that.setData({
      countys: countys,
      countyNames: countyNames,
    })
  },

//选择省份
  bindProvinceNameChange: function (e) {
    var that = this;
    var val = e.detail.value
    that.getCityArr(val); //获取地级市数据
    that.getCountyInfo(val, 0); //获取区县数据
    value = [val, 0, 0];
    this.setData({
      provinceIndex: e.detail.value,
      cityIndex: 0,
      countyIndex: 0,
      value: value
    })

  },

//选择地级市
  bindCityNameChange: function (e) {
    var that = this;
    var val = e.detail.value
    that.getCountyInfo(value[0], val); //获取区县数据
    value = [value[0], val, 0];
    this.setData({
      cityIndex: e.detail.value,
      countyIndex: 0,
      value: value
    })
  },

//选择县级市
  bindCountyNameChange: function (e) {
    var that = this;
    this.setData({
      countyIndex: e.detail.value
    })
  },

//点击保存
  saveAddress: function (e) {
    var warn = "";
    var that = this;
    var flag = false;//控制弹窗关闭
    var addresseeName = e.detail.value.addresseeName; //收货人姓名
    var phoneNumber = e.detail.value.phoneNumber;//收货人电话号码
    var provinceName = e.detail.value.provinceName;//收货人省份
    var cityName = e.detail.value.cityName;//收货人城市
    var countyName = e.detail.value.countyName;//收货人县级市
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
        url: app.ipAndPort + '/spAddress/insertAddress',
        method: 'POST',
        data: {
          addresseeName: addresseeName,
          phoneNumber: phoneNumber,
          address: provinceName + cityName + countyName + addressdetail,
          userId:3
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          let resData = res.data;
          if(resData.code == '1'){
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