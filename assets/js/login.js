$(function () {
  $("#link-login").on('click', function () {
    $(".login-box").hide()
    $(".reg-box").show()
  })
  $("#link-reg").on('click', function () {
    $(".reg-box").hide()
    $(".login-box").show()
  })
  // 从layui中获取form
  const form = layui.form
  const layer = layui.layer
  // 自定义校验规则
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位,且不能出现空格'
    ],
    rpwd: function (value) {
      let pwd = $(".reg-box [name=pwd]").val()
      if (pwd != value) {
        return '两次密码不一样'
      }
    }
  })
  // 监听注册表单提交事件
  $("#form-reg").on('submit', function (e) {
    e.preventDefault();
    $.post('/api/reguser', { username: $("#form-reg [name=username]").val(), password: $("#form-reg [name=pwd]").val() }, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      // console.log("注册成功");
      layer.msg('注册成功,请登录');
      $("#link-reg").click()
    })
  })
  // 登录表单提交
  $("#form_login").on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'POST',
      data: $("#form_login").serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败');
        }
        layer.msg('登录成功');
        // console.log(res);
        // 登录成功后，把得到的token字符串，存到localStorage
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href='./index.html'
      }
    })
  })
})