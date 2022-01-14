$(function () {

  getUserInfo()

  $('#btnLogout').on('click', function () {
    layer.confirm('确定要离开吗亲?', {icon: 3, title:'提示'}, 
    function(index){
      //do something

      // 先清除本地 token 存储
      localStorage.removeItem('token')

      location.href = '/login.html'
      layer.close(index);
    })
  })



  function getUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if(res.status !== 0) {
          return layui.layer.msg('获取用户信息失败')
        }
        console.log(res);
        renderAvater(res.data)
      }
    })
  }

  function renderAvater(user) {

    let name = user.nickname || user.username

    $('#welcome').html(`欢迎&nbsp&nbsp${name}`)

    if (user.user_pic !== null) {
      $('.layui-nav-img').attr('src', user.user_pic).show()
      $('.text-avatar').hide()
    } else {
      $('.layui-nav-img').hide()
      let first = name[0].toUpperCase()
      $('.text-avatar').html(first).show()
    }
  }
})
