const app = getApp();
Page({
  data: {
    shopName:'',
    currentInt:'',
    shopData: [],
    orderList: [{
      name: '综合',
      index: 0
    }, {
      name: '销量',
      index: 1
    }, {
      name: '价格',
      index: 2
    }],
    TabCur: 0,
    scrollLeft: 0
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.index,
      scrollLeft: (e.currentTarget.dataset.index - 1) * 60
    })
  },
  //点击商品跳转到详情页
  spClik: function(e){
    console.log(e.currentTarget.dataset.id);
    var itemId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../sp_item/spItem?itemId=' + itemId
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
  onLoad:function(options){
    let that = this;
    wx.request({
      url: app.ipAndPort + '/spItem/shopItemList',
      method: 'POST',
      data:{
        currentInt: (this.data.currentInt + 1),
        shopId: options.shopId
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function(res){
        let data = res.data;
        // console.log(data);
        that.setData({
          shopData: data
        })
      }

    })
    this.setData({
      shopName: options.shopName
    })
  },
  gridchange: function (e) {
    this.setData({
      gridCol: e.detail.value
    });
  },
  gridswitch: function (e) {
    this.setData({
      gridBorder: e.detail.value
    });
  },
  menuBorder: function (e) {
    this.setData({
      menuBorder: e.detail.value
    });
  },
  menuArrow: function (e) {
    this.setData({
      menuArrow: e.detail.value
    });
  },
  menuCard: function (e) {
    this.setData({
      menuCard: e.detail.value
    });
  },
  switchSex: function (e) {
    this.setData({
      skin: e.detail.value
    });
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
})