
$(document).ready(function(){

    $(window).scroll(function(){
        var top=$(document).scrollTop();
        //console.log(top);
        var menu=$("#menu");
        var items=$("#content").find(".box-1");
        var currentID="";//当前所在楼层（item）#id
        items.each(function(){
            var m=$(this);
            var itemTop=m.offset().top;
            console.log(itemTop);
            if (top>itemTop-180) {
                currentID="#"+m.attr("id");
            }else{
                return false;
            }
        });

        var currentLink=menu.find(".current");
        console.log(currentLink);
        if (currentID&&currentLink.attr("herf")!=currentID) {
            currentLink.removeClass("current");
            $("a[href=\"#item"+currentID+"\"]").addClass("current");
        }

    });


    //检测楼层时，跳转时，不需要那么精确，所以减去100
    var f1Top=$('#item1').offset().top-100;
    var f2Top=$('#item2').offset().top-100;
    var f3Top=$('#item3').offset().top-100;
    var f4Top=$('#item4').offset().top-100;
    var f5Top=$('#item5').offset().top-100;

    var jianCe=function(){
        var windowScrollTop=$(window).scrollTop();
        var menu = $('#menu');
        var current = $('.current');
        current.removeClass("current");
        if(windowScrollTop>=f5Top){
            console.log('到达5楼');
            $("a[href=\"#item"+5+"\"]").addClass("current");
            //到达5楼
            // $('.dianTi').show();
            // $('.dianTi li').eq(4).addClass('current').siblings('li').removeClass('current');
        }else if(windowScrollTop>=f4Top){
            console.log('到达4楼');
            $("a[href=\"#item"+4+"\"]").addClass("current");
            //到达4楼
            // $('.dianTi').show();
            // $('.dianTi li').eq(3).addClass('current').siblings('li').removeClass('current');
        }else if(windowScrollTop>=f3Top){
            console.log('到达3楼');
            $("a[href=\"#item"+3+"\"]").addClass("current");
            //到达3楼
            // $('.dianTi').show();
            // $('.dianTi li').eq(2).addClass('current').siblings('li').removeClass('current');
        }else if(windowScrollTop>=f2Top){
            console.log('到达2楼');
            $("a[href=\"#item"+2+"\"]").addClass("current");
            //到达2楼
            // $('.dianTi').show();
            // $('.dianTi li').eq(1).addClass('current').siblings('li').removeClass('current');
        }else if(windowScrollTop>=f1Top){
            console.log('到达1楼');
            $("a[href=\"#item"+1+"\"]").addClass("current");
            //到达一楼
            // $('.dianTi').show();
            // $('.dianTi li').eq(0).addClass('current').siblings('li').removeClass('current');
        }else{
            //不再5楼中的任意一层时，让电梯导航隐藏
            // $('.dianTi').hide();
        }
    }
    $(window).scroll(function(){
        jianCe();
    });
});