$(function(){
    var $loginBox = $('#loginBox');
    var $registerBox = $('#registerBox');

    //显示注册页面
    $loginBox.find('a').on('click', function(){
        $registerBox.show();
        $loginBox.hide();
    });

    //显示登陆页面
    $registerBox.find('a').on('click', function(){
        $loginBox.show();
        $registerBox.hide();
    });

    // 注册
    $registerBox.find("[type='button']").click(function () {
        let user = $registerBox.find("[name='register_user']").val();
        let pwd = $registerBox.find("[name='register_pwd']").val();
        let repwd = $registerBox.find("[name='register_repwd']").val();
        // 数据的基本验证
        if(user=='' || user==null || user==undefined){
            // $registerBox.find()
            $registerBox.find('.colWarning').html('用户名不能为空');
            return;
        }
        if(pwd=='' || pwd==null || pwd==undefined){
            // $registerBox.find()
            $registerBox.find('.colWarning').html('密码不能为空');
            return;
        }
        if(pwd!==repwd){
            // $registerBox.find()
            $registerBox.find('.colWarning').html('两次输入密码不一致');
            return;
        }

        // 通过ajax提交请求
        $.ajax({
            type: 'post',
            url: '/api/user/register',
            data:{
                username: user,
                password: pwd,
                repassword: repwd
            },
            dataType:'json',
            success:function (result) {  
                $registerBox.find('.colWarning').html(result.message);
                if(!result.code){
                    //注册成功
                    let getID = setTimeout(function () {  
                        $loginBox.show();
                        $registerBox.hide();
                    }, 1000);
                    clearTimeout(getID);
                }
            }
        });
    });

    // 登陆
    $loginBox.find("[type='button']").click(function () {
        let user = $loginBox.find("[name='login_user']").val();
        let pwd = $loginBox.find("[name='login_pwd']").val();
        // 数据的基本验证
        if(user=='' || user==null || user==undefined || pwd=='' || pwd==null || pwd==undefined){
            $loginBox.find('.colWarning').html('用户名或密码不能为空');
            return;
        }

        // 通过ajax提交请求
        $.ajax({
            type: 'post',
            url: '/api/user/login',
            data:{
                username: user,
                password: pwd
            },
            dataType:'json',
            success:function (result) {  
                if(!result.code){
                    $loginBox.find('.colWarning').html(result.message);
                    location.href='/index';              
                }else{
                    $loginBox.find('.colWarning').html(result.message);
                }
            }
        });
    });
    
});