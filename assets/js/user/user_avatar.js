$(function () {

  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  $('#btnChooseImg').on('click', function () {

    console.log(1)
    $('#file').click()
  })


  $('#file').on('change', function (ev) {

    let filelist = ev.target.files
    // console.log(ev.target.files);

    if (filelist.length === 0) {
      return layui.layer.msg('请选择照片')
    }

    // 拿到用户选择的文件
    let file = ev.target.files[0]

    // 把文件 转化为 路径

    let imgURl = URL.createObjectURL(file)

    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', imgURl)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
  })


  $('#btnUpload').on('click', function () {

    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
      .toDataURL('image/png')


      // 发起 更换头像请求
      $.ajax({
        method: 'POST',
        url: '/my/update/avatar',
        data: {
          avatar:dataURL
        },
        success: function (res) {
          // console.log(res);
          if (res.status !== 0 ) {
            return layui.layer.msg('亲 更换头像失败！')
          }

          layui.layer.msg('亲 更换头像成功呦！')

          // 利用 window.parent.getUserInfo() 更新用户信息
          window.parent.getUserInfo()
        }
      })
  })
})