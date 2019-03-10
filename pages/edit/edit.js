// pages/add/add.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    bill: {
      name: '',
      remark:'',
      type:'+',
      account:'',
      startDay: '2019-3-2',
      openId: '',
      userInfo: {},
      typeindex:0
    },
    typearray: app.globalData.typearray,
    typeindex: 0,
    modalHidden: true,
    alertHidden: true,
    alertHidden: '添加成功'
  },
  //设置名称
  bindKeyInput: function (e) {
    var that=this;
    that.setData({
      'bill.name': e.detail.value
    });
  },
  //备注
  bindremarkInput: function(e){
    var that=this;
    that.setData({
      'bill.remark':e.detail.value
    })
  },
  bindTypeArrayChange: function (e) {
    this.setData({
      typeindex: e.detail.value,
      'bill.typeindex': e.detail.value
    })
  },
  //金额类型
  radioChange: function(e){
    var that=this;
    that.setData({
      'bill.type':e.detail.value
    })
  },
  //设置开始日期
  stratChange: function (e) {
    var that=this;
    that.setData({
      'bill.startDay': e.detail.value
    });
  },
  //金额数额
  bindAccountInput: function(e){
    var that=this;
    that.setData({
      'bill.account':e.detail.value
    })
  },
  //初始化
  onLoad: function (options) {
    var that = this;
    var now = new Date();
    var openId = wx.getStorageSync('openId');
    
    // 初始化日期
    that.setData({
      'bill.startDay': util.getYMD(now)
    });
    that.setData({
      'userInfo': app.globalData.userInfo
    });
    console.log(app.globalData.userInfo)
    that.setData({
      openId: openId
    })
  },
  
  // 隐藏提示弹层
  bindSubmit: function (e) {
    var that = this;
    var bill = this.data.bill;
    var creating = this.data.creating;
    if (this.data.bill.name == '') {
      // 提示框
      that.setData({
        alertHidden: false,
        alertTitle: '标题不能为空'
      });
      return
    }
    var re = /^[0-9]+.?[0-9]*$/;
    if (!re.test(this.data.bill.account)) {
      // 提示框
      that.setData({
        alertHidden: false,
        alertTitle: '金额只能是数字'
      });
      return
    }  
    that.createbill();
  },

  createbill: function (e) {
    var tempbills = wx.getStorageSync('bills');
    tempbills.push(this.data.bill);
    wx.setStorageSync('bills', tempbills);
    console.log(wx.getStorageSync('bills'));
    this.setData({
      inputValue: ""
    })
    
  },
  hideAlertView: function () {
    this.setData({
      alertHidden: true
    })
  },
  hideModal: function () {
    this.setData({
      modalHidden: true
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
    //恢复新建状态
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})