var count = 0;
// 页面载入
document.onreadystatechange = function(){
    if(document.readyState == 'complete'){
        preimg(arr);
    }
}
// 图片预加载
var arr = [
    './hongbao/images/hb-bck.jpg',
    './hongbao/images/kai-anniu.png'
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
                $('section').css({
                    'display': 'block'
                })
            }
        })
        img[i].src = arr[i];
    }
}
// 领取红包
$('.anniu2').click(function () {
    var self = this;
    $.ajax({
        url:'packet3.html',
        type:'get',
        data:'',
        success:function(msg){
            // 领取成功
            if(true){
                //隐藏按钮
                self.style.display = 'none';
                $('body').css({
                    'left': '0',
                    'right': '0'
                })
                $('.bk').css({
                    'display': 'block'
                })
                $('.hongbao').css({
                    'display': 'block'
                })
            }else{
                //领取成功
                $.alert({
                    title: '提示',
                    text: '领取失败，稍后再试',//具体信息有后台决定
                });
            }
        },
        error: function(){
            //服务器错误
            $.alert({
                title: '提示',
                text: '领取失败，稍后再试',//具体信息有后台决定
            });
        }
    })
})