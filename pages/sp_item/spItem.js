/**商品详情页 */
var app = getApp();
Page({
  data: {
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://m.360buyimg.com/n12/jfs/t11317/108/1080677336/325163/f4c2a03a/59fd8b17Nbe2fcca3.jpg!q70.jpg'
    }, {
      id: 1,
      type: 'image',
        url: 'https://m.360buyimg.com/n12/jfs/t11575/282/348533702/60173/d75cd1cc/59edb8d6N688b420f.jpg!q70.jpg',
    }, {
      id: 2,
      type: 'image',
        url: 'https://m.360buyimg.com/n12/jfs/t11536/279/360605865/15194/442cab0b/59edb8d3N163a7608.jpg!q70.jpg'
    }, {
      id: 3,
      type: 'image',
        url: 'https://m.360buyimg.com/n12/s750x750_jfs/t9733/126/2033941175/68120/a4eb4468/59edb8d6N37bea6f7.jpg!q70.jpg'
    }],
    CustomBar: app.globalData.CustomBar,
    card_view_height: 100,
    // bottom_view_height1和bottom_view_height2是初始化高度用到的
    bottom_view_height1: 50,
    bottom_view_height2: 100,
    //收藏默认为false
    change : 1,
    cartslength:[],
    // GMSL 购买数量，初始化为1
    GMSL: 1,
    // money 价格，初始化为0
    money: 0,
    // 商品类型和属性值list（js备份固定不变）
    spTypeObjList: [],
    // 商品类型和属性值list（显示用，点击会改变）
    spTypeObjListLet: [],
    //商品的名称货发货地
    goodsDetailList: [],
    // 商品点击选中的值
    spClickMap: {},
    spObjectList: [],
    spTypeList: [],
    itemId: 0,

    // 参数view打开还是关闭状态
    groupViewOpen: false,
    // 要显示的参数的list
    groupValList: [],

    // 提示选中什么或者要用户要选择什么
    tipsTitle: ""
  },
  /**
    * 生命周期函数--监听页面显示
    */
  onLoad: function (e) {;
    let itemId = e.itemId;
    let that = this;
    wx.request({
      url: app.ipAndPort + '/spCart/getCartDetail',
      method: 'POST',
      data: {

      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        let resData = res.data;
        let cartslength = resData.CartDetailList;
        that.setData({
          cartslength: cartslength,
          itemId: e.itemId
        })
      }
    }),
    //根据商品的id值获取商品信息
    wx.request({
      url: app.ipAndPort + '/spObject/getSpObject',
      method: 'POST',
      data: {
        itemId :itemId
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        let resData = res.data;
  //将商品详情赋值给goodsDetailList数组
        that.setData({
          goodsDetailList: resData.getGoodsDetail,
          money: resData.getGoodsDetail[0].minPrice
        })
        let spObjectList = resData.spObjectList;
        that.data.spObjectList = resData.spObjectList;
        let spObjectTypeList = resData.spObjectTypeList;
        let getSpObjectToStartList = resData.getSpObjectToStartList;
        let typeMap = resData.typeMap;

        let spTypeList = resData.spObjectTypeList;
        that.setData({
          spTypeList: spTypeList,
        })
        let spTypeObjList = [];
        for (let i = 0; i < getSpObjectToStartList.length; i++){
          let list = [];
          let obj = {};

          obj.objId = getSpObjectToStartList[i].id;
          obj.objName = getSpObjectToStartList[i].name;
          obj.typeId = getSpObjectToStartList[i].typeId;
          obj.typeName = typeMap[getSpObjectToStartList[i].typeId];
          list.push(obj);

          let letId = getSpObjectToStartList[i].id;
          for (let j = 0; j < spObjectList.length; j++) {
            if (letId == spObjectList[j].upperId) {
              let obj = {};
              obj.objId = spObjectList[j].id;
              obj.objName = spObjectList[j].name;
              obj.objMoney = spObjectList[j].money;
              obj.typeId = spObjectList[j].typeId;
              obj.typeName = typeMap[spObjectList[j].typeId];
              list.push(obj);

              letId = spObjectList[j].id;
            }
          }
          spTypeObjList.push(list);   
        }

        that.setData({
          spTypeObjList: spTypeObjList
        })
        
  
        let spTypeObjListLet = that.data.spTypeObjListLet;

        let typeObj = {};
       
        for (let i = 0; i < spTypeList.length; i++) {
          typeObj[spTypeList[i].id] = [];
        }
        for (let i = 0; i < spTypeObjList.length; i++) {
          let dataList = spTypeObjList[i];
          for (let j = 0; j < dataList.length; j++) {
            let valueList = typeObj[dataList[j].typeId];
            if (that.containsJs(dataList[j].objName, valueList, "name")) {

            } else {
              let map = {};
              map.name = dataList[j].objName;
              map.state = true;
              valueList.push(map);
              typeObj[dataList[j].typeId] = valueList;
            }
          }
        }
        
        for (let i = 0; i < spTypeList.length; i++) {
          let map = {};
          map["typeId"] = spTypeList[i].id;
          map["typeName"] = spTypeList[i].name;
          map["list"] = typeObj[spTypeList[i].id];
          spTypeObjListLet.push(map);
        } 
        that.setData({
          spTypeObjListLet: spTypeObjListLet
        });
        that.showTipsTitle();

      }
    });

  },

  // 判断值在list中是否存在的方法
  containsJs(value, list, key) {
    let isTF = false;
    if (key != null) {
      for (let i = 0; i < list.length; i++) {
        if (list[i][key] == value) {
          isTF = true;
        }
      }
    } else {
      for (let i = 0; i < list.length; i++) {
        if (list[i] == value) {
          isTF = true;
        }
      }
    }
    return isTF;
  },

  // 类型全部选中后页面显示已选什么，或者未选什么，提示用户选择
  showTipsTitle() {
    let spTypeList = this.data.spTypeList;
    let spClickMap = this.data.spClickMap;

    let list = [];
    let panDuan = true;
    for (let i = 0; i < spTypeList.length; i++) {
      if (spClickMap[spTypeList[i].id] == null) {
        panDuan = false;
        list.push(spTypeList[i].name);
      }
    }
    if (!panDuan) {
      let str = "";
      for (let i = 0; i < list.length; i++) {
        str += (list[i] + ",")
      }
      str = str.substr(0, str.length - 1);
      this.setData({
        tipsTitle: "请选择:" + str
      });
    } else {
      let str = "";
      for (let i in spClickMap) {
        str += (spClickMap[i] + ",")
      }
      str = str.substr(0, str.length - 1);
      this.setData({
        tipsTitle: "已选:" + str
      });
    }
    console.log(spClickMap);
  },

  // 类型选择点击事件
  objClick: function (e) {
   
    let objname = e.currentTarget.dataset.objname;
    let typeid = e.currentTarget.dataset.typeid;
    let state = e.currentTarget.dataset.state;
    let clickMap = this.data.spClickMap;
    let spTypeObjList = this.data.spTypeObjList;
    let spTypeObjListLet = this.data.spTypeObjListLet;

    if (!state) {
      return;
    }

    // 改变点击获取的类型参数
    if (clickMap[typeid] == objname) {
      delete clickMap[typeid];
    } else {
      clickMap[typeid] = objname;
    }
    this.setData({
      clickMap: clickMap
    });

    // 先全部弄成不能点击，可以点击的下面在处理
    for (let i = 0; i < spTypeObjListLet.length; i++) {
      let dataList = spTypeObjListLet[i].list;
      for (let j = 0; j < dataList.length; j++) {
        dataList[j].state = false;
      }
      spTypeObjListLet[i].list = dataList;
    }

    // 处理可以显示点击的选项
    for (let i = 0; i < spTypeObjList.length; i++) {
      let dataList = spTypeObjList[i];
      let pangDuan = true;
      for (let j = 0; j < dataList.length; j++) {
        if (clickMap[dataList[j].typeId] != null) {
          if (clickMap[dataList[j].typeId] != dataList[j].objName) {
            pangDuan = false;
          }
        }
      }
      if (pangDuan) {
        for (let j = 0; j < spTypeObjListLet.length; j++) {
          for (let z = 0; z < dataList.length; z++) {
            if (spTypeObjListLet[j].typeId == dataList[z].typeId) {
              let objList = spTypeObjListLet[j].list;
              for (let y = 0; y < objList.length; y++) {
                if (objList[y].name == dataList[z].objName) {
                  objList[y].state = true;
                }
              }
              spTypeObjListLet[j].list = objList;
              this.setData({
                spTypeObjListLet: spTypeObjListLet
              });
            }
          }
        }
      }
    }

    // 如果是只选中一类，那这一类其他都可以设置成可选中
    if (Object.keys(clickMap).length == 1) {
      for (let i = 0; i < spTypeObjListLet.length; i++) {
        if (clickMap[spTypeObjListLet[i].typeId] != null) {
          let dataList = spTypeObjListLet[i].list;
          for (let j = 0; j < dataList.length; j++) {
            dataList[j].state = true;
          }
          spTypeObjListLet[i].list = dataList;
          this.setData({
            spTypeObjListLet: spTypeObjListLet
          });
        }
      }
    }
    this.showMoney();
    // 刷新提示显示
    this.showTipsTitle();
  },

  // showModal和hideModal 是显示和隐藏的方法
  //选择弹框
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
  // 立即订购弹框
  showModal1(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal1(e) {
    this.setData({
      modalName: null
    })
  },
  // 参数弹框
  showGroupViewModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  GroupViewhideModal(e) {
    this.setData({
      modalName: null
    })
  },
  // 收藏
  collect() {
    change: 0;
    wx.showToast({
      title: '收藏成功',
      icon: 'success',
      duration: 2000
    })
  },
  // 购买数量加减
  GMSLMoveOrAdd(e) {
    let type = e.currentTarget.dataset.target;
    let num = this.data.GMSL;

    if (type == "add") {
      this.setData({
        GMSL: num + 1
      })
    } else {
      this.setData({
        GMSL: (num - 1) > 1 ? (num - 1) : 1
      })
    }
  },
  // 显示价格
  showMoney:function(){
    let spTypeList = this.data.spTypeList;
    let spTypeObjList = this.data.spTypeObjList;
    let spClickMap = this.data.spClickMap;
    for (let i = 0; i < spTypeList.length; i++) {
      if (spClickMap[spTypeList[i].id] == null) {
    }
    let selectedList = [];
    for (let i = 0; i < spTypeObjList.length; i++) {
      let dataList = spTypeObjList[i];
      let panDuan = true;
      for (let j = 0; j < dataList.length; j++) {
        for (let z in spClickMap) {
          if (dataList[j].typeId == z && dataList[j].objName != spClickMap[z]) {
            panDuan = false;
          }
        }
      }
      if (panDuan) {
        selectedList = spTypeObjList[i];
      }
    }
    if (selectedList != null) {
      this.setData({
        money: selectedList[3].objMoney
      })
    }
    }
  },
  //  参数点击显示隐藏方法
  showGroupViewClick: function (e) {
    console.log(e);
    let that = this;
    let groupViewOpen = !this.data.groupViewOpen;
  },
  //立即购买
  buy: function () {
    let spTypeList = this.data.spTypeList;
    let spTypeObjList = this.data.spTypeObjList;
    let spClickMap = this.data.spClickMap;

    for (let i = 0; i < spTypeList.length; i++) {
      if (spClickMap[spTypeList[i].id] == null) {
        wx.showToast({
          title: '请选择属性',
          icon: 'none',
          duration: 2000
        })
        return;
      }
    }
    let selectedList = [];

    for (let i = 0; i < spTypeObjList.length; i++) {
      let dataList = spTypeObjList[i];
      let panDuan = true;
      for (let j = 0; j < dataList.length; j++) {
        for (let z in spClickMap) {
          if (dataList[j].typeId == z && dataList[j].objName != spClickMap[z]) {
            panDuan = false;
          }
        }
      }
      if (panDuan) {
        selectedList = spTypeObjList[i]
      }
    }
    if (selectedList != null) {
      let url = '../order/order?GMSL=' + this.data.GMSL + '&itemId=' + this.data.itemId + '&money=' +this.data.money;
      wx.navigateTo({
        url: url,
      });
    }

  },
  //点击购物车
  cart:function(){
    let url = "../cart/cart";
    wx.navigateTo({
      url: url,
    });
  },
  // 加入购物车点击方法
  jrgwcClick: function () {
   
    let spTypeList = this.data.spTypeList;
    let spTypeObjList = this.data.spTypeObjList;
    let spClickMap = this.data.spClickMap;

    for (let i = 0; i < spTypeList.length; i++) {
      if (spClickMap[spTypeList[i].id] == null) {
        wx.showToast({
          title: '请选择属性',
          icon: 'none',
          duration: 2000
        })
        return;
      }
    }

    let selectedList = [];
    for (let i = 0; i < spTypeObjList.length; i++) {
      let dataList = spTypeObjList[i];
      let panDuan = true;
      for (let j = 0; j < dataList.length; j++) {
        for (let z in spClickMap) {
          if (dataList[j].typeId == z && dataList[j].objName != spClickMap[z]) {
            panDuan = false;
          }
        }
      }
      if (panDuan) {
        selectedList = spTypeObjList[i]
      }
    }

    if (selectedList != null) {
      // console.log('数量:' + this.data.GMSL);//购买数量
      // console.log(selectedList);//购买的规格
      // console.log('商品id:' + this.data.itemId);//商品id
      var number = this.data.GMSL;
      var itemId = this.data.itemId;
      wx.request({
        url: app.ipAndPort + '/spCart/insertCart',
        method: 'POST',
        data: {
          number: number,
          itemId: itemId,
          userId: 3,
          typeId: 2
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          let resData = res.data;
          if (resData.code == '1') {
            wx.showToast({
              title: '添加成功，在购物车等亲~',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  }
})