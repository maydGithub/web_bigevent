$(function() {
    getUserInfo()
    $('#btnLogout').on('click', function() {
        var layer = layui.layer
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: 'http://api-breakingnews-web.itheima.net/my/userinfo',
        Headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户失败')
            }
            //调用renderAvatar渲染用户的头像
            renderAvatar(res.data)
        },
        complete: function(res) {
            if (res.responseJSON.status === 1) {
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        }
    })
}

function renderAvatar(user) {
    //获取用户的名称
    var name = user.nikename || user.username
    $('#welcome').html('欢迎&nbsp&nbsp' + name)
        //按需渲染用户的头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', 'user.user_pic').show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }


}