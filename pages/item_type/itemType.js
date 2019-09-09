const app = getApp();
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true
  },

  ready: function () {
    let list = [{}];
    let that = this;
    wx.request({
      url: app.ipAndPort+'/spItemType/getSpItemType',
      method: 'POST',
      data: {
        
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        let data = res.data;
        for (let i = 0; i < data.length; i++) {
          list[i] = {};
          list[i].name = data[i].name;
          list[i].listType2 = data[i].listType2;
          list[i].id = i;
        }
        that.setData({
          list: list,
          listCur: list[0]
        })
      }
    })
  },

  methods: {
    // 这里是一个自定义方法
    tabSelect:function(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        MainCur: e.currentTarget.dataset.id,
        VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
      })
    },
    VerticalMain: function (e) {
      let that = this;
      let list = this.data.list;
      let tabHeight = 0;
      if (this.data.load) {
        for (let i = 0; i < list.length; i++) {
          let view = this.createSelectorQuery().select("#main-" + list[i].id);
          view.fields({
            size: true
          }, data => {
            list[i].top = tabHeight;
            tabHeight = tabHeight + data.height;
            list[i].bottom = tabHeight;
          }).exec();
        }
        that.setData({
          load: false,
          list: list
        })
      }
      let scrollTop = e.detail.scrollTop + 20;
      for (let i = 0; i < list.length; i++) {
        if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
          that.setData({
            VerticalNavTop: (list[i].id - 1) * 50,
            TabCur: list[i].id
          })
          return false
        }
      }
    },

    // 页面点处理事件
    typeClick:function(e){
      let query = e.currentTarget.dataset['index'];
      wx.navigateTo({
        url: query,
      });
    }
  }
})