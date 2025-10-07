const colors = require('../../styles/colors.js');

Page({
  data: {
    iconSize: [20, 30, 40, 50, 60],
    iconColor: [
      'red', 'yellow', 'blue', 'green'
    ],
    iconType: [
      'success',
      'info',
      'warn',
      'waiting',
      'clear',
      'success_no_circle',
      'download',
      'cancel',
      'search',
    ]
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  goThanks() {
    my.navigateTo({
      url: '/pages/thanks/thanks'  
    });
  },
  goToRecap(){
    my.navigateTo({
      url:"/pages/recap/recap"
    })
  },
  goToRating() {
    my.navigateTo({
      url:"/pages/rating/rating"
    })
  },
  goToEndTrip() {
    my.navigateTo({
      url:"/pages/endTrip/endTrip"
    })
  },
  goToInRide(){
    my.navigateTo({
      url:"/pages/inRide/inRide"
    })
  },
  waitTaxi(){


    my.navigateTo({

      url:"/pages/waiting/waiting"
    })
  },

  confirmTaxi() {
    console.log("Clicked")
    my.navigateTo({
      url: '/pages/confirmation/confirmation'
    });
  },

  goToHello() {

    my.navigateTo({

      url:"/pages/hello/hello"
    })
  },


  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});
