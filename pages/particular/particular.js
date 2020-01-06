var app = getApp()
var rawlist = wx.getStorageSync('cashflow') || []
var util = require('../../utils/util.js');
var typearray = app.globalData.typearray
var incomearray= app.globalData.incomearray
Page({
  data: {
    mainindex: '',
    typearray: app.globalData.typearray,
    incomearray: app.globalData.incomearray,
    typeindex:'',
    incomeindex:'',
    title: '',
    sum: 0,
    tabindex:0,
    sublist: [],
  },
  slidethis: function (e) {
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'cubic-bezier(.8,.2,.1,0.8)',
    });
    var self = this;
    this.animation = animation;
    this.animation.translateY(-620).rotate(-5).translateX(0).step();
    this.animation.translateY(62).translateX(25).rotate(0).step();
    this.setData({
      animationData: this.animation.export()
    });
    setTimeout(function () {
      var slidethis = self.data.sublist.shift();
      self.data.sublist.push(slidethis);
      self.setData({
        sublist: self.data.sublist,
        animationData: {}
      });
    }, 350);
  },
  onLoad: function (params) {
    // 生命周期函数--监听页面加载
    var now = new Date();
    var sublist = [];
    var date = util.getYMD(now);
    var a = date.split("-");
    var year = parseFloat(a[0]);
    var month = parseFloat(a[1]);
    rawlist = wx.getStorageSync('cashflow') || []
    if(params.mainindex){
      if(params.typeindex){
        this.setData({
          mainindex: params.mainindex,
          typeindex: params.typeindex
        })
        var count = 0
        for (var j = 0; j < rawlist[this.data.mainindex].items[0].items.length; j++) {
          if (rawlist[this.data.mainindex].items[0].items[j].typeindex == this.data.typeindex) {
            
            rawlist[this.data.mainindex].items[0].items[j].image = count % 13
            count++
            sublist.push(rawlist[this.data.mainindex].items[0].items[j])
          }
        }
      }
      else{
        this.setData({
          mainindex: params.mainindex,
          incomeindex: params.incomeindex,
          tabindex:1
        })
        var count=0
        for (var j = 0; j < rawlist[this.data.mainindex].items[1].items.length; j++) {
          if (rawlist[this.data.mainindex].items[1].items[j].incomeindex == this.data.incomeindex) {
           
            rawlist[this.data.mainindex].items[1].items[j].image = count % 13
            count++
            sublist.push(rawlist[this.data.mainindex].items[1].items[j])
          }
        }
      }
    }
    else {
      if(params.typeindex){
        this.setData({
          typeindex: params.typeindex,
        })
        var count=0
        for (var i = 0; i < rawlist.length; i++) {
          for (var j = 0; j < rawlist[i].items[0].items.length; j++) {
            if (rawlist[i].items[0].items[j].year == year && rawlist[i].items[0].items[j].month == month && rawlist[i].items[0].items[j].typeindex == this.data.typeindex) {
              rawlist[i].items[0].items[j].image = count % 13
              count++
              sublist.push(rawlist[i].items[0].items[j])
            }
          }
        }
      }
      else{
        this.setData({
          incomeindex: params.incomeindex,
          tabindex: 1
        })
        var count=0
        for (var i = 0; i < rawlist.length; i++) {
          for (var j = 0; j < rawlist[i].items[1].items.length; j++) {
            if (rawlist[i].items[1].items[j].year == year && rawlist[i].items[1].items[j].month == month && rawlist[i].items[1].items[j].incomeindex == this.data.incomeindex) {
              rawlist[i].items[1].items[j].image = count % 13
              count++
              sublist.push(rawlist[i].items[1].items[j])
            }
          }
        }
      }
    }
    var sum = 0
    for (var i = 0; i < sublist.length; i++) {
      sum += parseFloat(sublist[i].account)
    }
    this.setData({
      sum: sum.toFixed(2),
      sublist: sublist,
    })
  },
  onShareAppMessage: function () {
    return {
      imageUrl: '../../image/bg1.png'
    }
  }
})