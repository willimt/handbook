var app = getApp()
var rawlist = wx.getStorageSync('cashflow') || []
var wxCharts = require('../../utils/wxcharts.js')
var typearray = app.globalData.typearray
var incomearray=app.globalData.incomearray
var pieChart = null
var pieChart2 = null
Page({
  data: {
    dontRander : true,
    choose:false,
    toggle: false,
    actions2: [
      {
        name: '删除',
        color: '#ed3f14'
      }
    ],
    mainindex: '',
    tabIndex: 0,
    typearray: app.globalData.typearray,
    incomearray:app.globalData.incomearray,
    title: '',
    sum: 0,
    sum2:0,
    sublist: [],
    incomelist:[], 
    points: [],
    points2:[],
    series: [],
    series2:[],
    polyline: [],
    polyline2: [],
    markers: [],
    markers2: [],
    animationData: {},
    animationData2: {},
    indexarray:[1,2,3]
  },
  onLoad: function (params) {
    // 生命周期函数--监听页面加载
    rawlist = wx.getStorageSync('cashflow') || []
    this.setData({
      mainindex: params.index,
      title: rawlist[params.index].title,
    })
    console.log(params.index)
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  },
  
  
  changeTab: function (e) {
    var id = e.currentTarget.id;
    var that = this;
    if (id == 'statistics') {
      this.setData({
        tabIndex: 2
      })
    }
  },
  change1:function(e){
    this.setData({
      tabIndex: 0,
      dontRander:false
    })
  },
  change2: function (e) {
    this.setData({
      tabIndex: 1,
      dontRander: true
    })
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    rawlist = wx.getStorageSync('cashflow') || []
    console.log(rawlist)
    var sublist=[]
    var incomelist =[]
    for (var i = 0; i < rawlist[this.data.mainindex].items[0].items.length;i++){
      sublist.push(rawlist[this.data.mainindex].items[0].items[i])
      }
    for (var i = 0; i < rawlist[this.data.mainindex].items[1].items.length; i++){
      incomelist.push(rawlist[this.data.mainindex].items[1].items[i])
    }
    var sum = 0
    var sum2= 0
    var points = []
    var points2 = []
    var series = []
    var series2=[]
    var tempseries = []
    var incomeseries=[]
    for (var i = 0; i < typearray.length; i++) {
      tempseries.push(0)
    }
    for (var i = 0; i < incomearray.length; i++) {
      incomeseries.push(0)
    }
    for (var i = 0; i < sublist.length; i++) {
      sum += parseFloat(sublist[i].account)
      tempseries[sublist[i].typeindex] += parseFloat(sublist[i].account)
    }
    for (var i = 0; i < incomelist.length; i++) {
      sum2 += parseFloat(incomelist[i].account)
      incomeseries[incomelist[i].incomeindex] += parseFloat(incomelist[i].account)
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
    for (var i = 0; i < incomeseries.length; i++) {
      if (incomeseries[i] != 0) {
        series2.push({
          name: incomearray[i],
          data: incomeseries[i],
          id: i
        })
      }
    }
    this.setData({
      sum: sum.toFixed(2),
      sum2:sum2.toFixed(2),
      sublist: sublist,
      incomelist:incomelist,
      series: series,
      series2:series2,
      points: points,
      points2:points2,
      polyline: [{
        points: points,
        color: "#5c95e6FF",
        width: 8,
        dottedLine: false
      }],
      polyline2: [{
        points2: points2,
        color: "#5c95e6FF",
        width: 8,
        dottedLine: false
      }],
      markers: points,
      markers2: points2
    })
    if (series.length == 0) {
      series.push({
        name: '无',
        data: 1
      })
    }
    if (series2.length == 0) {
      series2.push({
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
    pieChart2 = new wxCharts({
      animation: true,
      canvasId: 'pieCanvas2',
      type: 'pie',
      series: series2,
      width: windowWidth * 0.96,
      height: 300,
      dataLabel: true,
    })
  },
  touchHandler: function (e) {
    var index = pieChart.getCurrentDataIndex(e)
    if (index>=0) {
    var mainindex = this.data.mainindex
    var typeindex = this.data.series[index].id
    wx.navigateTo({
      url: '../particular/particular?mainindex=' + mainindex + '&typeindex=' + typeindex ,
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
    }
  },
  touchHandler2: function (e) {
    var index = pieChart2.getCurrentDataIndex(e)
    if (index>=0){
    var mainindex = this.data.mainindex
    var incomeindex = this.data.series2[index].id
    wx.navigateTo({
      url: '../particular/particular?mainindex=' + mainindex+ '&incomeindex=' + incomeindex,
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
    }
  },
  isdel(e){
    this.setData({
      choose:true,
    })
    wx.setStorageSync('target', e.currentTarget.dataset)
    console.log(e.currentTarget.dataset)
  },
  handleCancel2() {
    this.setData({
      choose: false,
      toggle: this.data.toggle ? false : true
    });
  },
  handleClickItem2() {
    const action = [...this.data.actions2];
    action[0].loading = true;

    this.setData({
      actions2: action
    });
    var target=wx.getStorageSync('target')
    wx.setStorageSync('target', '')
    setTimeout(() => {
      action[0].loading = false;
      this.setData({
        choose: false,
        actions2: action,
        toggle: this.data.toggle ? false : true
      });
      this.del(target);
    }, 500);

  },

  del: function (target) {
    var index = target.index
    var type=target.type
    console.log(index)
    console.log(type)
    if (type ==="expend"){
      this.data.sublist.splice(index, 1)
      this.setData({
        sublist: this.data.sublist
      })
      rawlist[this.data.mainindex].items[0].items.splice(index, 1)
    }
    else {
      this.data.incomelist.splice(index, 1)
      this.setData({
        incomelist: this.data.incomelist
      })
      rawlist[this.data.mainindex].items[1].items.splice(index, 1)
    }
    wx.setStorageSync('cashflow', rawlist)
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
    this.onShow()
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
  
})