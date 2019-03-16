// pages/more/more.js
var app = getApp();
var util = require('../../utils/util.js');
var list = wx.getStorageSync('cashflow') || []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainindex: '',
    typearray: app.globalData.typearray,
    title: '',
    startDat:'',
    subindex:'',
    sublist: [],
    account:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    var that=this;
    that.setData({
      mainindex: params.mainindex,
      subindex: params.subindex
    })
    list = wx.getStorageSync('cashflow') || []
    that.setData({
      sublist:list[this.data.mainindex].items
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})