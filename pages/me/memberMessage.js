const app = getApp();
Page({
  data: {
    ColorList: app.globalData.ColorList,
    color: 'red',
    iconList: [{
      icon: 'cardboardfill',
      color: 'red',
      badge: 120,
      name: '家居百货'
    }, {
      icon: 'clothesfill',
      color: 'orange',
      badge: 1,
      name: '服饰鞋包'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '美妆个护'
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 22,
      name: '食品酒饮'
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: '母婴玩具'
    }, {
      icon: 'camerafill',
      color: 'blue',
      badge: 0,
      name: '数码家电'
    }, {
      icon: 'presentfill',
      color: 'purple',
      badge: 0,
      name: '新人好礼'
    }, {
      icon: 'more',
      color: 'mauve',
      badge: 0,
      name: '全部'
    }]
  },
  onLoad() {
    let that = this;
    setTimeout(function () {
      that.setData({
        loading: true
      })
    }, 500)
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
  SetColor(e) {
    this.setData({
      color: e.currentTarget.dataset.color,
      modalName: null
    })
  },
  SetActive(e) {
    this.setData({
      active: e.detail.value
    })
  }
})