var app = getApp()
var rawlist = wx.getStorageSync('cashflow') || []
var wxCharts = require('../../utils/wxcharts.js')
var typearray = app.globalData.typearray
var pieChart = null
Page({
  data: {
    mainindex: '',
    tabIndex: 0,
    typearray: app.globalData.typearray,
    title: '',
    sum: 0,
    sublist: [], 
    points: [],
    series: [],
    polyline: [],
    markers: []
  },
  onLoad: function (params) {
    // 生命周期函数--监听页面加载
    this.setData({
      mainindex: params.index,
      title: rawlist[params.index].title,
    })
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  },
  changeTab: function (e) {
    var id = e.currentTarget.id;
    var that = this;
    if (id == 'mybills') {
      this.setData({
        tabIndex: 0
      })
    }
    if (id == 'statistics') {
      this.setData({
        tabIndex: 1
      })
    }
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    rawlist = wx.getStorageSync('cashflow') || []
    var sublist = rawlist[this.data.mainindex].items
    var sum = 0
    var points = []
    var series = []
    var tempseries = []
    for (var i = 0; i < typearray.length; i++) {
      tempseries.push(0)
    }
    for (var i = 0; i < sublist.length; i++) {
      sum += parseFloat(sublist[i].account)
      tempseries[sublist[i].typeindex] += parseFloat(sublist[i].account)
    }
    for (var i = 0; i < tempseries.length; i++) {
      if (tempseries[i] != 0) {
        series.push({
          name: typearray[i],
          data: tempseries[i],
          id: i
        })
      }
    }
    this.setData({
      sum: sum.toFixed(2),
      sublist: sublist,
      series: series,
      points: points,
      polyline: [{
        points: points,
        color: "#5c95e6FF",
        width: 8,
        dottedLine: false
      }],
      markers: points
    })
    if (series.length == 0) {
      series.push({
        name: '无',
        data: 1
      })
    }
    var windowWidth = 320
    try {
      var res = wx.getSystemInfoSync()
      windowWidth = res.windowWidth
    } catch (e) {
      console.error('getSystemInfoSync failed!')
    }
    pieChart = new wxCharts({
      animation: true,
      canvasId: 'pieCanvas',
      type: 'pie',
      series: series,
      width: windowWidth * 0.96,
      height: 300,
      dataLabel: true,
    })
  },
  touchHandler: function (e) {
    var index = pieChart.getCurrentDataIndex(e)
    var mainindex = this.data.mainindex
    var typeindex = this.data.series[index].id
    wx.navigateTo({
      url: '../sublist/sublist?mainindex=' + mainindex + '&typeindex=' + typeindex,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: '小账本', // 分享标题
      desc: '您的私人账本', // 分享描述
      path: '/pages/index/index' // 分享路径
    }
  },
  addbill: function(){
      wx.navigateTo({
        tempindex :this.data.mainindex,
        url: '../../pages/edit/edit?mainindex='+this.data.mainindex,
      })
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.sublist.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      sublist: this.data.sublist
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY })
    that.data.sublist.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      sublist: that.data.sublist
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI)
  },
  //删除事件
  del: function (e) {
    var index = e.currentTarget.dataset.index
    this.data.sublist.splice(index, 0)
    this.setData({
      sublist: this.data.sublist
    })
    rawlist[this.data.mainindex].items.splice(index, 1)
    wx.setStorageSync('cashflow', rawlist)
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
    this.onShow()
  }
})