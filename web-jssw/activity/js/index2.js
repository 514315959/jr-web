// 倒计时
$(".count_down").countDown({
    startTimeStr: '2018/10/28 00:00:00', //开始时间
    endTimeStr: '2018/11/29 14:28:59', //结束时间
    daySelector: ".day_num",
    hourSelector: ".hour_num",
    minSelector: ".min_num",
    secSelector: ".sec_num"
});
// 轮播图 
var swiper = new Swiper('.swiper-container', {
    spaceBetween: 0,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
// 报名弹出框相关功能
var qme = $('.fixed .qme1')

// 判断是否报过名
if (true) {
    $('.qme1').text('进群领红包')

    qme.click(function() {
        $('.bk').css({
            'display': 'block',
        })
        $('.f-code').css({
            'display': 'block',
        })
    })
} else {
    qme.click(function() {
        $('#apply').popup();
    })
}
$('.bk').click(function() {
    $('.bk').css({
        'display': 'none',
    })
    $('.f-code').css({
        'display': 'none',
    })
        }
    )
//预约抢名额
var baomin = 0; // 模拟后台报名数据
function insert() {
    var name = $("#user").val();
    var phone = $("#tel").val();
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
                //ajax 数据请求
                $.ajax({
                    type: 'post',
                    url: '/web-jssw/index.html',
                    data: '',
                    // dataType: 'json',
                    success: function(msg) {
                        // msg后台数据，url为真实路径时用到
                        if (baomin == 0) {
                            //报名成功
                            $.alert({
                                title: '提示',
                                text: '报名成功',
                                onOK: function() {
                                    //点击确认
                                    baomin = 1;
                                    $("#user").val('');
                                    $("#tel").val('');
                                    $.closePopup();
                                }
                            });
                        } else {
                            //已经报名提示
                            $.alert({
                                title: '提示',
                                text: '报名失败，您已经报名了'
                            });
                            $("#user").val('');
                            $("#tel").val('');
                            $.closePopup();
                        }
                    },
                    error: function() {
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
}
var flexrigh = $('#flex-right')
var toright = $('#toright')
toright.click(function(event) {
        var right = flexrigh.css('right');
        if (right == '0px') {
            flexrigh.animate({ right: "-60px" });
            $(this).css({ 'transform': 'rotate(180deg)' })
        } else {
            flexrigh.animate({ right: "0px" });
            $(this).css({ 'transform': 'rotate(360deg)' })
        }
    })
    //小手指点赞
var clickzan = $('#clickzan')
var dianzan = 0; //模拟后台数据
clickzan.click(function() {
        var img = $('<img src="./activity/images/zan.png" class="img2">')
        $('.dianzan').append(img)
        var img2 = img
        img2.stop(false, true).animate({
                left: "-50px",
                top: "220px",
                width: "45px"
            }, 200)
            .animate({
                left: "0px",
                top: "180px",
                width: "40px"
            }, 180)
            .animate({
                left: "-40px",
                top: "130px",
                width: "25px"
            }, 160)
            .animate({
                left: "0",
                top: "20px",
                width: "20px"
            }, function() {
                img2.remove();
            })
            //ajax 数据请求
        $.ajax({
            type: 'get',
            url: '/web-jssw/index.html',
            data: '',
            // dataType: 'json',
            success: function(msg) {
                // msg后台数据，url为真实路径时用到
                if (dianzan == 0) {
                    //点赞成功
                    $.alert({
                        title: '提示',
                        text: '点赞成功',
                        onOK: function() {
                            //点击确认
                            dianzan = 1;
                            var i = parseInt($("#dz-num").text())
                            $("#dz-num").text(++i);
                        }
                    });
                } else {
                    //已经点过赞提示
                    $.alert({
                        title: '提示',
                        text: '点赞失败，您已经点过赞了'
                    });
                }
            },
            error: function() {
                //请求失败
                $.alert({
                    title: '提示',
                    text: '请求失败，稍后再试'
                });
            }
        })
    })
    // 右侧文字居中
var rh = $(".user-des .p1").parent().height()
var rhp1 = $(".user-des .p1").height()
var rhp2 = $(".user-des .p2").height()
if( rhp1 < rhp2){
    $(".user-des .p1").css({
        'marginTop': (rh - rhp1) / 2 + 'px'
    })
}else{
    $(".user-des .p1").height(rhp2)
}

    // 无缝滚动效果
var area = document.getElementById('box');
var cont1 = document.getElementById('cont1');
var cont2 = document.getElementById('cont2');
if ($(cont1).height() > 150) {
    $(area).height(150);
} else {
    $(area).height($(cont1).height());
}
// 克隆cont1给cont2
cont2.innerHTML = cont1.innerHTML;

function myScroll() {
    if (area.scrollTop >= cont1.scrollHeight-1) {
        area.scrollTop = 0.99;
    } else {
        area.scrollTop++;
    }
}

var time = 43;
var interval = setInterval('myScroll()', time);

area.onmouseover = function() {
    clearInterval(interval);
};

area.onmouseout = function() {
    // 继续执行之前的定时器
    interval = setInterval('myScroll()', time);
};
// 展示全部报名的盒子高度计算
function totalup() {
    // var th = $('#total-sign .animate').height();
    var thu = $('#total-sign .animate ul li').height();
    if (thu * $('#total-sign .animate ul li').length <= 350) {
        $('#total-sign .animate').height(thu * $('#total-sign .animate ul li').length);
    } else {
        $('#total-sign .animate').height(350);
    }
    $('#total-sign').popup();
}
// 播放或者暂停音乐
$('#musicpng').click(function() {
    if ($('#music')[0].paused == true) {
        this.src = './activity/images/music.gif';
        $('#music')[0].play();
    } else {
        this.src = './activity/images/musicj.png';
        $('#music')[0].pause();
    }
})

//判斷 WeixinJSBridge 是否存在(用于ios，微信端无法自动播放音频)
if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
    $('#music')[0].play();
} else {
    //監聽客户端抛出事件"WeixinJSBridgeReady"
    if (document.addEventListener) {
        document.addEventListener("WeixinJSBridgeReady", function() {
            $('#music')[0].play();
        }, false);
    } else if (document.attachEvent) {
        document.attachEvent("WeixinJSBridgeReady", function() {
            $('#music')[0].play();
        });
        document.attachEvent("onWeixinJSBridgeReady", function() {
            $('#music')[0].play();
        });
    }
}
// 判断活动结束，隐藏下面报名，隐藏倒计时，切换活动状态图片
var over = false; // 模拟后台的数据
if (over) {
    $('.count_down').css('display', 'none');
    $('footer .fixed').css('display', 'none');
    $('.a-left').css({
        'backgroundImage': 'url(./activity/images/over.png)',
        'paddingLeft': '15px',
    }).text('活动已完美收官');
}
// 回到顶部js
$("#back-to-top").click(function() {
    //$('body,html').animate({scrollTop:0},1000);
    if ($('#page1').scrollTop()) {
        $('#page1').animate({ scrollTop: 0 }, 1000);
        return false;
    }
    $('#page1').animate({ scrollTop: 0 }, 1000);
    return false;
});
// 领取优惠券
$("#tab1 .tab1-img2 .img-k").click(function(){
    $.alert({
        title: '提示',
        text: '领取优惠券成功'
    });
})
// 文档对象body的scroll事件(用于主题内容的导航)
$('#page1').scroll(function() {
    var headerH = $('header').height();
    var top = document.getElementById('page1').scrollTop;
    if (top >= headerH) {
        $("#back-to-top").fadeIn(1500);
    } else {
        $("#back-to-top").fadeOut(1500);
    }
});
// 计算page2的页面高度
var page2 = $('#page2').height();
var hbH = page2 -  $('.weui-tabbar').outerHeight();
    $('.hb-bck').height(hbH)