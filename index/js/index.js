$(function() {

	// 点击第二屏的视频按钮开启视频
	$('.content .company-introduct .introduct-video').click(function() {
		return false;
		$("video").trigger('play');
		$('.willesPlay').fadeIn();
		// 第二屏视频关闭按钮动态获取位置
		var close1 = $('.willesPlay .close1');
		var width = $('.willesPlay .close1 img').width();
		var willesPlay_h = $('.willesPlay').height();
		var willesPlay_w = $('.willesPlay').width();
		var panel_2_video_h = $('.willesPlay .playContent').height();
		var panel_2_video_w = $('.willesPlay .playContent').width();
		close1.css({
			'top': (willesPlay_h - panel_2_video_h)/2 - width/2,
			'right': (willesPlay_w - panel_2_video_w)/2 - width/2,
		});
	});

	// 点击第二屏的视频关闭按钮关闭视频
	$('.willesPlay .close1 img, .willesPlay .shade').click(function() {
		$('.willesPlay').fadeOut();
		$('.playContent .playTip').fadeOut();
		$("video").trigger('pause');
	})


	// 轮播图1
    var swiper1 = new Swiper('.swiper1', {
		//动画
	    on:{
	      init: function(){
	        // swiperAnimateCache(this); //隐藏动画元素 
	        swiperAnimate(this); //初始化完成开始动画
	      }, 
	      slideChangeTransitionEnd: function(){ 
	        swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
	      },
		    slideChangeTransitionStart: function(){
				var index = this.realIndex;
			},	
	    },

	loop: true,
	effect : 'fade',
	speed: 1000,
	// init: false,
	  navigation: {
	    nextEl: ".swiper1-pc .next1-con",
	    prevEl: ".swiper1-pc .prev1-con"
	  },   

	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
		clickable: true,
	},

	// 自动播放
	autoplay: {
		delay: 5000,
		stopOnLastSlide: false,
		// 当设置为false时，用户操作之后autoplay不会被禁掉
		disableOnInteraction: false,
	},
		  
});






	// 轮播图2
    var swiper2 = new Swiper('.swiper2', {
    	loop: true,
		observer:true,/*启动动态检查器，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。*/
    	observeParents:true,
		slidesPerView: 4,
		slidesPerGroup: 1,
		spaceBetween: 30,
		// centeredSlides: true,
		// 点中的元素会居中
		slideToClickedSlide: true,
		speed: 1000,
		// 当设置为false时，用户操作之后autoplay不会被禁掉
		disableOnInteraction: false,
		// 如果需要前进后退按钮
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
		  },
	       breakpoints: {
	            768: {
					slidesPerView: 2,
					slidesPerGroup: 1,
					spaceBetween: 10,
	            },         
	            414: {
					slidesPerView: 1,
					slidesPerGroup: 1,
					spaceBetween: 0,
	            },                         
	        },

		// // 自动播放
		// autoplay: {
		// 	delay: 2000,
		// 	stopOnLastSlide: false,
		// 	// 当设置为false时，用户操作之后autoplay不会被禁掉
		// 	disableOnInteraction: false,
		// },

    });


    // 公司平台tab切换
	$(".content .platform .tab-icon .item").hover(function() {
		var index = $(this).index();
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
		$(".content .platform .tab-image-text .item").removeClass("active");
		$(".content .platform .tab-image-text .item").find(".con-con").removeClass("fadeInDown2");
		$(".content .platform .tab-image-text .item").eq(index).addClass("active");
		$(".content .platform .tab-image-text .item").eq(index).find(".con-con").addClass("fadeInDown2");
	});

	// 新闻与活动tab切换
	$(".new-activity-tab-tit .item").click(function() {
		var index = $(this).index();
		$(this).addClass("active");
		$(this).siblings(".item").removeClass("active");
		$(".new-activity-tab-con .swiper2-parent .swiper-container").removeClass("active fadeInDown2");
		$(".new-activity-tab-con .swiper2-parent .swiper-container").eq(index).addClass("active fadeInDown2");
		$(".new-activity .more-parent .more").removeClass("active");
		$(".new-activity .more-parent .more").eq(index).addClass("active");
	});
	$(".commit").mouseover(function(e){
			$(".fly").attr("src","/public/assets/img/commonImg/fly1.png");
	});
	$(".commit").mouseout(function(e){
			$(".fly").attr("src","/public/assets/img/commonImg/fly.png");
	});
	$(".platform .tab-icon .item").mouseover(function(){
		var index = $(this).index();
		$(".platform .tab-icon .icon").eq(index).css("opacity","0");
		$(".platform .tab-icon .icon-hover").eq(index).css("opacity","1");
		var git= setTimeout(function(){
			$(".platform .tab-icon .icon").eq(index).css("opacity","1");
			$(".platform .tab-icon .icon-hover").eq(index).css("opacity","0");
		},1200);
	});
	$(".platform .tab-icon .item").mouseout(function(){
		var index = $(this).index();
		$(".platform .tab-icon .icon").eq(index).css("opacity","1");
		$(".platform .tab-icon .icon-hover").eq(index).css("opacity","0");
	});
})