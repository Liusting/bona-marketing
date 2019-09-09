/**商品列表 */
const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    orderList:[{
      name:'销量',
      index:0
    },{
      name:'价格升序',
      index:1
    },{
      name:'价格降序',
      index:2
    }],
    radioList:[{
      name: '全部',
      type: '0',
      checked: true
    },{
      name: '商品',
      type: '1',
      checked: false
    },{
      name: '店铺',
      type: '2',
      checked: false
    }],
    radioType: 0,
    radioName: '全部',
    // TabCur和scrollLeft是排序需要的数据
    TabCur: 0,
    scrollLeft: 0,
    //scroll_height 初始滚屏的高度
    scroll_height: 450, 
    //currentInt 懒加载,初始为第1页
    currentInt:1,
    //scrollIfSel 懒加载，是否继续去查询
    scrollIfSel: true,
    spList:[],//商品列表
    groupList:[],//商品筛选条件
    clickGroupObj:{},
    navshow: false,
    clearSearch: false,
    name: ''

  },
  //实时监听搜索框输入内容
  search:function(e){
    var value = e.detail.value;
    if (value === null || value === undefined || value.length === 0) {
      this.setData({
        clearSearch: true
      });
    } else {
      this.setData({
        clearSearch: false,
        name: e.detail.value
      });
    }
  },
  //清除搜索框
  clearTap: function () {
    this.setData({
      clearSearch: true,
      name: ''
    });
  },
  // 导航条组件基础事件
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.index,
      scrollLeft: (e.currentTarget.dataset.index - 1) * 60,
      currentInt: 1,
      spList: [],
      scrollIfSel: true
    });
    this.spGetList();
  },
  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
  //获取商品列表数据
  spGetList:function(){
    var that = this;
    wx.request({
      url: app.ipAndPort + '/spItem/getSpItem2',
      method: 'POST',
      data: {
        currentInt: that.data.currentInt,
        tabcur: that.data.TabCur,
        name: that.data.name
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        let data = res.data;
        if(data.length > 0){
          that.setData({
            spList: data
          });
        }else{
          that.setData({
          scrollIfSel: false,
          });
        }
      }
    })
  },

  onLoad: function (options) {
    var that = this;

    this.setData({
      name: options.name
    });
    this.spGetList();
    wx.getSystemInfo({ //微信自身api
      success: function (res) {
        that.setData({
          scroll_height: res.windowHeight  //此处是计算滚动屏的高度
        });
      }
    });
    // this.spGetList();
    wx.request({
      url: app.ipAndPort + '/spItemTypeSpecs/spItemTypeSpecs',
      method: 'POST',
      data: {

      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        let data = res.data;

        that.setData({
          groupList: data
        })
      }
    });

  },

  // 页面点处理事件
  // 功能直达弹窗显示和关闭事件
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


  
  // 搜索类型单选框点击事件处理
  radioClick:function(e){
    if (e.currentTarget.dataset.index.type == 2){
      this.setData({
        navshow: true
      })
    }else{
      this.setData({
        navshow: false
      })
    }
    let name = e.currentTarget.dataset['index'].name;
    let type = e.currentTarget.dataset['index'].type;
    let list = this.data.radioList;
    if (type != this.data.radioType){
      for (let i = 0; i < list.length; i++) {
        if (list.type == type) {
          list.checked = true;
        } else {
          list.checked = false;
        }
      }
      this.setData({
        radioType: type,
        radioName: name
      })
      this.hideModal();
    }
  },
//滚动的时候显示数据
  scrollBottomEvent:function(e){
    let that = this;
    if (this.data.scrollIfSel){
      wx.request({
        url: app.ipAndPort + '/spItem/getSpItem2',
        method: 'POST',
        data: {
          currentInt: (that.data.currentInt+1),
          tabcur: that.data.TabCur,
          name: this.data.name
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          let data = res.data;
          let list = that.data.spList;
          if(data.length>0){
            that.setData({
              currentInt: (that.data.currentInt + 1)
            })
            list.push.apply(list, data);
            that.setData({
              spList: list,
            })
          }else{
            that.setData({
              scrollIfSel: false,
            })
          }
        }
      })
    }
  },

  // 搜索输入框回车事件
  searchOnclick:function(e){
    console.log(e);
    var that = this;
    if (this.data.radioType == 2){
      wx.request({
        url: app.ipAndPort + '/spItem/getShopList',
        method: 'POST',
        data: {
          currentInt: this.data.currentInt,
          name: e.detail.value
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          console.log(JSON.stringify(res));
        }
      })
    }else{
      wx.request({
        url: app.ipAndPort + '/spItem/getSpItem2',
        method: 'POST',
        data: {
          currentInt: that.data.currentInt,
          tabcur: that.data.TabCur,
          name: e.detail.value
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          let data = res.data;
          if (data.length > 0) {
            that.setData({
              spList: data
            });
          } else {
            that.setData({
              scrollIfSel: false,
            });
          }
        }
      })
    }
  },

  // 右边规格滑窗内点击规格事件
  groupClick:function(e){
    let id = e.target.dataset['id'];
    let list = this.data.groupList;
    for (let i=0;i<list.length;i++){
      if(list[i].id == id){
        if(list[i].open){
          list[i].open = false;
        }else{
          list[i].open = true;
        }
        this.setData({
          groupList: list,
        })
      }
    }
  },

  // 商品列表点击跳到商品详情
  spClick:function(e){
    var that = this;
    var itemId = e.currentTarget.dataset.id;//获取商品的id值
    let url = "../sp_item/spItem";
    wx.navigateTo({
      url: '../sp_item/spItem?itemId=' + itemId
    });
  },

  // 商品规格选择点击事件
  groupObjClick:function(e){
    let id = e.currentTarget.dataset.id;
    let upperId = e.currentTarget.dataset.upperid;
    let clickGroupObj = this.data.clickGroupObj;
    if (clickGroupObj[upperId] != null && clickGroupObj[upperId] == id){
      delete clickGroupObj[upperId];
    }else{
      clickGroupObj[upperId] = id;
    }
    this.setData({
      clickGroupObj: clickGroupObj,
    })
  }
});
