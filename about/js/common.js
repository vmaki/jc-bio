

 
$(function() {
    //$('.loading').fadeIn(); 
    //loading
    $(window).load(function(){  
        $('.loading').fadeOut(); 
    }); 





//if($(window).width() > 768) {
    // 动画效果
    //new WOW().init();  
//}

    






// 伸缩导航栏
$(document).scroll(function() {

    if($(window).width() > 768) {
        if($(document).scrollTop() > 80) {
            $("header").addClass("active");
            $(".content").addClass("active");
            $("header .header-right .top-info").stop().slideUp(200);
        } else {
            $("header").removeClass("active");
            $(".content").removeClass("active");
            $("header .header-right .top-info").stop().slideDown(200);
        }
    }
});

// 显示和隐藏二级导航
$("header .header-right .bottom-info nav .item").hover(function() {
    $(this).find(".second").stop().slideDown();
}, function() {
    $(this).find(".second").stop().slideUp();
});


//显示和隐藏搜索框
$("header .header-right .bottom-info .right-info .search").click(function(e) {
    e.stopPropagation(),
    $('.search-con').stop().slideToggle();
});
$(".clearfix").click(function(e) {
    // e.stopPropagation(),
    // $('.search-con').stop().slideUp();
});

$(".content, footer").click(function(e) {
    e.stopPropagation()
    $('.search-con').stop().slideUp();
})





// 在ie下去掉select的背景图
if($(window).width() > 768) {
    // ie兼容
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      $("select").css("background-image", "none");
    } 
};


$(document).scroll(function() {

    if($(document).scrollTop() > 180) {
    // if($(window).scrollTop() - $('.content .intro .intro-img1 .intro3').offset().top < 180) {
        var jb1 = setTimeout(function(){
            $(".jb1").addClass("active");
        },600);
        var jb2 = setTimeout(function(){
            $(".jb2").addClass("active");
        },1200);
        var jb3 = setTimeout(function(){
            $(".jb3").addClass("active");
        },1800);
        var jb4 = setTimeout(function(){
            $(".jb4").addClass("active");
        },2400);
        var jb5 = setTimeout(function(){
            $(".jb5").addClass("active");
        },3000);
        var jb6 = setTimeout(function(){
            $(".jb6").addClass("active");
        },3600);
    }

});

  




// ----------------------------------------------------------------------------------------

// 手机端导航逻辑
    // 手机导航逻辑
    if ($(window).width() <= 768) {
        $('.phone_nav_con .nav_con .nav1').click(function() {
            if($(this).parents('.nav_con').find('.nav_con1').is(':hidden')) {
                $(this).parents('.nav_con').find('.nav_con1').slideDown();
                $(this).parents('.nav_con').find('.nav1 i').addClass('overturn');
                $(this).parents('.nav_con').siblings().find('.nav_con1').slideUp();
                $(this).parents('.nav_con').siblings().find('.nav1 i').removeClass('overturn');
            } else {
                $(this).parents('.nav_con').find('.nav_con1').slideUp();
                $(this).parents('.nav_con').find('.nav1 i').removeClass('overturn');
            }
        });

        $('.phone_nav .phone_nav_con .nav_con .nav_con1 .nav2').click(function() {
            if($(this).next('.nav_con2').is(':hidden')) {
                // $(this).siblings('.nav_con2').slideUp();
                $(this).parents('.nav_con1').siblings().find('.nav_con2').slideUp();
                $(this).next('.nav_con2').slideDown();
                $(this).find('i').addClass('overturn');
                $(this).parents('.nav_con1').siblings().find('.nav2 i').removeClass('overturn');
            } else {
                $(this).next('.nav_con2').slideUp();
                $(this).find('i').removeClass('overturn');
            }
        });

        $('.phone_nav .phone_nav_con .nav_con .nav_con1 .nav3').click(function() {
            if($(this).next('.nav_con3').is(':hidden')) {
                $(this).parents('.item').siblings().find('.nav_con3').slideUp();
                $(this).next('.nav_con3').slideDown();
                $(this).find('i').addClass('overturn');
                // $(this).siblings('.nav3').find('i').removeClass('overturn');
                $(this).parents('.item').siblings().find('.nav3 i').removeClass('overturn');
            } else {
                $(this).next('.nav_con3').slideUp();
                $(this).find('i').removeClass('overturn');
            }
        });


        // 手机端开关导航
        $('.phone_nav_switch, .phone_nav_shadow').click(function() {
            if($('.phone_nav_switch').find('.icon-guanbi').is(':hidden')) {
                $('.phone_nav').addClass('show');
                $('.phone_nav_switch').find('.icon-guanbi').fadeIn();
                $('.phone_nav_switch').find('.icon-daohang').fadeOut();
                $('.phone_nav_shadow').fadeIn();
            } else {
                $('.phone_nav').removeClass('show');
                $('.phone_nav_switch').find('.icon-guanbi').fadeOut();
                $('.phone_nav_switch').find('.icon-daohang').fadeIn(); 
                $('.phone_nav_shadow').hide();            
            }
        });



    }

    // 如果没有下拉，a标签100%展示
    $( ".phone_nav .phone_nav_con .nav_con .nav1").each(function(i, index) {
        if($(this).find('i').length == 0) {
            $(this).find('a').css('width', '100%');
        }   
    });

    $('.phone_nav .phone_nav_con .nav_con .nav_con1 .nav2').each(function(i, index) {
        if($(this).siblings('i').length == 0) {
            $(this).css('width', '100%');
        }           
    })
    $('.phone_nav .phone_nav_con .nav_con .nav_con1 a').each(function(i, index) {
        if($(this).siblings('i').length == 0) {
            $(this).css('width', '100%');
        }           
    });


// ----------------------------------------------------------------------------------------





});





 








