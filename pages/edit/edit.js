// pages/add/add.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task: {
      inputValue: '',
      name: '',
      signTime: '00:00',
      signEarlyTime: '00:00',
      startDay: '2019-3-2',
      endDay: '2019-3-2',
      repeat: {
        'monday': 1,
        'tuesday': 1,
        'wednesday': 1,
        'thursday': 1,
        'friday': 1,
        'satuiday': 0,
        'sunday': 0
      },
      openId: '',
      userInfo: {},
      creating: false,
      modalHidden: true
    }
  },
  //设置任务名称
  bindKeyInput: function (e) {
    this.setData({
      'task.name': e.detail.value
    });
  },
  //设置打卡时间
  setSignTime: function (e) {
    var that = this;
    var hour = ((+e.detail.value.slice(0, 2) + 24 - 2) % 24).toString();
    that.setData({
      'task.signTime': e.detail.value,
      'task.signEarlyTime': (hour[1] ? hour : '0' + hour) + ':' + e.detail.value.slice(3, 5)
    });
  },
  //设置开始日期
  stratChange: function (e) {
    this.setData({
      'task.startDay': e.detail.value
    });
  },
  //设置结束日期
  endChange: function (e) {
    this.setData({
      'task.endDay': e.detail.value
    });
  },
  //设置重复日期
  changeMonday: function (e) {
    var state = this.data.task.repeat.monday;
    this.setData({
      'task.repeat.monday': (state == 1 ? 0 : 1)
    })
  },
  changeTuesday: function (e) {
    var state = this.data.task.repeat.tuesday;
    this.setData({
      'task.repeat.tuesday': (state == 1 ? 0 : 1)
    })
  },
  changeWednesday: function (e) {
    var state = this.data.task.repeat.wednesday;
    this.setData({
      'task.repeat.wednesday': (state == 1 ? 0 : 1)
    });
  },
  changeThursday: function (e) {
    var state = this.data.task.repeat.thursday;
    this.setData({
      'task.repeat.thursday': (state == 1 ? 0 : 1)
    });
  },
  changeFriday: function (e) {
    var state = this.data.task.repeat.friday;
    this.setData({
      'task.repeat.friday': (state == 1 ? 0 : 1)
    });
  },
  changeSaturday: function (e) {
    var state = this.data.task.repeat.saturday;
    this.setData({
      'task.repeat.saturday': (state == 1 ? 0 : 1)
    });
  },
  changeSunday: function (e) {
    var state = this.data.task.repeat.sunday;
    this.setData({
      'task.repeat.sunday': (state == 1 ? 0 : 1)
    });
  },
  //初始化
  onLoad: function (options) {
    var that = this;
    var openId = wx.getStorageSync('openId');
    var now = new Date();

    that.setData({
      'task.signTime': util.getHM(now),
      'task.signEarlyTime': util.getHM(new Date(now.getTime() - 1000 * 3600 * 2))
    });

    // 初始化日期
    that.setData({
      'task.startDay': util.getYMD(now),
      'task.endDay': util.getYMD(now)
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
  modalChange: function (e) {
    this.setData({
      'task.modalHidden': true
    })
  },
  bindSubmit: function (e) {
    var that = this;
    var task = this.data.task;
    var creating = this.data.creating;
    if (task.name == '') {
      this.setData({
        'task.modalHidden': false
      });
    }
    else {
      if (!creating) {
        this.setData({
          'creating': true
        });
        that.createTask();
      }
    }
  },

  createTask: function (e) {
    var temptasks = wx.getStorageSync('tasks');
    temptasks.push(this.data.task);
    wx.setStorageSync('tasks', temptasks);
    console.log(wx.getStorageSync('tasks'));
    wx.navigateTo({
      url: '../add/success/success',
    })
    this.setData({
      inputValue: ""
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
    this.setData({
      'creating': false
    });
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