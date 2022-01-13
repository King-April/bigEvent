$(function () {

  // 注册账号的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  //去登录的链接
  $('#link_login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })


  // 自定义个正则
  // 从layui 中 获取form对象
  let form = layui.form

  let layer = layui.layer
  form.verify({
    // pwd的校验规则
    pwd: [
      /^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'
    ],

    // 校验两次密码是否一致
    repwd: function (value) {
      let pwd = $('.reg-box [name=password]').val()

      if (pwd !== value) {
        return '两次密码不一致'
      }
    }
  })


  // 监听表单的注册提交事件
  $('#form_reg').on('submit',function (ev) {
    ev.preventDefault()
    $.post('/api/reguser', 
    {
      username: $('.reg-box [name=username]').val(),
      password: $('.reg-box [name=password]').val()
    },
      function (res) {
        if (res.status !== 0 ) {
          return layer.msg(res.message);
        }
        layer.msg('注册成功，立即登录')
        $('#link_login').click()
      }
    )
  })

  // 监听表单的登录提交事件
  $('#form_login').on('submit',function (ev) {
    ev.preventDefault()
    $.ajax({
      url:'/api/login',
      method: 'POST',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('年轻人，在登陆一次吧')
        }
        layer.msg('幸运的人类，你开启了一段新的旅程')
        console.log(res.token);
        localStorage.setItem('token', res.token)

        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })
})
