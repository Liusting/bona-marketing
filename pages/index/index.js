Page({
  data: {
    PageCur: 'MyMessage'
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur,
    });
  },
  // onLoad: function (options) {
  //   console.log(1111);
  //   this.setData({
  //     PageCur: options.name
  //   })
  // },
  onShareAppMessage() {
    return {
      title: 'ColorUI-高颜值的小程序UI组件库',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  },
})