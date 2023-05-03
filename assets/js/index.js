$(function(){
  getUserInfo()
  const layer = layui.layer
  // 点击退出按钮
  $("#btnGoout").on('click',function(){
    layer.confirm('确定要退出吗？', {icon: 3, title:'提示'}, function(index){
      // 清空本地存储
      localStorage.removeItem('token')
      // 跳转登陆页面
      location.href='/login.html'
      layer.close(index);
    });
  })
})
// 获取用户基本信息
function getUserInfo(){
  $.ajax({
    method:'GET',
    url:'/my/userinfo',
    success:function(res){
      // console.log(res);
      if(res.status!==0){
        return layer.msg('获取用户信息失败！')
      }
      renderAvatar(res.data)
    },
  })
}
// 获取用户头像
function renderAvatar(user){
  // 设置用户头像
  let uname= user.nickname || user.username
  $("#welcome").html("欢迎&nbsp;&nbsp; " + uname)
  // 按需渲染用户头像
  if(user.user_pic!==null){
    $(".layui-nav-img").attr('src',user.user_pic).show()
    $(".text-avatar").hide()
  }else{
    $(".layui-nav-img").hide()
    let first = uname[0].toUpperCase()
    $(".text-avatar").html(first).show()
  }
}
