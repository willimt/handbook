// pages/all/all.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  qq:function(){
    wx.setClipboardData({
      data: '2654177652',
      success(res) {
        wx.getClipboardData({
          success(res) {

          }
        })
      }
    })
  },
  git:function(){
    wx.setClipboardData({
      data: 'https://github.com/willimt',
      success(res) {
        wx.getClipboardData({
          success(res) {
            
          }
        })
      }
    })
  },
  weibo: function () {
    wx.setClipboardData({
      data: 'https://weibo.com/u/6915154015',
      success(res) {
        wx.getClipboardData({
          success(res) {
            
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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