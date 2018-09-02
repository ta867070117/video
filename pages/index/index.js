// //index.js
// //获取应用实例
 const app = getApp()

 Page({
   data: {
     
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
                   link: 'http://v.douyin.com/dFmuq6/'
                 },
                 header: {
                   'content-type': 'application/json' // 默认值
                 },
                 success: function (res) {
                  var video = res.data.data.video;
                   console.log(video);
                   if (res.data.retCode === 400) {
                     wx.showToast({
                       title: '视频地址有误',
                       icon: 'none'
                     })
                   } else if (res.data.retCode === 200) {
                     //获取用户相册权限
                     wx.getSetting({
                       success: function (res) {
                         if (res.authSetting['scope.writePhotosAlbum']) {
                          console.log("走到我这里")
                           wx.saveVideoToPhotosAlbum({
                             filePath: video,
                             success(res) {
                               console.log("成功了哟")
                             },
                             fail(res) {
                               console.log("失败了哟")
                             }
                           }
                           )
                         }else {
                           wx.saveVideoToPhotosAlbum({
                             filePath: video,
                             success(res) {
                               console.log("成功了哟   111")
                               console.log(res.errMsg)
                             },
                             fail(res) {
                               console.log("失败了哟")
                               console.log(res.errMsg)
                             }
                           }
                           )
                         }
                       }
                     })


                   }
                 }
               })
             }
           })
              
          }
       }
      })
   }
  })
 
