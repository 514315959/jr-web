// 检测设备高度
var devH = $(window).height();
var count = 0;
// 页面载入
document.onreadystatechange = function(){
    if(document.readyState == 'complete'){
        preimg(arr);
    }
}
// $('.loading').height(devH);// 避免出现滚动条
$('section').height(devH);// 避免出现滚动条

// 图片预加载
var arr = [
    './hongbao/images/bck.png',
    './hongbao/images/dabeijing5.png',
    './hongbao/images/hongbao.png'
];
function preimg(arr) {
    var img = [];
    for (var i = 0; i < arr.length; i++) {
        img[i] = new Image();
        $(img[i]).on('load', function () {
            count++;
            if (count == arr.length) {
                // 页面载入
                $('.loading').fadeOut();
                $('section').height(devH * 1.8);
                $('section').css({
                    'display': 'block'
                })
            }
        })
        $(img[i]).on('error', function () {
            count++;
            if (count == arr.length) {
                // 页面载入
                $('.loading').fadeOut();
                $('section').height(devH * 1.8);
                $('section').css({
                    'display': 'block'
                })
            }
        })
        img[i].src = arr[i];
    }
}

// 禁止窗口滚动
var bodyEl = document.body
var laytop = 0
function stopBodyScroll(isFixed) {
    if (isFixed) {
        laytop = window.scrollY

        bodyEl.style.position = 'fixed'
        bodyEl.style.top = -laytop + 'px'
    } else {
        bodyEl.style.position = 'relative';
        bodyEl.style.top = '';
        window.scrollTo(0, laytop); // 回到原先的top
    }
}
// 领取红包
$('.anniu').click(function () {
    //更换背景
    // $('body').css({
    //     'backgroundImage': 'url(./hongbao/images/dabeijing2.png)'
    // }) 
    $('.bk').css({
        'display': 'block'
    })
    $('.hongbao').css({
        'display': 'block'
    })
    //隐藏按钮
    this.style.display = 'none';
    $('body').css({
        'left': '0',
        'right': '0'
    })
    stopBodyScroll(true);
})
// 领取红包
$('.hongbao-btn').click(function () {
    $('.beijing img').attr({
        'src': './hongbao/images/dabeijing5.png'
    })
    // 显示表单
    $('.get').css({
        'display': 'block'
    })
    $('.erweima').css({
        'display': 'block'
    })
    $.closeModal();
    stopBodyScroll(false);
})
// 获取验证码
var time = 0;
var yzm = '';
$('#getcode').click(function () {
    var phone = $("#tel").val();
    if (phone.length == 0) {
        $.toast("手机号码不得为空", 'text');
        return false;
    } else {
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(phone)) {
            $.toast("手机号码格式不正确", 'text');
            return false;
        }
        //ajax 数据请求
        $.ajax({
            type: 'post',
            url: './index.html',
            data: '',
            // dataType: 'json',
            success: function (msg) {
                // msg后台数据，url为真实路径时用到
                if (time == 0) {
                    yzm = Math.ceil(Math.random() * 89999 + 10000 + 1);
                    //获取成功
                    $.alert({
                        title: '提示',
                        text: '验证码获取成功：' + yzm,
                        onOK: function () {
                            //点击确认
                            time = 60;
                            var settime = setInterval(function () {
                                $('#codetit').text(time + '秒');
                                time--;
                                if (time == 0) {
                                    clearInterval(settime);
                                    $('#codetit').text('获取验证码');
                                }
                            }, 1000)
                        }
                    });
                } else {
                    //获取成功
                    $.alert({
                        title: '提示',
                        text: '获取频繁',//具体信息有后台决定
                    });
                }
            },
            error: function () {
                //请求失败
                $.alert({
                    title: '提示',
                    text: '请求失败，稍后再试'
                });
            }
        })
    }
})
// 提交数据
var hongbao = 0;//模拟后台数据，是否领取红包
$('#sub').click(function () {
    var name = $("#user").val();
    var phone = $("#tel").val();
    var code = $("#code").val();
    if (name.length == 0) {
        $.toast("姓名不能为空", 'text');
        return false;
    } else {
        if (phone.length == 0) {
            $.toast("手机号码不得为空", 'text');
            return false;
        } else {
            var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(phone)) {
                $.toast("手机号码格式不正确", 'text');
                return false;
            } else {
                if (code == '') {
                    $.toast("验证码不能为空", 'text');
                    return false;
                }
                //ajax 数据请求
                $.ajax({
                    type: 'post',
                    url: './index.html',
                    data: '',
                    // dataType: 'json',
                    success: function (msg) {
                        // msg后台数据，url为真实路径时用到
                        if (hongbao == 0) {
                            //领取成功
                            $.alert({
                                title: '提示',
                                text: '领取红包成功',
                                onOK: function () {
                                    //点击确认
                                    hongbao = 1;
                                    $("#user").val('');
                                    $("#tel").val('');
                                    $("#code").val('');
                                }
                            });
                        } else {
                            //已经领过提示
                            $.alert({
                                title: '提示',
                                text: '提交失败，您已经领过红包了' // 具体其他信息由后台具体确定
                            });
                            $("#user").val('');
                            $("#tel").val('');
                            $("#code").val('');
                        }
                    },
                    error: function () {
                        //请求失败
                        $.alert({
                            title: '提示',
                            text: '请求失败，稍后再试'
                        });
                    }
                })
            }
        }
    }
})