var app = getApp()
var util = require('../../utils/util.js');
var rawlist = wx.getStorageSync('cashflow') || []
var wxCharts = require('../../utils/wxcharts.js')
var typearray = app.globalData.typearray
var incomearray = app.globalData.incomearray
var pieChart = null
var pieChart2 = null
Page({
  data: {
    mainindex: '',
    tabIndex: 0,
    typearray: app.globalData.typearray,
    incomearray: app.globalData.incomearray,
    title: '',
    sum: 0,
    sum2: 0,
    sublist: [],
    incomelist: [],
    points: [],
    points2: [],
    series: [],
    series2: [],
    polyline: [],
    polyline2: [],
    markers: [],
    markers2: [],
  },
  onLoad: function () {
    // 生命周期函数--监听页面加载
  },
 
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    var now=new Date();
    var sublist=[];
    var incomelist = []
    var date=util.getYMD(now);
    var a=date.split("-");
    var year = parseFloat(a[0]);
    var month = parseFloat(a[1]);
    rawlist = wx.getStorageSync('cashflow') || []
    for(var i=0;i<rawlist.length;i++){
      for(var j=0;j<rawlist[i].items[0].items.length;j++){
        if (rawlist[i].items[0].items[j].year == year && rawlist[i].items[0].items[j].month==month){ 
          sublist.push(rawlist[i].items[0].items[j])
        }
      }
      for (var j = 0; j < rawlist[i].items[1].items.length; j++) {
        if (rawlist[i].items[1].items[j].year == year && rawlist[i].items[1].items[j].month == month) {
          incomelist.push(rawlist[i].items[1].items[j])
        }
      }
    }
    var sum = 0
    var sum2 = 0
    var points = []
    var points2 = []
    var series = []
    var series2 = []
    var tempseries = []
    var incomeseries = []
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
      sum2: sum2.toFixed(2),
      sublist: sublist,
      incomelist: incomelist,
      series: series,
      series2: series2,
      points: points,
      points2: points2,
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
    if (index >= 0) {
    var typeindex = this.data.series[index].id
    wx.navigateTo({
      url: '../particular/particular?typeindex=' + typeindex,
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
    if (index >= 0) {
    var incomeindex = this.data.series2[index].id
    wx.navigateTo({
      url: '../particular/particular?incomeindex=' + incomeindex,
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
  onShareAppMessage: function () {

  }
  
})