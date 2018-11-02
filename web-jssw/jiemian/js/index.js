// 更换图标
function tihuan(dom,index){
    if( index == 0){
        dom.siblings().find('.iconfont').eq(0).removeClass('icon-tuandui-tianchong')
        dom.siblings().find('.iconfont').eq(1).removeClass('icon-paihangbang')
        dom.siblings().find('.iconfont').eq(2).removeClass('icon-wodekehu1')
        dom.siblings().find('.iconfont').eq(0).addClass('icon-tuandui')
        dom.siblings().find('.iconfont').eq(1).addClass('icon-paihangbang-')
        dom.siblings().find('.iconfont').eq(2).addClass('icon-wodekehu')
    }else if( index == 1){
        dom.siblings().find('.iconfont').eq(0).removeClass('icon-shouye-xuanzhong')
        dom.siblings().find('.iconfont').eq(1).removeClass('icon-paihangbang')
        dom.siblings().find('.iconfont').eq(2).removeClass('icon-wodekehu1')
        dom.siblings().find('.iconfont').eq(0).addClass('icon-shouye')
        dom.siblings().find('.iconfont').eq(1).addClass('icon-paihangbang-')
        dom.siblings().find('.iconfont').eq(2).addClass('icon-wodekehu')
    }
    else if( index == 2){
        dom.siblings().find('.iconfont').eq(0).removeClass('icon-shouye-xuanzhong')
        dom.siblings().find('.iconfont').eq(1).removeClass('icon-tuandui-tianchong')
        dom.siblings().find('.iconfont').eq(2).removeClass('icon-wodekehu1')
        dom.siblings().find('.iconfont').eq(0).addClass('icon-shouye')
        dom.siblings().find('.iconfont').eq(1).addClass('icon-tuandui')
        dom.siblings().find('.iconfont').eq(2).addClass('icon-wodekehu')
    }
    else if( index == 3){
        console.log(32)
        dom.siblings().find('.iconfont').eq(0).removeClass('icon-shouye-xuanzhong')
        dom.siblings().find('.iconfont').eq(1).removeClass('icon-tuandui-tianchong')
        dom.siblings().find('.iconfont').eq(2).removeClass('icon-paihangbang')
        dom.siblings().find('.iconfont').eq(0).addClass('icon-shouye')
        dom.siblings().find('.iconfont').eq(1).addClass('icon-tuandui')
        dom.siblings().find('.iconfont').eq(2).addClass('icon-paihangbang-')
    }
}
// 更换图标
$('.weui-tabbar__item').click(function(){
    if( $(this).index() == 0){
        $(this).find('.iconfont').addClass('icon-shouye-xuanzhong');
        $(this).find('.iconfont').removeClass('icon-shouye');
        tihuan($(this),$(this).index());
    }else if( $(this).index() == 1){
        $(this).find('.iconfont').addClass('icon-tuandui-tianchong');
        $(this).find('.iconfont').removeClass('icon-tuandui');
        tihuan($(this),$(this).index());
    }
    else if( $(this).index() == 2){
        $(this).find('.iconfont').addClass('icon-paihangbang');
        $(this).find('.iconfont').removeClass('icon-paihangbang-');
        tihuan($(this),$(this).index());
    }
    else if( $(this).index() == 3){
        $(this).find('.iconfont').addClass('icon-wodekehu1');
        $(this).find('.iconfont').removeClass('icon-wodekehu');
        tihuan($(this),$(this).index());
    }
})