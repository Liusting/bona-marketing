var app = getApp();
Component({
  data: {
    hfShow:'',//头部底部显示
    adminShow: false,//管理      
    shopcarData: [],//购物车商品列表     
    total: 0,//总金额      
    allsel: false,//全选      
    selarr: [],//选择的货物      
    hintText: '',//提示的内容      
    hintShow: false,//是否显示提示  
    cartNumber: '', //商品数量
    cartId :'',//购物车id
    itemId:'',//商品id
    pageBackgroundColor: 'gray',

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
        // console.log(resData.length);
        let resData = res.data.CartDetailList;
        if(resData.length == 0){
          that.setData({
            hfShow: true,
          })
        }else{
          that.setData({
            shopcarData: resData,
            hfShow: false
          })
        }

      }
    })
  },
  methods: {
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
          that.onLoad();
        }
      })
    }
  },
// 长按删除
  delete:function(e){
    console.log(e.currentTarget.dataset.id);
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
    var allsel = this.data.allsel,
      shopcar = this.data.shopcarData,
      selarr = this.data.selarr;
      
    if (allsel) {//点击全选的时候删除
      shopcar = this.data.shopcarData;
      for(var y = 0; y < shopcar.length; y++){
        that.del(shopcar[y].id);
      }
      this.setData({
        allsel: true,
        hfShow: true,
        total: 0
      });
    } else {//点击多选的时候的删除
      for (var i = 0, len = selarr.length; i < len; i++) {//将选中的商品从购物车移除      
        that.del(selarr[i].id);
        that.setData({
          total: 0,
          selarr: []
        })
      }
    }
  },
  //点击全选  
  allcheckTap: function () {
    let shopcar = this.data.shopcarData,
      selarr = this.data.selarr,
      allsel = !this.data.allsel,//点击全选后allsel变化
      total = 0;
    for (let i = 0, len = shopcar.length; i < len; i++) {
      shopcar[i].check = this.data.allsel;//所有商品的选中状态和allsel值一样
      if (allsel) {//如果为选中状态则计算商品的价格
        total += shopcar[i].money * shopcar[i].number;
        selarr.push(shopcar[i]);
      }
      else{
        selarr =[];  
      }
    }
    if(allsel){
      this.data.pageBackgroundColor = 'red';
      this.data.selarr = shopcar;
    }else{
      this.data.pageBackgroundColor = 'gray';
    }   
    this.setData({
      allsel: allsel,
      shopcarData: shopcar,
      total: total,
      pageBackgroundColor: this.data.pageBackgroundColor,
      selarr: selarr
    });
    },
  //点击编辑按钮，是否完成的选项  
 adminTap: function () {
    this.setData({
      adminShow: !this.data.adminShow
    });
  },
  //点击单个选择按钮  
  checkTap: function (e) {
    let Index = e.currentTarget.dataset.index,
      shopcar = this.data.shopcarData,
      total = this.data.total,
      selarr = this.data.selarr;
      shopcar[Index].check = !shopcar[Index].check;
    if (shopcar[Index].check) {
      // console.log('没有勾选'+shopcar[Index].check);
      total -= shopcar[Index].number * shopcar[Index].money;
      for (let i = 0, len = selarr.length; i < len; i++) {
        if (shopcar[Index].id == selarr[i].id) {
          selarr.splice(i, 1);
          break;
        }
      }

    } else {
      total += shopcar[Index].number * shopcar[Index].money;
      selarr.push(shopcar[Index]);
    }
    if(selarr.length == 0){
      this.data.pageBackgroundColor = 'gray';
    }else{
      this.data.pageBackgroundColor = 'red';
    }
    this.setData({
      shopcarData: shopcar,
      total: total,
      selarr: selarr, 
      pageBackgroundColor: this.data.pageBackgroundColor
    });
    this.judgmentAll();//每次按钮点击后都判断是否满足全选的条件  
  },
  //点击加减按钮  
  numchangeTap: function (e) {
    let that = this;
    let Index = e.currentTarget.dataset.index,//点击的商品下标值      
    shopcar = this.data.shopcarData,
    types = e.currentTarget.dataset.types,//是加号还是减号        
    total = this.data.total;//总计    
    switch (types) {
      case 'add':
        shopcar[Index].number++;//对应商品的数量+1      
        !shopcar[Index].check && (total += parseInt(shopcar[Index].money));//商品选中的，则合计价格+商品单价 
        break; 
      case 'minus':
        if(shopcar[Index].number<2){

        }else{
        shopcar[Index].number--;//对应商品的数量-1      
        !shopcar[Index].check && (total -= parseInt(shopcar[Index].money));//商品选中的，则合计价格-商品单价 
        break;
        }
    }  
    this.setData({
      shopcarData: shopcar,
      total: total,
      cartNumber: shopcar[Index].number,
      cartId: e.currentTarget.dataset.id
    });
    wx.request({
      url: app.ipAndPort + '/spCart/updateCartNumber',
      method: 'POST',
      data: {
        cartId: this.data.cartId,
        cartNumber: this.data.cartNumber
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
      }
    })
  },

  //判断是否为全选  
  judgmentAll: function () {
    let shopcar = this.data.shopcarData,
      shoplen = shopcar.length,
      lenIndex = 0;//选中的物品的个数    
    for (let i = 0; i < shoplen; i++) {//计算购物车选中的商品的个数    
      !shopcar[i].check && lenIndex++;
    }
    this.setData({
      allsel: lenIndex == shoplen//如果购物车选中的个数和购物车里货物的总数相同，则为全选，反之为未全选    
    });
  },
  //点击结算
  goclearingTap:function(e){
    console.log(this.data.selarr);
    // 先开始判断，如果为空的话提示
    // console.log(this.data.selarr.length)
    if (this.data.selarr.length == 0){
      wx.showToast({
        title: '请选择商品',
        icon: 'none',
        duration: 2000
      })
      return;
    }else{
      var model = JSON.stringify(this.data.selarr);
      wx.navigateTo({
        
        url: '../order/order?model=' + model
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
