// pages/add/add.js
var app = getApp();
var util = require('../../utils/util.js');
var list=[]
Page({
  data: {
    tabIndex: 0,
    title: '',
    remark:'',
    account:'',
    startDay: '2019-3-2',
    date:'',
    average: '',
    openId: '',
    year:'',
    month:'',
    person:1,
    numberarray: app.globalData.numberarray,
    numberindex: 0,
    typearray: app.globalData.typearray,
    typeindex: 0,
    type:'expend',
    incomearray:app.globalData.incomearray,
    incomeindex:0,
    mainindex: 0,
    subindex: 0,
    modalHidden: false,
    alertHidden: false,
    inidata: {}
  },
  //设置名称
  bindKeyInput: function (e) {
    var that=this;
    that.setData({
      title: e.detail.value
    });
  },
  changeTab: function (e) {
    var id = e.currentTarget.id;
    var that = this;
    if (id == 'expend') {
      this.setData({
        tabIndex: 0
      })
    }
    if (id == 'income') {
      this.setData({
        tabIndex: 1
      })
    }
  },
  //备注
  bindremarkInput: function(e){
    var that=this;
    that.setData({
      remark:e.detail.value
    })
  },
  personInput:function(e){
    var that = this;
    that.setData({
      person: e.detail.value
    })
  },
  bindTypeArrayChange: function (e) {
    this.setData({
      typeindex: e.detail.value,
      type:'expend'
    })
  },
  bindIncomeArrayChange: function (e) {
    this.setData({
      incomeindex: e.detail.value,
      type:'income'
    })
  },
  //设置开始日期
  stratChange: function (e) {
    var that=this;
    that.setData({
      startDay: e.detail.value
    });
  },
  dateChange: function(e){
    var that = this;
    that.setData({
      date: e.detail.value
    });
  },
  //金额数额
  bindAccountInput: function(e){
    var that=this;
    that.setData({
      account:e.detail.value
    })
  },
  bindAccountInput2:function(e){
    var that = this;
    that.setData({
      account: e.detail.value,
      type:'income'
    })
  },
  //初始化
  onLoad: function (params) {
    var that = this;
    var now = new Date();
    list = wx.getStorageSync('cashflow') || []

    // 初始化日期
    that.setData({
      startDay: util.getYMD(now),
      date:util.getHMS(now),
      mainindex: params.mainindex,
    });
  },
  
  // 隐藏提示弹层
  bindSubmit: function (e) {
    var that = this;
    var re = /^[0-9]+.?[0-9]*$/;
    if (!re.test(this.data.account)) {
      // 提示框
      that.setData({
        alertHidden: true,
        alertTitle: '金额只能是数字'
      });
      return
    }  
    that.createbill();
  },

  createbill: function (e) {
    var now=new Date();
    var a=this.data.startDay.split("-")
    if(this.data.type=='expend'){
      list[this.data.mainindex].items[0].items.push(
        {
          title: this.data.title,
          remark: this.data.remark,
          account: parseFloat(this.data.account || '0'),
          person: this.data.person,
          average: parseInt(this.data.account / this.data.person),
          startDay: this.data.startDay,
          typeindex: parseInt(this.data.typeindex),
          type: this.data.type,
          date: this.data.date,
          year: parseFloat(a[0]),
          month: parseFloat(a[1])
        }
      )
    }
    else {
      list[this.data.mainindex].items[1].items.push(
        {
          title: this.data.title,
          remark: this.data.remark,
          account: parseFloat(this.data.account || '0'),
          startDay: this.data.startDay,
          incomeindex: parseInt(this.data.incomeindex),
          type: this.data.type,
          date: this.data.date,
          year: parseFloat(a[0]),
          month: parseFloat(a[1])
        }
      )
    }
    list[this.data.mainindex].items[0].items.sort(function (a, b) {
      var d1 = new Date(a.startDay.replace(/-/g, '/') + ' ' + a.date)
      var d2 = new Date(b.startDay.replace(/-/g, '/') + ' ' + b.date)
      return d2 - d1
    }) 
    list[this.data.mainindex].items[1].items.sort(function (a, b) {
      var d1 = new Date(a.startDay.replace(/-/g, '/') + ' ' + a.date)
      var d2 = new Date(b.startDay.replace(/-/g, '/') + ' ' + b.date)
      return d2 - d1
    }) 
    wx.setStorageSync('cashflow',list);
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
        console.log('goback fail')
      },
      complete: function () {
        // complete
      }
    })
  },
  hideAlertView: function () {
    this.setData({
      alertHidden: false
    })
  },
  hideModal: function () {
    this.setData({
      modalHidden: false
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