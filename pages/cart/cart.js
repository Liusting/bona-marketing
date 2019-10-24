var app = getApp();
Component({
  data: {
    hfShow:'',//头部底部显示
    adminShow: false,//管理      
    total: 0,//总金额   
    shopsel:false,   
    allsel: false,//全选 
    selarr: [],//选择的货物      
    hintText: '',//提示的内容      
    hintShow: false,//是否显示提示  
    cartNumber: '', //商品数量
    cartId :'',//购物车id
    itemId:'',//商品id
    itemNumber:0,
    pageBackgroundColor: 'gray',
    shopcarData: [],//购物车商品列表  
    changeNumber:'' 
  },
  // tab切换的时候马上响应数据
  ready: function () {
    var that = this;
    wx.request({
      url: app.ipAndPort + '/spCart/getCartDetail',
      method: 'POST',
      data: {

      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        if (res.data.length == 0){
          that.setData({
            hfShow: true,
          })
        }else{
          that.setData({
            shopcarData: res.data,
            hfShow: false
          })
        }

      }
    })
  },
  methods: {
    //点击店铺
  shopcheck(e){
    let index = e.currentTarget.dataset.index;//获取当前店铺的id
    let shopcarDataLet = this.data.shopcarData;
    let shopsel = !this.data.shopsel;
    for (let i = 0; i < shopcarDataLet.length; i++) {
      if (shopcarDataLet[i].shopId == index) {
        shopcarDataLet[i].check = !shopcarDataLet[i].check;
        let itemdataList = shopcarDataLet[i].itemdata;
        for (let j = 0; j < itemdataList.length; j++) {
            itemdataList[j].check = shopcarDataLet[i].check;
        }
      }
    }
    this.setData({
      shopcarData: shopcarDataLet,
      shopsel: shopsel
    })
    this.judgmentAll();//每次按钮点击后都判断是否满足全选的条件  
    this.countTotal();
    this.countSelect();
  },
    //判断是否为全选  
    judgmentAll: function () {
      let shopcarDataLet = this.data.shopcarData,
        shoplen = shopcarDataLet.length,
        lenIndex = 0;
      for (let i = 0; i < shoplen; i++) {  
        shopcarDataLet[i].check && lenIndex++;
        let itemdataList = shopcarDataLet[i].itemdata;
        for(let j = 0;j < itemdataList.length;j++){
          
        }
      }
      this.setData({
        allsel: lenIndex == shoplen   
      });
    },
    //计算金额
    countTotal:function(){
      this.data.pageBackgroundColor = "gray"
      let shopcarDataLet = this.data.shopcarData;
      let total = 0;
      for(let i = 0; i < shopcarDataLet.length; i++){
          let itemdataList = shopcarDataLet[i].itemdata;
          for(let j = 0; j < itemdataList.length; j++){
            if(itemdataList[j].check){
              total += itemdataList[j].money * itemdataList[j].number;
              this.data.pageBackgroundColor = "red";
            }
          }
      }
      this.setData({
        total: total,
        pageBackgroundColor: this.data.pageBackgroundColor,
      });
    },
    //点击进店跳到店铺首页
  gotoShop: function (e) {
      var shopId = e.currentTarget.dataset.id
      var shopname = e.currentTarget.dataset.shopname
      wx.navigateTo({
        url: '../shop/shop?shopId=' + shopId + '&shopName=' + shopname
      })
    },
    // 自定义页面刷新
    refresh:function(){
      var that = this;
      wx.request({
        url: app.ipAndPort + '/spCart/getCartDetail',
        method: 'POST',
        data: {

        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          if (res.data.length == 0) {
            that.setData({
              hfShow: true,
            })
          } else {
            that.setData({
              shopcarData: res.data,
              hfShow: false
            })
          }

        }
      })
    },
  //自定义删除方法
  del:function(e){
    var that = this;
    if(e == null){

    }else{
      wx.request({
        url: app.ipAndPort + '/spCart/deleteCart',
        method: 'POST',
        data: {
          itemId: e
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          that.refresh();
        }
      })
    }
  },
// 长按删除
  delete:function(e){
    let that = this;
    wx.showModal({
      title: '温馨提示',
      content: '确定把该商品移除购物车吗？',
      success: function (res) {
        if (res.confirm) {
          that.del(e.currentTarget.dataset.id);
        } else if (res.cancel) {
          return false;
        }
      }
    })
  },
  //点击删除 
  deleteshopTap: function () {
    var that = this;
    let shopcarDataLet = this.data.shopcarData,
    allsel = this.data.allsel;
    for(let i = 0;i < shopcarDataLet.length; i++){
      let itemdataList = shopcarDataLet[i].itemdata;
      for(let j = 0;j < itemdataList.length; j++){
        if(itemdataList[j].check){
          that.del(itemdataList[j].id);
        }
      }
    }
  },
  //点击全选  
  allcheckTap: function () {
    let shopcarDataLet = this.data.shopcarData,
      allsel = !this.data.allsel;//点击全选后allsel变化
    for (let i = 0, len = shopcarDataLet.length; i < len; i++) {
      shopcarDataLet[i].check = !this.data.allsel;//所有商品的选中状态和allsel值一样
      let itemdataList = shopcarDataLet[i].itemdata;
      for (let j = 0; j < itemdataList.length; j++) {
        if (allsel) {
          itemdataList[j].check = shopcarDataLet[i].check;
        }
        else {
          itemdataList[j].check = false;
          // total = 0
        }
      }
    }
    if(allsel){
      this.data.pageBackgroundColor = 'red';
    }else{
      this.data.pageBackgroundColor = 'gray';
    }   
    this.setData({
      allsel: allsel,
      shopcarData: shopcarDataLet,
      pageBackgroundColor: this.data.pageBackgroundColor,
    });
    this.countTotal();
    this.countSelect();
    },
  //点击编辑按钮，是否完成的选项  
 adminTap: function () {
    this.setData({
      adminShow: !this.data.adminShow
    });
  },
    showModal(e) {
      console.log(e.currentTarget.dataset);
      this.setData({
        modalName: e.currentTarget.dataset.target,
        cartNumber: e.currentTarget.dataset.number,
        cartId: e.currentTarget.dataset.id
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    formSubmit: function (e) {
      this.setData({
        cartNumber: e.detail.value.cartNumber
      })
      this.updateNumber();
      // this.refresh();
    },

//更改购物车数量
updateNumber:function(e){
  wx.request({
    url: app.ipAndPort + '/spCart/updateCartNumber',
    method: 'POST',
    data: {
      cartId: this.data.cartId,//购物车id
      cartNumber: this.data.cartNumber
    },
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (res) {
    }
  })
},
    //点击单个选择按钮  
  checkTap: function (e) {
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let shopcarDataLet = this.data.shopcarData;
    let selarr = [];
    let allsel = this.data.allsel;
    for (let i = 0; i < shopcarDataLet.length; i++) {
      if (shopcarDataLet[i].shopId == index) {
        let letBool = true;
        let allsel = false;
        let itemdataList = shopcarDataLet[i].itemdata;
        for (let j = 0; j < itemdataList.length; j++) {
          if (itemdataList[j].id == id) {
            selarr.push(itemdataList[j].id);
            itemdataList[j].check = !itemdataList[j].check;
          }
          if (!itemdataList[j].check) {
            letBool = false;
            this.data.pageBackgroundColor = "gray";
          }else{
            this.data.pageBackgroundColor = "red";
          }
        }
        shopcarDataLet[i].check = letBool;
      }
    }
    this.setData({
      selarr: selarr,
      cartId: id,
      shopcarData: shopcarDataLet,
      allsel: allsel,
      pageBackgroundColor: this.data.pageBackgroundColor
    });
    this.judgmentAll();//每次按钮点击后都判断是否满足全选的条件  
    this.countTotal();//每次按钮点击后都计算总价格
    this.countSelect();
  },
  //点击加减按钮  
  numchangeTap: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id,//商品id
      cartNumber = this.data.cartNumber,
    index = e.currentTarget.dataset.index,//店铺id
    shopcarDataLet = this.data.shopcarData,
    shopcar = this.data.shopcarData,
    types = e.currentTarget.dataset.types;//是加号还是减号        
    switch (types) {
      case 'add':
        for (let i = 0; i < shopcarDataLet.length; i++) {
          if (shopcarDataLet[i].shopId == index) {
            let itemdataList = shopcarDataLet[i].itemdata;
            for (let j = 0; j < itemdataList.length; j++) {
              if (itemdataList[j].id == id) {
                itemdataList[j].number++;
                cartNumber = itemdataList[j].number;
                this.countTotal();
              } 
            }
          }
        }
        break; 
        
      case 'minus':
        for (let i = 0; i < shopcarDataLet.length; i++) {
          if (shopcarDataLet[i].shopId == index) {
            let itemdataList = shopcarDataLet[i].itemdata;
            for (let j = 0; j < itemdataList.length; j++) {
              if (itemdataList[j].id == id) {
                if (itemdataList[j].number < 2){

                }else{
                  itemdataList[j].number--;
                  cartNumber = itemdataList[j].number;
                  this.countTotal();
                }
              }
            }
          }
        }
        break; 
    }  
    this.setData({
      shopcarData: shopcar,
      cartNumber: cartNumber,
      cartId: e.currentTarget.dataset.id,//购物车id
      shopId: e.currentTarget.dataset.index,//店铺id
    });
    this.updateNumber();
  },
  //判断选择的
  countSelect:function(e){
    let selarr = [];
    let shopcarDataLet = this.data.shopcarData;
    for (let i = 0; i < shopcarDataLet.length; i++) {
      let itemdataList = shopcarDataLet[i].itemdata;
      for (let j = 0; j < itemdataList.length; j++) {
        if (itemdataList[j].check) {
          selarr.push(itemdataList[j].id);
        }
      }
    }
    this.setData({
      selarr: selarr,
      itemNumber:selarr.length
    })
  },

  //点击结算
  goclearingTap:function(e){
    // 先开始判断，如果为空的话提示
    // console.log(this.data.selarr)
    if (this.data.selarr.length == 0){
      wx.showToast({
        title: '请选择商品',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    else{
      var model = JSON.stringify(this.data.selarr);
    // console.log(model);
      wx.navigateTo({
        url: '../order/order?model=' + model +'&type='+2
      })
    }
  },
  //点击去逛逛
  goshop:function(){
    wx.reLaunch({
      url: '../home/home'
    })
  },
  onLoad:function(){
    var that = this;
    wx.request({
      url: app.ipAndPort + '/spCart/getCartDetail',
      method: 'POST',
      data: {

      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        let resData = res.data;
        that.setData({
          shopcarData: resData.CartDetailList,
        })
      }
    })
  }
  }

})
