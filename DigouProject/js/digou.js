
$(document).ready(function(){

    var floor1 = "#image-1-list";
    var floor2 = "#image-2-list";
    var floor3 = "#image-3-list";
    var floor4 = "#image-4-list";
    var floor5 = "#image-5-list";
    var floormap = new Map([[floor1, false], [floor2, false], [floor3, false], [floor4, false], [floor5, false]]);
    function getPics(url, itemsid)
    {
        if(floormap.get(itemsid) === true)
        {
            return;
        }

        $.ajax({url:url,async:false})
        .done(function(data){
          // 请求完成后，执行的函数
          floormap.set(itemsid, true);
          console.log("done --- " + data[0]);
          var arr = data[0].msg;
          $.each(data, function(i,item) {
                  $.each(item.msg, function( index, value ) {
                    var imgs = document.querySelectorAll(itemsid);
                    // for(var i = 0;i<imgs.length;i++)
                    if(index < imgs.length)
                    {
                        var img = imgs[index];
                        $(img).attr("src",value);
                    }
    
                        //   var items = $("item1-list");
                        //   $("item1-list").append("<li><a href=\"#\"><img class=\"image-1\" src=\""+value+"\" alt=\"\"></a></li>");
                    });
              }
          );
      })
      .fail(function(data){
          // 请求失败后，执行的函数
          console.log("fail");
      });
    }

    $(window).scroll(function(){
        var top=$(document).scrollTop();
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
            getPics("http://10.73.27.38:8888/get_fileListContents?fname=item5","#image-5-list");
        }else if(windowScrollTop>=f4Top){
            console.log('到达4楼');
            $("a[href=\"#item"+4+"\"]").addClass("current");
            //到达4楼
            // $('.dianTi').show();
            // $('.dianTi li').eq(3).addClass('current').siblings('li').removeClass('current');
            getPics("http://10.73.27.38:8888/get_fileListContents?fname=item4","#image-4-list");
        }else if(windowScrollTop>=f3Top){
            console.log('到达3楼');
            $("a[href=\"#item"+3+"\"]").addClass("current");
            //到达3楼
            // $('.dianTi').show();
            // $('.dianTi li').eq(2).addClass('current').siblings('li').removeClass('current');
            getPics("http://10.73.27.38:8888/get_fileListContents?fname=item3","#image-3-list");

        }else if(windowScrollTop>=f2Top){
            console.log('到达2楼');
            $("a[href=\"#item"+2+"\"]").addClass("current");
            //到达2楼
            // $('.dianTi').show();
            // $('.dianTi li').eq(1).addClass('current').siblings('li').removeClass('current');
            getPics("http://10.73.27.38:8888/get_fileListContents?fname=item2","#image-2-list");
        }else if(windowScrollTop>=f1Top){
            console.log('到达1楼');
            $("a[href=\"#item"+1+"\"]").addClass("current");
            //到达一楼
            // $('.dianTi').show();
            // $('.dianTi li').eq(0).addClass('current').siblings('li').removeClass('current');
            getPics("http://10.73.27.38:8888/get_fileListContents?fname=item1","#image-1-list");
        }else{
            //不再5楼中的任意一层时，让电梯导航隐藏
            // $('.dianTi').hide();
        }
    }
    $(window).scroll(function(){
        jianCe();
    });

    jianCe();
});