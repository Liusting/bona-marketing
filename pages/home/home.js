const formatTime = date => {

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')

}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  },
  data: {
    countDownHour: 0, //倒计时 -时
    countDownMinute: 0, //倒计时 -分
    countDownSecond: 0, //倒计时-秒
    clock: '',
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

  ready:function(){

    //设置倒计时时间，1s变换一次
    var interval = setInterval(function () {
      var d = new Date();  //获取系统日期和时间
      var nowHour = d.getHours(); //小时
      var nowMinutes = d.getMinutes(); //分
      var nowSeconds = d.getSeconds(); //秒

      // 显示在倒计时中的小时位
      var hour = 24 - nowHour;

      // 显示在倒计时中的分钟位
      var minutes = 60 - nowMinutes;

      // 显示在倒计时中的秒数
      var seconds = 60 - nowSeconds;


      //当小时、分钟、秒都为0时，活动结束，倒计时显示为00:00:00
      if (hour == 0 && minutes == 0 && seconds == 0) {

        clearInterval(interval);
        wx.showToast({
          title: '活动已结束',
        });
        console.log(totalSecond);

        this.setData({
          countDownHour: '00',
          countDownMinute: '00',
          countDownSecond: '00',
        });
      }


      //当小时位、分钟位、秒位小于10时，用字符串拼接的方式显示，例如：06:08:02

      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      this.setData({
        countDownHour: hour,
        countDownMinute: minutes,
        countDownSecond: seconds,
      });
    }.bind(this), 1000);
  },
onLoad:function(){
  
},
  methods: {
    // 这里是一个自定义方法
    customMethod: function () { },
    onLoad: function(){
      
    }
  }
})