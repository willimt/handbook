// pages/add/add.js
var app = getApp();
var util = require('../../utils/util.js');
var list=[]
Page({
  data: {
    title: '',
    remark:'',
    type:'+',
    account:'',
    startDay: '2019-3-2',
    openId: '',
    userInfo: {},
    numberarray: app.globalData.numberarray,
    numberindex: 0,
    typearray: app.globalData.typearray,
    typeindex: 0,
    mainindex: 0,
    subindex: 0,
    modalHidden: true,
    alertHidden: true,
    alertHidden: '添加成功',
    inidata: {}
  },
  //设置名称
  bindKeyInput: function (e) {
    var that=this;
    that.setData({
      title: e.detail.value
    });
  },
  //备注
  bindremarkInput: function(e){
    var that=this;
    that.setData({
      remark:e.detail.value
    })
  },
  bindTypeArrayChange: function (e) {
    this.setData({
      typeindex: e.detail.value,
    })
  },
  //金额类型
  radioChange: function(e){
    var that=this;
    that.setData({
      type:e.detail.value
    })
  },
  //设置开始日期
  stratChange: function (e) {
    var that=this;
    that.setData({
      startDay: e.detail.value
    });
  },
  //金额数额
  bindAccountInput: function(e){
    var that=this;
    that.setData({
      account:e.detail.value
    })
  },
  //初始化
  onLoad: function (params) {
    var that = this;
    var now = new Date();
    var openId = wx.getStorageSync('openId');
    list = wx.getStorageSync('cashflow') || []

    // 初始化日期
    that.setData({
      startDay: util.getYMD(now)
    });

    that.setData({
      userInfo: app.globalData.userInfo
    });
    console.log(app.globalData.userInfo)
    that.setData({
      openId: openId
    })
    that.setData({
      mainindex: params.mainindex,
    })
  },
  
  // 隐藏提示弹层
  bindSubmit: function (e) {
    var that = this;
    if (this.data.title== '') {
      // 提示框
      that.setData({
        alertHidden: false,
        alertTitle: '标题不能为空'
      });
      return
    }
    var re = /^[0-9]+.?[0-9]*$/;
    if (!re.test(this.data.account)) {
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
    list[this.data.mainindex].items.push(
      {
        title: this.data.title,
        remark: this.data.remark,
        account: parseFloat(this.data.account || '0'),
        startDay: this.data.startDay,
        typeindex: parseInt(this.data.typeindex),
        type:this.data.type
      }
    )
    
    wx.setStorageSync('cashflow',list);
    console.log(wx.getStorageSync('cashflow'));
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function (res) {
        // success
        console.log('goback succ')
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