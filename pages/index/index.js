// //index.js
// //获取应用实例
 const app = getApp()

 Page({
   data: {
     'userUrl':''
   },
   //获取用户输入的用户名
   userUrlInput: function (e) {
     this.setData({
       userUrl: e.detail.value
     })
   },
   //事件处理函数
   bindViewTap: function() {
     wx.navigateTo({
       url: '../logs/logs'
     })
   },
   onLoad: function () {
     
   },
   getAuthorMessage: function(e) {
     var that = this;
     var btnUrl = this.data.userUrl;
     console.log(btnUrl)
     wx.getSetting({ 
       success: function (res) {
         if (res.authSetting['scope.userInfo']) {
           // 已经授权，可以直接调用 getUserInfo 获取头像昵称
           wx.getUserInfo({
             success: function (res) {
               //进行视频链接操作
               wx.request({
                 url: 'https://www.layzz.cn/content/video', //仅为示例，并非真实的接口地址
                 data: {
                   openId: '45678',
                   link: btnUrl
                 },
                 header: {
                   'content-type': 'application/json' // 默认值
                 },
                 success: function (res) {
                   var video = res.data.data;
                   console.log(res.data)
                   if (res.data.retCode === '0002') {
                     wx.showToast({
                       title: '视频地址有误',
                       icon: 'none'
                     })
                   } else if (res.data.code === '0001') {
                  
                    //  this.userUrl = video; //无效不能实时的渲染到页面
                    //  that.setData({ userUrl: video });//和页面进行绑定可以动态的渲染到页面
                    //  //将地址返回给前端

                   }
                 }
               }
               )
             }
           })               
          }
       }
      })
   }
  })
 
