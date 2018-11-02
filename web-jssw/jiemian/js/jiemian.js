// 检测设备高度
var devH = $(window).height();
$('body').height(devH); //设置满屏
// 页面载入
document.onreadystatechange = function() {
        if (document.readyState == 'complete') {
            preimg(arr);
        }
    }
    // 图片预加载
var arr = [
    './images/beijing2.png',
    './images/logo1.png',
];
var count = 0;

function preimg(arr) {
    var img = [];
    for (var i = 0; i < arr.length; i++) {
        img[i] = new Image();
        $(img[i]).on('load', function() {
            count++;
            if (count == arr.length) {
                // 页面载入
                $('.loading').fadeOut();
            }
        })
        $(img[i]).on('error', function() {
            count++;
            if (count == arr.length) {
                // 页面载入
                $('.loading').fadeOut();
            }
        })
        img[i].src = arr[i];
    }
}
preimg(arr);
// 获取验证码
var time = 0;
var yzm = '';
$('#getcode').click(function() {
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
                url: './signup.html',
                data: '',
                // dataType: 'json',
                success: function(msg) {
                    // msg后台数据，url为真实路径时用到
                    if (time == 0) {
                        yzm = Math.ceil(Math.random() * 89999 + 10000 + 1);
                        //获取成功
                        $.alert({
                            title: '提示',
                            text: '验证码获取成功：' + yzm,
                            onOK: function() {
                                //点击确认
                                time = 60;
                                var settime = setInterval(function() {
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
                            text: '获取频繁', //具体信息有后台决定
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
        }
    })
    // 提交数据
var zhuce = 0; //模拟后台数据，是否注册
$('#sub').click(function() {
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
                        url: './signup.html',
                        data: '',
                        // dataType: 'json',
                        success: function(msg) {
                            // msg后台数据，url为真实路径时用到
                            if (zhuce == 0) {
                                //注册成功
                                $.alert({
                                    title: '提示',
                                    text: '注册成功',
                                    onOK: function() {
                                        //点击确认
                                        zhuce = 1;
                                        $("#user").val('');
                                        $("#tel").val('');
                                        $("#code").val('');
                                    }
                                });
                            } else {
                                //已经注册过提示
                                $.alert({
                                    title: '提示',
                                    text: '提交失败，您已经注册过了' // 具体其他信息由后台具体确定
                                });
                                $("#user").val('');
                                $("#tel").val('');
                                $("#code").val('');
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
    })
    // 完善信息
$('#sub2').click(function() {
        var pp = $("#pp").val();
        var mc = $("#mc").val();
        var city = $("#city").val();
        if (pp.length == 0) {
            $.toast("品牌不能为空", 'text');
            return false;
        } else {
            if (mc.length == 0) {
                $.toast("卖场不能为空", 'text');
                return false;
            } else {
                if (city.length == 0) {

                    $.toast("城市不能为空", 'text');
                    return false;
                }
            }
        }
        //ajax 数据请求
        $.ajax({
            type: 'post',
            url: './signup2.html',
            data: '',
            // dataType: 'json',
            success: function(msg) {
                // msg后台数据，url为真实路径时用到
                if (true) {
                    //完善信息成功
                    $.alert({
                        title: '提示',
                        text: '完善信息成功',
                        onOK: function() {
                            //点击确认
                            zhuce = 1;
                            $("#pp").val('');
                            $("#mc").val('');
                            $("#city").val('');
                        }
                    });
                } else {
                    //其他提示
                    $.alert({
                        title: '提示',
                        text: '提交失败，稍后再试' // 具体其他信息由后台具体确定
                    });
                    $("#pp").val('');
                    $("#mc").val('');
                    $("#city").val('');
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
    // 品牌，卖场picker
$.fn.pmPicker = function(params) {
    if (!this) return;
    var self = this;
    var config = {
        formatValue: function(p, values, displayValues) {
            //   return displayValues.join(' ');
            return $(self).val();
        },
        // onChange: function(picker, values, displayValues){
        //     $(self).attr('data-code', values[0]);
        // }
    }
    var p = $.extend({}, params, config);
    //计算value
    var val = $(this).val();
    if (!val) {
        currentPm = params.cols[0].displayValues[0];
    } else {
        currentPm = val;
    }
    $(this).picker(p);
}

// 关闭品牌列表
function closepp() {
    $("#pp").val(pp);
    $("#pp").attr('data-code', pcode);
}
var pp = '';
var pcode = '';
// 打开品牌列表
var pmcode =  $("#pp").attr('data-code');
var initpm = [];
if( pmcode ){
    initpm = [pmcode];
}else{
    initpm = ['0'];
}
$("#pp").pmPicker({
    title: "选择品牌", //标题名称
    toolbarTemplate: '<div class="toolbar">\
    <div class="toolbar-inner">\
    <a href="javascript:;" class="picker-button close-picker cancel-picker-pp">取消</a>\
    <a href="javascript:closepp();" class="picker-button com-picker close-picker">{{closeText}}</a>\
    <h1 class="title">{{title}}</h1>\
    </div>\
    </div>',
    cols: [{
        textAlign: 'center',
        values: ["0", "1", "2"],
        displayValues: ["品牌1", "品牌2", "品牌3"]
    }],
    value:initpm,
    onClose: function(picker) {
        //关闭时触发
        pp = picker.cols[0].displayValue;
        pcode = picker.cols[0].value;
    }
});
// 关闭卖场列表
function closemc() {
    $("#mc").val(mc)
}
var mc = '';
// 打开品牌列表
$("#mc").picker({
    title: "选择卖场", //标题名称
    toolbarTemplate: '<div class="toolbar">\
    <div class="toolbar-inner">\
    <a href="javascript:;" class="picker-button close-picker cancel-picker-pp">取消</a>\
    <a href="javascript:closemc();" class="picker-button com-picker close-picker">{{closeText}}</a>\
    <h1 class="title">{{title}}</h1>\
    </div>\
    </div>',
    cols: [{
        textAlign: 'center',
        values: ["品牌1", "品牌2", "品牌3"]
    }],
    onClose: function(picker) {
        //关闭时触发
        mc = picker.cols[0].value
    }
});
var cityvalue = "";
var citycode = "";
var citycodes = "";
// $("#home-city").val("北京 北京市");

function close() {
    $("#city").attr('data-code', citycode);
    $("#city").attr('data-codes', citycodes);
    // var citycode = $("#city").attr('data-code');
    // console.log($(".com-picker").html())
    $("#city").val(cityvalue);
    // alert(citycode)
}
$("#city").cityPicker({
    title: "选择区域", //标题名称
    showDistrict: false, //显示到城市
    toolbarTemplate: '<div class="toolbar">\
            <div class="toolbar-inner">\
            <a href="javascript:;" class="picker-button close-picker cancel-picker-pp">取消</a>\
            <a href="javascript:close();" class="picker-button com-picker close-picker">{{closeText}}</a>\
            <h1 class="title">{{title}}</h1>\
            </div>\
            </div>',
    onChange: function(picker, values, displayValues){
        $("#city").attr('data-code',$("#city").attr('data-code'));
        $("#city").attr('data-codes',$("#city").attr('data-codes'));
    },
    onClose: function(picker) {
        //关闭时触发
        cityvalue = picker.cols[0].displayValue + ' ' + picker.cols[1].displayValue
        citycode = picker.cols[0].value;
        citycodes = picker.value.join(',');
        // console.log(picker)
    }
});