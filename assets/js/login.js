$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
            $('.login-box').show()
            $('.reg-box').hide()
        })
        //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
        //通过form.verify()自定义验证规则
    form.verify({
            //自定义了一个pwd的验证规则
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            repwd: function(value) {
                var pwd = $('#pp').val()
                if (pwd !== value) {
                    return '两次输入的密码不一致！'
                }
            }
        })
        //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        $.post('http://api-breakingnews-web.itheima.net/api/reguser', {
                username: $('#reg_username').val(),
                password: $('reg_password').val()
            },
            function(res) {
                if (res.status !== 0) {
                    // return console.log();
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，去登录');
                $('#link_login').click()
            }
        )
    })

    //监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: 'http://api-breakingnews-web.itheima.net/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    // return layer.msg('登陆失败！')
                    console.log(res.message);
                }
                layer.msg('登陆成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'




            }
        })
    })
})