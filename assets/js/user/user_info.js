$(function () {

   let form = layui.form

   form.verify({
    nickname: function(value) {
      if (value.length > 6) {
        return '昵称长度必须在 1 ~ 6 个字符之间！'
      }
    }
  })
  

  initUserInfo()

  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if(res.status !== 0){
          return layui.layer.msg('获取失败')
        }
        console.log(res);
        form.val('formUserInfo', res.data)
      }
    })
  }

  $('#btnReset').on('click', function(ev) {
    ev.preventDefault()
    initUserInfo()
  })


  $('.layui-form').on('submit',function (ev) {
    ev.preventDefault()

    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg('更新用户信息失败')
        }
        layui.layer.msg('更新用户信息成功')

        // 调用index的方法
        window.parent.getUserInfo()

      }
    })
  })
})