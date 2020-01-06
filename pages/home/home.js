//index.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp()
var rawlist = wx.getStorageSync('cashflow') || []
Page({
  data: {
    month:'',
    toggle: false,
    visible2: false,
    actions2: [
      {
        name: '删除',
        color: '#ed3f14'
      }
    ],
    modalHidden1: false,
    modalHidden2: false,
    alertHidden: false,
    temptitle: '',
    tempindex: '',
    list: rawlist,
  },
  onLoad: function () {
    rawlist = wx.getStorageSync('cashflow') || []
    var that = this
    var now=new Date()
    var date = util.getYMD(now);
    var a=date.split("-");
    //调用应用实例的方法获取全局数据
    that.setData({
      month: parseFloat(a[1]),
      temptitle: parseFloat(a[1]) + '月账单'
    })
  },
  onShow:function(){
    rawlist = wx.getStorageSync('cashflow') || []
    var count=0;
    for(var i=0;i<rawlist.length;i++){
      rawlist[i].id=count
      count++
    }
    this.setData({
      list:rawlist
    })
  },
  setTitle: function (e) {
    if(e.detail.value!=''){
      this.setData({
        temptitle: e.detail.value
      })
      return {
        value: ''
      }
    }
    
  },
  handleCancel2() {
    this.setData({
      visible2: false,
      toggle: this.data.toggle ? false : true
    });
  },
  handleClickItem2(e) {
    const action = [...this.data.actions2];
    action[0].loading = true;
    this.setData({
      actions2: action
    });
    var index=wx.getStorageSync('index')
    setTimeout(() => {
      action[0].loading = false;
      this.setData({
        visible2: false,
        actions2: action,
        toggle: this.data.toggle ? false : true
      });
      this.del(index);
    }, 500);
    
  },
  actionsTap(e) {
    this.setData({
      visible2: true
    });
    wx.setStorageSync('index', e.target.dataset.index)
  },
  //新增模态框
  showModal1: function (e) {
    this.setData({
      modalHidden1: !this.data.modalHidden1
    })
  },
  skipto:function(e){
    var index = e.target.dataset.index;
    wx.navigateTo({
      url: '../../pages/detail/detail?index='+index,
    })
  },
  modalBindaconfirm1: function (e) {
    var that=this;
    rawlist.push({
      title: this.data.temptitle,

      items: [{
        type: 'expend',
        items: []
      },
        {
          type: 'income',
          items: []
        }]
    })
    this.setData({
      modalHidden1: !this.data.modalHidden1,
      temptitle: this.data.month + '月账单',
      list: rawlist,
    })
    wx.setStorageSync('cashflow', rawlist)
    console.log(rawlist)
    this.onShow()
  },
  modalBindcancel1: function () {
    this.setData({
      modalHidden1: !this.data.modalHidden1,
    })
  },
  hideAlertView: function () {
    this.setData({
      alertHidden: false
    })
  },
  //重命名模态框
  showModal2: function (e) {
    var tempindex = e.currentTarget.dataset.index
    var temptitle = this.data.list[tempindex].title
    this.setData({
      modalHidden2: !this.data.modalHidden2,
      temptitle: temptitle,
      tempindex: tempindex
    })
  },
  modalBindaconfirm2: function (e) {
    var templist = this.data.list
    var index = this.data.tempindex
    templist[index].title = this.data.temptitle
    rawlist[index].title = this.data.temptitle
    this.setData({
      modalHidden2: !this.data.modalHidden2,
      temptitle: this.data.month+'月账单',
      list: templist
    })
    wx.setStorageSync('cashflow', rawlist)
  },
  modalBindcancel2: function () {
    this.setData({
      modalHidden2: !this.data.modalHidden2,
    })
  },
  //删除事件
  del: function (e) {
    var index = e
    this.data.list.splice(index, 1)
    this.setData({
      list: this.data.list
    })
    rawlist.splice(index, 0)
    wx.setStorageSync('cashflow', rawlist)
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
    this.onShow()
  },
  onShareAppMessage: function () {
    return{
      imageUrl: '../../image/bg1.png'
    }
  }
})
